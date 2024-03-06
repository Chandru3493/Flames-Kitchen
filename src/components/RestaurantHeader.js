import React from 'react';

function RestaurantHeader() {
  const waiterName = "John"; // Get actual waiter name dynamically 

  return (
    <header className="restaurant-header">
      <div className="restaurant-name">
        <h1>Flames Kitchen</h1> 
      </div>
      <div className="welcome-message">
        WAITER'S DASHBOARD
      </div> 
    </header>
  );
}

export default RestaurantHeader;
