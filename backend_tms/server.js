import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './users.js';
import cors from 'cors';
import protect from './authMiddleware.js';

import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For JWT authentication
import Task from './tasks.js';

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

// DASHBOARD (Protected)
app.get("/api/dashboard", protect, async (req, res) => {
    try {
        // Fetch user details
        const user = { name: req.user.name, email: req.user.email };
        //res.json({ name: req.user.name, email: req.user.email });

        // Fetch tasks associated with the logged-in user
        const tasks = await Task.find({ userId: req.user.id });

        res.json({ user, tasks }); // Send both user details & tasks
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard data", error });
    }
});


// ADD TASK (Protected)
app.post("/api/add-tasks", protect, async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        if (!title || !dueDate) {
            return res.status(400).json({ message: "Title and Due Date are required" });
        }

        const newTask = new Task({
            userId: req.user.id,
            title,
            description,
            dueDate,
            priority,
        });

        await newTask.save();
        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error adding task", error });
    }
});

// DELETE TASK (Protected)
app.delete("/api/tasks/:id", protect, async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure the logged-in user owns the task
        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this task" });
        }

        await Task.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});