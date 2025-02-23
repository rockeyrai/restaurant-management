// src/components/AuthForm.js
'use client';
import { setUser } from '@/lib/redux/slices/userSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
require('dotenv').config();

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const dispatch = useDispatch();
   const router = useRouter()
     // Check if the user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
          withCredentials: true, // Include cookies in the request
        });
        if (response.data.loggedIn) {
          alert('You are already logged in!');
          router.push('/'); // Redirect to home page
        }
      } catch (error) {
        console.error('Error checking login status:', error.response?.data || error.message);
      }
    };

    checkLoginStatus();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authUrl = isLogin
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
        : `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
    
      const authResponse = await axios.post(authUrl, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    
      console.log('Auth Response Data:', authResponse.data);
    
      const userId = authResponse.data.user?.user_id || authResponse.data.userId;
      if (!userId) {
        throw new Error('Invalid authentication response: Missing userId');
      }
    
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
      const userData = userResponse.data;
    
      dispatch(setUser({ userId, role: userData.role, userName: userData.username }));
    
      alert('User logged in successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error.response || error.message);
      alert('Login failed. Please try again.');
    }
    
    
  };
  


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="username" className=" text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required={!isLogin}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className=" text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className=" text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="phone" className=" text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
