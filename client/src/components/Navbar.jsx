"use client";
import { useRouter } from "next/navigation";
import { Home, Info, MenuIcon, Gift, LogIn, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Fuse from "fuse.js";
import _ from "lodash"; // Import lodash for debounce
import { setUser } from "@/lib/redux/slices/userSlice";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false); // State for dropdown visibility
  const dispatch = useDispatch();
  const { userId, role, userName, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && !role) { // Fetch only if userId exists and role is not already fetched
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`); // Replace with your API endpoint
          const userData = response.data;

          dispatch(
            setUser({
              userId,
              role: userData.role,
              userName: userData.username,
            })
          );
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userId, role, dispatch]); // Add `role` to dependency array

  const data = [
    { name: "Pizza" },
    { name: "Burger" },
    { name: "Pasta" },
    { name: "Salad" },
    { name: "Tacos" },
    { name: "Fried Chicken" },
    { name: "Fish Curry" },
  ];

  const fuse = new Fuse(data, {
    keys: ["name"], // Key to search within
    threshold: 0.4, // Lower threshold for stricter matching
  });

  // Perform search
  const results = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : [];

  // Debounce search input to optimize performance
  const debouncedSearch = _.debounce((query) => {
    setSearchQuery(query);
  }, 300);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleNavigation = (page) => {
    if (page === "home") page = "";
    router.push(`/${page}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const login = () => {
    router.push("login");
  };

  return (
    <nav className="bg-blue-600 text-primary-foreground">
      <div className="flex items-center justify-between h-16 bg-red-800 px-10">
        <h1 className="text-white font-bold">Name</h1>
        <form className="relative flex items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="px-4 text-black py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Dropdown for Search Results */}
          {isFocused && (
            <ul className="absolute top-12 left-0 w-80 text-black bg-white border border-gray-300 rounded-md shadow-lg z-50">
              {results.length > 0 ? (
                results.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onMouseDown={() => setSearchQuery(item.name)} // Select item on click
                  >
                    {item.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 text-center">
                  No results found
                </li>
              )}
            </ul>
          )}
        </form>

        {/* Login/Logout Buttons */}
        <div>
          {isLoggedIn ? (
            <Button variant="ghost" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          ) : (
            <Button variant="ghost" onClick={login}>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          )}
        </div>
        <p>Welcome, {userId || 'Guest'}</p>
      </div>

      <div className="flex items-center justify-between h-10 px-10">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => handleNavigation("home")}>
            Home
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation("about")}>
            About
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation("menu")}>
            Menu
          </Button>
          <Button variant="ghost" onClick={() => handleNavigation("offer")}>
            Offer
          </Button>
        </div>
      </div>
    </nav>
  );
}
