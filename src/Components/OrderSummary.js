import axios from 'axios';
function OrderSummary({ data,cartItems, onRemoveFromCart, onQuantityChange,onPlaceOrder, handleCloseOrder, orderStatus, setOrderStatus, orderDetails, orderId}) {
  console.log('Order detials',orderDetails);

  const calculateTotal = (cartItems) => {
    console.log('order details', orderDetails);
    console.log('cartItems in calculateTotal:', cartItems); // Check content of cartItems

    let total = 0;
    if (cartItems) {
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
            console.log('item.price:', item.price, 'item.quantity:', item.quantity); // Check values during calculation
        });
    }

    console.log('Calculated total:', total); 
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total);
};

const orderStatusMessages = {
  todo: "Order Placed", 
  inprogress: "Chef performing his magic",
  done: "Order Prepared",
  'order delivered': "Order Delivered",
  'order closed': "Order Closed"
};

const displayOrderStatus = () => {
  const currentStatus = orderStatus.toLowerCase(); // Normalize to lowercase

  // Check if the status exists in your mapping
  if (orderStatusMessages.hasOwnProperty(currentStatus)) {
    return orderStatusMessages[currentStatus]; 
  } else { 
    return "Waiting for Orders"; // Default message for unexpected status
  }
};


const renderButtons = () => {
  switch (orderStatus.toLowerCase()) {
    case 'waiting for order': 
      return <button onClick={onPlaceOrder} className="place-order-button" disabled={cartItems.length === 0} >Place Order</button>
    case 'done': 
      return <div>
      <button onClick={handleDelivered} className="delivered-button">Delivered</button>
      <button onClick={handleCloseOrder} className="close-order-button">Close Order</button>

      </div>
    case 'order closed':
      return <button onClick={onPlaceOrder} className="place-order-button" disabled={cartItems.length === 0} >Place Next Order</button>
    default: 
      return <button onClick={handleCloseOrder} className="close-order-button">Close Order</button>
  }
};

const handleDelivered = async () => {
  try {
    await axios.put(`http://localhost:4000/api/orders/${orderId}/status`, { status: 'Order Delivered' });
    setOrderStatus('Order Delivered');
  } catch (error) {
    console.error('Error updating order status to Delivered:', error);
  }
};

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
          {orderDetails && (
        <div className="order-details">
        {orderDetails && (
        <div className="order-details">
          <p>Order ID: {orderId || 'None'}</p> 
        
          
        </div>
      )}
          {orderDetails.items && ( 
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item) => (
                  <tr key={item.id}> 
                    <td>{item.name}</td>
                    <td>{item.quantity}</td> 
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Total:</td>
                  <td>{calculateTotal(orderDetails.items)}</td> 
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      )}
      {cartItems && cartItems.length === 0 ? (
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
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button onClick={() => onRemoveFromCart(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total:</td>
              <td colSpan="2">{calculateTotal(cartItems)}</td>
            </tr>
          </tfoot>
        </table>
      )}
      <>
      <div className="order-status">
           {displayOrderStatus()} 
          </div>
          {renderButtons()} 
    </>
    </div>
  );
}

export default OrderSummary;