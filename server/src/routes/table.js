const express = require('express');
const mysqlPool = require('../database/mysql');
const router = express.Router();

// Get all tables
router.get('/tables', async (req, res) => {
  try {
    const [results] = await mysqlPool.query('SELECT * FROM Tables');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all furniture
router.get('/furniture', async (req, res) => {
  try {
    const [results] = await mysqlPool.query('SELECT * FROM Furniture');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update a square's furniture or table
router.post('/furniture', async (req, res) => {
  const { type, table_id, position_x, position_y } = req.body;

  try {
    const [results] = await mysqlPool.query(
      'INSERT INTO Furniture (type, table_id, position_x, position_y) VALUES (?, ?, ?, ?)',
      [type, table_id, position_x, position_y]
    );
    res.json({ message: 'Furniture added', furniture_id: results.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update table status
router.put('/tables/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await mysqlPool.query(
      'UPDATE Tables SET status = ? WHERE table_id = ?',
      [status, id]
    );
    res.json({ message: 'Table status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all available tables (with status 'available')
router.get('/tables/available', async (req, res) => {
  try {
    const [results] = await mysqlPool.query('SELECT * FROM Tables WHERE status = "available"');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Reserve a table
router.put('/tables/:id/reserve', async (req, res) => {
  const { id } = req.params;
  const { customer_name, reservation_time } = req.body;

  try {
    await mysqlPool.query(
      'UPDATE Tables SET status = "reserved", customer_name = ?, reservation_time = ? WHERE table_id = ?',
      [customer_name, reservation_time, id]
    );
    res.json({ message: 'Table reserved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Save the layout
// Example route: POST /update-layout
router.post('/update-layout', async (req, res) => {
  const { squares } = req.body;

  if (!Array.isArray(squares)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    for (const square of squares) {
      if (!square || !['chair', 'bench'].includes(square.type)) {
        continue; // Skip invalid or unsupported squares
      }

      const { type, table_id, position_x, position_y } = square;

      await mysqlPool.query(
        'INSERT INTO Furniture (type, table_id, position_x, position_y) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE type = ?, position_x = ?, position_y = ?',
        [type, table_id, position_x, position_y, type, position_x, position_y]
      );
    }

    res.json({ message: 'Layout updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});



// Get the saved layout
router.get('/get-layout', async (req, res) => {
  try {
    const [results] = await mysqlPool.query('SELECT * FROM Furniture');
    res.json({ squares: results });  // Returning an array of saved squares
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});



module.exports = router;
