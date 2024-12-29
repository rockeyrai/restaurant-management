'use client'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '@/lib/redux/slices/userSlices';


const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch(); // Hook to dispatch actions

  useEffect(() => {
    console.log('User in Profile:', user);
  }, [user]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    // Optionally, you can also clear persisted data using redux-persist's `purge`

  };

  if (user === null) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || 'N/A'}</p>
      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
