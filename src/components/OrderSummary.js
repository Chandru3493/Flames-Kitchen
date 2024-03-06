import React,{useEffect, useState } from 'react';

function OrderSummary({ cartItems, onRemoveFromCart, onQuantityChange,onPlaceOrder, onSubmitOrder }) {
  const [orderStatus, setOrderStatus] = useState('Waiting for Order');

  useEffect(() => {
    // Update order status based on cart state
    if (cartItems.length === 0) {
      setOrderStatus('Waiting for Order');
    } else {
      setOrderStatus('Order Placed'); 
    }
  }, [cartItems]); 

  const calculateTotal = (cartItems) => {
    let total = 0;
  
    // Iterate through the cart items
    //cartItems.forEach((item) => {
    //  total += item.price * item.quantity;
    //});
  
    // You might want to format the total for display
    //return total.toFixed(2); // Returns the total with two decimal places
  };

  const handleSubmitOrder = () => {
    onPlaceOrder(); // Call the new function from OrderTakingPopup
    setOrderStatus('Order Delivered');
  };

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <p>Order Status: {orderStatus}</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item, e.target.value)}
                  />
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button onClick={() => onRemoveFromCart(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total:</td>
              <td colSpan="2">${calculateTotal()}</td>
            </tr>
          </tfoot>
        </table>
      )}
      {orderStatus === 'Waiting for Order' ? (
        <button onClick={handleSubmitOrder} className="place-order-button">Place Order</button>
      ) : (
        <>
         {/* Remove 'Order Delivered' button */}
          <button onClick={() => setOrderStatus('Order Placed')} className="add-items-button">Add Items</button>
        </>
      )}
    </div>
  );
}

export default OrderSummary;