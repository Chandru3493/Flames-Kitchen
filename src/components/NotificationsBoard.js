import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../waiter.css'; // Assuming your CSS is in the correct location

function NotificationsBoard() { // No need for props at this point
  const [notifications, setNotifications] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
     
      fetchNotifications(); // Fetches all 'done' orders currently
    
    }, 2000); 

    return () => clearInterval(intervalId);
  }, []);

  const enhanceTouchScrolling = (element) => {
    element.addEventListener('touchstart', () => {
      element.style.overflow = 'auto';  // Temporarily enable standard scrolling
    });
    element.addEventListener('touchend', () => {
      element.style.overflow = 'hidden'; // Re-disable standard scrolling
    });
  };
  
  
  useEffect(() => {
    const boardElement = document.querySelector('.notifications-board'); 
    const statsElement = document.querySelector('.statistics-bar'); 
  
    if (boardElement) {
      enhanceTouchScrolling(boardElement);
    }
    if (statsElement) {
      enhanceTouchScrolling(statsElement);
    }
  }, []); 

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/orders/done`); 

      const newNotifications = response.data.map(order => ({
        // Construct the new message format
        message: `Table No: ${order.table_id}, Order No: ${order.id} is being prepared and ready to be served.`, 
        updatedAt: order.updatedAt 
      }));

      setNotifications(newNotifications); 
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const startTrackingOrder = (orderId) => {
    setCurrentOrderId(orderId);
  }

  return (
    <div className="notifications-board">
      <h2>Notifications</h2>

      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-card"> 
            <p>{notification.message}</p> {/* Display the formatted message */}
            {/* <p className="timestamp">{notification.updatedAt}</p>  */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsBoard;