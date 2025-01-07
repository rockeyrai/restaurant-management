'use client';

import { getMenuItems, storeMenuItems } from "@/hook/IndexedDB";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { storeMenuItems, getMenuItems } from './indexedDBUtils';

// MenuItem Component for reuse
const MenuItem = ({ menu_item_id, name, description, price, availability, onClick }) => {
  const formattedPrice = parseFloat(price).toFixed(2);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
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

// SmallMenuSection Component
const SmallMenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch menu data from backend and store in IndexedDB
  const fetchAndStoreMenuItems = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
      const data = await response.json();
      setMenuItems(data); // Set data in state

      // Store the fetched menu data in IndexedDB
      await storeMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      // Fallback: If network fetch fails, try loading from IndexedDB
      const storedItems = await getMenuItems();
      setMenuItems(storedItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndStoreMenuItems();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading menu...</div>;
  }

  // Handle navigation safely
  const handleClick = (id) => {
    router.push(`/food/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Menu Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <MenuItem
            key={item.menu_item_id}
            onClick={() => handleClick(item.menu_item_id)}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default SmallMenuSection;
