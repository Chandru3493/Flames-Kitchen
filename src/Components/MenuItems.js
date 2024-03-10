import React from 'react';


function MenuItem({ menuItem, onAddToCart,data }) {
  if (data && data ? data : true) {
    import('../waiter.css');
 }
  return (
    <div className="menu-item">
      <div className="menu-item-name">{menuItem.name}</div>
      <div className="menu-item-price">{menuItem.price}</div>
      <button onClick={() => onAddToCart(menuItem)}>Add to Cart</button>
    </div>
  );
}


export default MenuItem;
