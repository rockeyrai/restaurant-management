'use client';
import React, { useEffect, useState, useMemo } from "react";

// FilterOptions Component
const FilterOptions = ({ categories, onFilterChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
      <div className="flex flex-wrap gap-4">
        <select
          className="border rounded px-2 py-1"
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1"
          onChange={(e) => onFilterChange("price", e.target.value)}
        >
          <option value="">Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => onFilterChange("availability", e.target.checked)}
          />
          Available Only
        </label>
      </div>
    </div>
  );
};


// MenuItem Component
const MenuItem = ({ name, description, price, availability }) => {
  const formattedPrice = parseFloat(price).toFixed(2); // Convert to number and format to 2 decimals

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-800 font-bold">${formattedPrice}</p>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {availability ? "Available" : "Not Available"}
        </span>
      </div>
    </div>
  );
};


// Menu Component
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    availability: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch menu items
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
        const data = await response.json();
        console.log("Fetched menu items:", data);  // Log the entire data for inspection
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMenuItems();
    fetchCategories();
    setLoading(false);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredMenuItems = useMemo(() => {
    let filtered = [...menuItems];
  
    // Filter by category ID
    if (filters.category) {
      filtered = filtered.filter((item) => item.category_id === parseInt(filters.category));  // Use category_id for filtering
    }
  
    // Filter by availability
    if (filters.availability) {
      filtered = filtered.filter((item) => item.availability);
    }
  
    // Sort by price
    if (filters.price === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.price === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
  
    return filtered;
  }, [filters, menuItems]);
  

  if (loading) {
    return <div className="text-center py-8">Loading menu...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Menu</h1>
      <FilterOptions categories={categories} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMenuItems.map((item) => (
          <MenuItem key={item.menu_item_id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;



// INSERT INTO Menu (name, description, price, availability)
// VALUES 
// ('Bruschetta', 'Toasted bread with tomato and basil', 8.99, TRUE),
// ('Tiramisu', 'Classic Italian dessert', 7.99, TRUE),
// ('Grilled Salmon', 'Perfectly cooked salmon with a side of vegetables', 18.99, TRUE),
// ('Chicken Parmesan', 'Crispy chicken with marinara sauce and cheese', 16.99, FALSE);
