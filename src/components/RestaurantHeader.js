import React from 'react';
import terms from './terms';


function RestaurantHeader(props) {
  if (props.data && props.data.wtcss ? props.data.wtcss : true) {
    import('../waiter.css');
 }
  return (
    <header className="restaurant-header">
      <div className="welcome-message">
      {terms.user.name}'s DASHBOARD
      </div> 
      <div className="role"> Role: Waiter</div>
      <div className="roleid"> ID: {terms.user.id} </div>
    </header>
  );
}

export default RestaurantHeader;