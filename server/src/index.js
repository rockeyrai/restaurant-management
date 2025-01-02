require('dotenv').config();
const express = require('express');
const { connectMongoDB } = require('./database/mongodb');
const mysqlPool = require('./database/mysql');  // Import the connection pool
const { mongoose } = require('./database/mongodb');  // Import mongoose instance
const authRoutes = require('./routes/auth')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = express.Router();


// Define your MongoDB schema and model here
const SomeMongoModel = mongoose.model('SomeMongoModel', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
}));

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

app.use('/auth', authRoutes);
// MongoDB Route
app.get('/mongo-data', async (req, res) => {
  try {
    const data = await SomeMongoModel.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// MySQL Route (if needed)
app.get('/mysql-data', (req, res) => {
  mysqlPool.query('SELECT * FROM some_table', (err, results) => {
    if (err) res.status(500).send(err);
    else res.send(results);
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Set port with fallback if the environment variable is not set
const PORT = process.env.MY_PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
