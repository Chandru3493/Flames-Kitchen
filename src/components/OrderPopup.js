import React, { useState, useEffect } from 'react';
import 'bootstrap/js/dist/modal'; // Assuming you have Bootstrap installed
import axios from 'axios';

function OrderPopup({ selectedTable, onClose }) {
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/menu-items');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleAddItem = (itemId) => {
        // ... (Logic  to add to cart, quantity management, etc.) ...
    };

    const handleSubmitOrder = async () => {
        try {
            const orderData = {
                tableId: selectedTable.id,
                items: cartItems // Format your cart items appropriately
            };

            const response = await axios.post('http://localhost:3001/api/orders', orderData);
            console.log('Order submitted:', response.data);
            onClose(); // Successfully close the popup
        } catch (error) {
            console.error('Error submitting order:', error);  
        }   
    };

    return (
        <div className="modal fade" id="orderModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* ... Modal Header with Close Button ... */}
                    <div className="modal-body">
                        <div className="menu-side">
                            {/* Display Menu Items */}
                            {menuItems.map(item => (
                                <div key={item.id}>
                                    {/* Display item details and "Add to Cart" button */}
                                    <button onClick={() => handleAddItem(item.id)}>Add</button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-side">
                            {/* Display Cart Items, Total, etc. */}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmitOrder}>Submit Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderPopup;
