import React from 'react';


function RestaurantHeader(props) {
  const waiterName = "John"; // Get actual waiter name dynamically 
  if (props.data && props.data.wtcss ? props.data.wtcss : true) {
    import('../waiter.css');
 }
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
