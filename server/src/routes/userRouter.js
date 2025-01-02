const express = require('express');
const mysqlPool = require('../database/mysql');
const router = express.Router();

// GET /users/:userId
// Get user details by userId
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    console.log(req.body); // Log the raw body

    // Correct query without .promise() since mysqlPool is already promise-based
    const [user] = await mysqlPool.query('SELECT user_id, username, email, role FROM users WHERE user_id = ?', [userId]);

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user[0]); // Return the user data
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
