import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import CategoryMenu from './CategoryMenu';
import MenuItems from './MenuItems';
import OrderSummary from './OrderSummary';
import axios from 'axios';
import terms from './terms';


function OrderTakingPopup({ show, onClose, tableNumber,data }) {
  if (data && data ? data : true) {
    import('../waiter.css');
 }
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderStatus, setOrderStatus] = useState('Waiting for Order');
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const itemsPerPage = 10; 

  // Fetch items for a specific category
  useEffect(() => {
    const fetchMenuItems = async (category = 'All') => {
      try {
        const endpoint = category === 'All'
          ? 'http://localhost:4000/api/menu-items'
          : `http://localhost:4000/api/menu-items/${category}`;

        const response = await axios.get(endpoint);
        setMenuItems(response.data);
      } catch (error) {
        console.error(`Error fetching items for category ${category}:`, error);
      }
    };

    fetchMenuItems(selectedCategory); 
  }, [selectedCategory]); 


  useEffect(() => {
    const fetchOpenOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/table/${tableNumber}`); 
        const existingOrders = response.data;
        console.log('Existing Orders:', existingOrders);

        if (existingOrders) {
          const activeOrder = existingOrders; 
    
          // Adjust items mapping 
          const items = activeOrder.orderitems.map(orderitem => ({
            id: orderitem.menu_item_id, 
            name: orderitem.menuitem.name, 
            price: orderitem.price,
            quantity: orderitem.quantity
          }));
    
          setOrderDetails(activeOrder); // Update with the active order
          setOrderId(activeOrder.id);
          setCartItems(items); 
          setOrderStatus(activeOrder.status);
        } 
    
        }
       catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    // Fetch orders when the component mounts and when tableNumber changes
    if (show) fetchOpenOrders(); 
  }, [show, tableNumber]); 

  const filterMenuItems = (category) => {
    return category === 'All' 
      ? menuItems
      : menuItems.filter((item) => item.category === category);
  };

  const addToCart = (menuItem) => {
    const existingItem = cartItems.find((item) => item.id === menuItem.id);
    if (existingItem) {
      setCartItems(cartItems.map((item) => (
        item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
      )));
    } else {
      setCartItems([...cartItems, { ...menuItem, quantity: 1 }]);
    }
  };

  const calculateTotal = (cartItems) => {
    console.log('cartItems in calculateTotal:', cartItems); // Check content of cartItems
    let total = 0;
    if (cartItems) {
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
            console.log('item.price:', item.price, 'item.quantity:', item.quantity); // Check values during calculation
        });
    }

    console.log('Calculated total:', total); 
    return total;
};
  const handlePlaceOrder = async () => { 
    try {
      // 1. Create the order on the backend
      const newOrderResponse = await axios.post('http://localhost:4000/api/orders', {
        table_id: tableNumber, // Pass in the table number
        waiter_id: terms.user.id, // replace with actual waiter ID
        status: 'todo', // Initial status
        total_amount: calculateTotal(cartItems), // Calculate the total amount
        order_time: new Date().toISOString(), // Current time
        order_prep: cartItems.length
      });
      const order_id = newOrderResponse.data.id;
      setOrderStatus('todo');

      // 2. Create order items on the backend
      const orderItemPromises = cartItems.map((item) =>
        axios.post('http://localhost:4000/api/order-items', {
          order_id,
          menu_item_id: item.id,
          cook_id: null, // replace with actual cook ID
          status: 'todo',
          price: item.price,
          quantity: item.quantity,
        })
      );
      await Promise.all(orderItemPromises); // Wait for creation


      const orderResponse = await axios.get(`http://localhost:4000/api/orders/${order_id}`);
      setOrderDetails(orderResponse.data);                   
       // Set order status and clear the cart
      setOrderId(order_id); 
      setOrderStatus('todo'); 
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };



  const removeFromCart = (menuItem) => {
    setCartItems(cartItems.filter((item) => item.id !== menuItem.id));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleQuantityChange = (menuItem, newQuantity) => {
    setCartItems(cartItems.map((item) => (item.id === menuItem.id ? { ...item, quantity: newQuantity } : item)));
  };

  const handleCloseOrder = async () => { 
    try {
      await axios.put(`http://localhost:4000/api/orders/${orderId}/status`, { status: 'Order Closed' });
      setOrderStatus('Order Closed');
      setCartItems([]);
    } catch (error) {
      console.error('Error closing order:', error);
    }
  };
  
  return (
    <Modal show={show} onHide={onClose} centered className="order-taking-popup">
      <Modal.Header closeButton>
        <Modal.Title>Take Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
   
        <div className="table-number">Table: {tableNumber}</div> {/* Display the table number */}
  
        <div className="order-taking-container">
         <CategoryMenu 
              data={data}
              categories={["Starter","Main Course", "Dessert",  "All"]}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryClick}
          />
          <div className="menu-items-list">
            {filterMenuItems(selectedCategory)
              .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
              .map((menuItem) => (
                <MenuItems
                data={data}
                  key={menuItem.id}
                  menuItem={menuItem}
                  onAddToCart={addToCart}
                  onQuantityChange={handleQuantityChange}
                  orderStatus={orderStatus}
                />
              ))}
            <div className="menu-navigation">
              <button onClick={handlePrevClick}>Previous</button>
              <button onClick={handleNextClick}>Next</button>
            </div>
          </div>
          <OrderSummary 
          data={data}
         cartItems={cartItems} 
         setCartItems={setCartItems}
         onRemoveFromCart={removeFromCart} 
         onQuantityChange={handleQuantityChange} 
         onPlaceOrder={handlePlaceOrder} 
         orderStatus={orderStatus}
         setOrderStatus={setOrderStatus}
         handleCloseOrder={handleCloseOrder}
         orderDetails={orderDetails}
         orderId={orderId}
         />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default OrderTakingPopup;