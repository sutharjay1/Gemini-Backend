import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router.js';
import promptRouter from './routes/prompt.router.js';
import connectToDB from './connecToDB.js';

const app = express();
const PORT = process.env.PORT || 8000;

connectToDB();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://gemini-x-eight.vercel.app'],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from server!' });
});

app.use('/api/auth', userRouter);

app.use('/api/v1', promptRouter);

const server = createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
