require('dotenv').config();
const express = require('express');
const { connectMongoDB } = require('./database/mongodb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = express.Router();
const authRoutes = require('./routes/auth')
const userRoutes =require('./routes/userRouter')
const menuRoutes = require('./routes/menu')

// Connect to databases
connectMongoDB();
const app = express();
app.use(cookieParser());
app.use(express.json());
// Use CORS middleware
// Use CORS middleware to allow cross-origin requests from your frontend

app.use(cors({
  origin: process.env.FRONTEND_URL, // Frontend URL (React)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies
}));
app.use(express.raw({ type: 'application/json' }));

app.use('/auth', authRoutes);
app.use(userRoutes)
app.use(menuRoutes)
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Set port with fallback if the environment variable is not set
const PORT = process.env.MY_PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
