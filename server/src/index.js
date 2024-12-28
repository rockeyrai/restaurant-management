require('dotenv').config();
const express = require('express');
const { connectMongoDB } = require('./database/mongodb');
const mysqlPool = require('./database/mysql');  // Import the connection pool
const { mongoose } = require('./database/mongodb');  // Import mongoose instance

// Define your MongoDB schema and model here
const SomeMongoModel = mongoose.model('SomeMongoModel', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
}));

// Connect to databases
connectMongoDB();

const app = express();
app.use(express.json());

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

// Set port with fallback if the environment variable is not set
const PORT = process.env.MY_PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
