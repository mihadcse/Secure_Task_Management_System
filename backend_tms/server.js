import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
const PORT = 5000;

dotenv.config();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});