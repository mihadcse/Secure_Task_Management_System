import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './users.js';
import cors from 'cors';
import protect from './authMiddleware.js';

import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For JWT authentication

const app = express();
const PORT = 5000;

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
;

app.use(cors());

// REGISTER USER (Hashing Password)
app.post("/api/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Account created successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating Account", error });
    }
});

// LOGIN USER
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

app.get("/api/dashboard", protect, async (req, res) => {
    res.json({ name: req.user.name, email: req.user.email });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});