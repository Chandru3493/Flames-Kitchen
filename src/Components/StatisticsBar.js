import React, { useState, useEffect } from 'react';
import axios from 'axios';


function StatisticsBar({ data }) {
  if (data && data ? data : true) {
    import('../waiter.css');
  }
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const statuses = ['todo', 'inprogress', 'done', 'Order Closed','Order Delivered'];
      const promises = statuses.map((status) =>
        axios.get(`http://localhost:4000/api/orders/stats/${status}`)
      );

      try {
        const responses = await Promise.all(promises);
        const formattedStats = {};

        responses.forEach((response, index) => {
          formattedStats[statuses[index]] = response.data.count;
        });

        setStats(formattedStats);
        console.log('Statistics:', formattedStats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  const enhanceTouchScrolling = (element) => {
    element.addEventListener('touchstart', () => {
      element.style.overflow = 'auto';  // Temporarily enable standard scrolling
    });
    element.addEventListener('touchend', () => {
      element.style.overflow = 'hidden'; // Re-disable standard scrolling
    });
  };
  
  // Inside your NotificationsBoard and StatisticsBar components:
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

  return (
    <div className="statistics-bar">
  <div>Orders Placed: <p>{stats.todo}</p></div>
  <div>Orders being cooked: <p>{stats.inprogress}</p></div>
  <div>Orders Prepared: <p>{stats.done}</p></div> 
  <div>Orders Delivered: <p>{stats['Order Delivered']}</p></div>
  <div>Orders Closed: <p>{stats['Order Closed']}</p></div> 
</div>
  );
}

export default StatisticsBar;
