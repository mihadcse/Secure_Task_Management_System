import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './users.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
;

app.use(cors());

// CREATING USER
app.post("/api/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "Account created successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating Account", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});