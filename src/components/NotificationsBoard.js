import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../waiter.css';

function NotificationsBoard() {
  const [notifications, setNotifications] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentOrderId) { 
        fetchNotifications(currentOrderId); 
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [currentOrderId]); 

  const fetchNotifications = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/orders/${orderId}/status`); 

      if (response.data.message) {  
        setNotifications(prevNotifications => ([...prevNotifications, response.data]));
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const startTrackingOrder = (orderId) => {
    setCurrentOrderId(orderId);
  }

  return (
    <div className="notifications-board">
      <h3>Notifications</h3>
      {/* ... button to start tracking ... */} 

      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-card"> 
            <p><strong>Order ID:</strong> {notification.message.split(',')[0].split(': ')[1]}</p>
            {notification.message.includes('Table ID') && <p><strong>Table ID:</strong> {notification.message.split(',')[1].split(': ')[1]}</p>} 
            <p><strong>Message:</strong> {notification.message.split('- ')[1]}</p> 
            <p className="timestamp">{notification.updatedAt}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsBoard;
