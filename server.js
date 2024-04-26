import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { connect } from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { databaseURL, port } from './config/config.js';

const app = express();

// Middleware
app.use(express.json());

app.use(cookieParser());

const corsOptions = {
  origin: 'https://taskmanager-tau-rose.vercel.app/', // change this to your frontend origin
  credentials: true // this allows cookies
};

// Use cors middleware with options
app.use(cors(corsOptions));


// Connect to MongoDB database
connect(databaseURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server started on port ${port}`);
});
