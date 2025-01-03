'use client';
import React, { useState, useMemo } from 'react';

// Mock data for menu items
const menuData = [
  {
    category: "Appetizers",
    items: [
      { id: 1, name: "Bruschetta", image: "/placeholder.svg?height=100&width=100", price: 8.99, offer: false },
      { id: 2, name: "Calamari", image: "/placeholder.svg?height=100&width=100", price: 10.99, offer: true },
      { id: 3, name: "Garlic Bread", image: "/placeholder.svg?height=100&width=100", price: 5.99, offer: false },
    ]
  },
  {
    category: "Main Courses",
    items: [
      { id: 4, name: "Spaghetti Carbonara", image: "/placeholder.svg?height=100&width=100", price: 14.99, offer: false },
      { id: 5, name: "Grilled Salmon", image: "/placeholder.svg?height=100&width=100", price: 18.99, offer: true },
      { id: 6, name: "Chicken Parmesan", image: "/placeholder.svg?height=100&width=100", price: 16.99, offer: false },
    ]
  },
  {
    category: "Desserts",
    items: [
      { id: 7, name: "Tiramisu", image: "/placeholder.svg?height=100&width=100", price: 7.99, offer: false },
      { id: 8, name: "Cheesecake", image: "/placeholder.svg?height=100&width=100", price: 8.99, offer: true },
      { id: 9, name: "Chocolate Mousse", image: "/placeholder.svg?height=100&width=100", price: 6.99, offer: false },
    ]
  }
];

const FilterOptions = ({ categories, onFilterChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
      <div className="flex flex-wrap gap-4">
        <select
          className="border rounded px-2 py-1"
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1"
          onChange={(e) => onFilterChange('price', e.target.value)}
        >
          <option value="">Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
        <select
          className="border rounded px-2 py-1"
          onChange={(e) => onFilterChange('alphabetical', e.target.value)}
        >
          <option value="">Alphabetical</option>
          <option value="aToZ">A to Z</option>
          <option value="zToA">Z to A</option>
        </select>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => onFilterChange('offer', e.target.checked)}
          />
          Special Offers Only
        </label>
      </div>
    </div>
  );
};

const MenuCategory = ({ category, items }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const MenuItem = ({ name, image, price, offer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        {offer && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            Special Offer
          </span>
        )}
      </div>
    </div>
  );
};

const Menu = () => {
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    alphabetical: '',
    offer: false,
  });

  const categories = useMemo(() => {
    return [...new Set(menuData.map((category) => category.category))];
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredMenuData = useMemo(() => {
    let result = menuData
      .filter((category) => {
        if (filters.category && category.category !== filters.category)
          return false;
        return true;
      })
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (filters.offer && !item.offer) return false;
          return true;
        }),
      }))
      .filter((category) => category.items.length > 0);

    if (filters.price === 'lowToHigh') {
      result = result.map((category) => ({
        ...category,
        items: [...category.items].sort((a, b) => a.price - b.price),
      }));
    } else if (filters.price === 'highToLow') {
      result = result.map((category) => ({
        ...category,
        items: [...category.items].sort((a, b) => b.price - a.price),
      }));
    }

    if (filters.alphabetical === 'aToZ') {
      result = result.map((category) => ({
        ...category,
        items: [...category.items].sort((a, b) => a.name.localeCompare(b.name)),
      }));
    } else if (filters.alphabetical === 'zToA') {
      result = result.map((category) => ({
        ...category,
        items: [...category.items].sort((a, b) => b.name.localeCompare(a.name)),
      }));
    }

    return result;
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Menu</h1>
      <FilterOptions categories={categories} onFilterChange={handleFilterChange} />
      {filteredMenuData.map((category, index) => (
        <MenuCategory key={index} {...category} />
      ))}
    </div>
  );
};

export default Menu;
