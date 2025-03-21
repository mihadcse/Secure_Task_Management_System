import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});