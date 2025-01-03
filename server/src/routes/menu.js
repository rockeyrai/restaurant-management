const express = require('express');
const mysqlPool = require('../database/mysql');
const router = express.Router();

// Fetch all menu items
router.get("/menu", async (req, res) => {
  try {
    const query = "SELECT * FROM Menu";
    const [menuItems] = await mysqlPool.execute(query);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items", error });
  }
});


// Fetch a specific menu item by ID
router.get("/categories", async (req, res) => {
  try {
    const query = "SELECT * FROM Categories";
    const [categories] = await mysqlPool.execute(query);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});


module.exports = router;