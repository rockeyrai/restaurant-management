const mysqlPool = require('../database/mysql');
const { Notification } = require('../models/notification');

// Fetch user details and notifications
async function getUserAndNotifications(userId) {
  try {
    // Step 1: Query MySQL for the user
    const [userResult] = await mysqlPool.promise().query(
      'SELECT * FROM users WHERE user_id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return { error: 'User not found' };
    }

    const user = userResult[0];

    // Step 2: Query MongoDB for the user's notifications
    const notifications = await Notification.find({ user_id: userId });

    // Step 3: Combine MySQL user data with MongoDB notifications
    return { user, notifications };
  } catch (err) {
    console.error('Error fetching data:', err);
    throw new Error('Error fetching user and notifications');
  }
}

// Example Usage
getUserAndNotifications(1).then((data) => console.log(data));
