import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../waiter.css'; 

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
