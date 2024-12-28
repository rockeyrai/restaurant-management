'use client'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log('User in Profile:', user);
  }, [user]);

  if (user === null) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || 'N/A'}</p>
    </div>
  );
};

export default UserProfile;
