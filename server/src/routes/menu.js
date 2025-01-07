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
router.get("/menu/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const query = "SELECT * FROM Menu WHERE menu_item_id = ?";
    const [menuItem] = await mysqlPool.execute(query, [id]);
    
    if (menuItem.length === 0) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(menuItem[0]); // Return the first item, as it's the only result
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu item", error });
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