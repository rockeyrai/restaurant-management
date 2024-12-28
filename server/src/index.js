const express = require('express');
const { connectMongoDB } = require('./database/mongodb');
const { connectMySQL, mysqlConnection } = require('./database/mysql');

// Connect to databases
connectMongoDB();
connectMySQL();

const app = express();
app.use(express.json());

// MongoDB Route (Replace 'SomeMongoModel' with your actual model)
const { mongoose } = require('./database/mongodb');
const SomeMongoModel = mongoose.model('SomeMongoModel', new mongoose.Schema({}));

app.get('/mongo-data', async (req, res) => {
  try {
    const data = await SomeMongoModel.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// MySQL Route
app.get('/mysql-data', (req, res) => {
  mysqlConnection.query('SELECT * FROM some_table', (err, results) => {
    if (err) res.status(500).send(err);
    else res.send(results);
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
