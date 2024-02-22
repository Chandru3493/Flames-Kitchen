import React, { useState, useEffect } from 'react'; 
import '../App.css';
import selectedTable from './TableLayout';
import OrderPopup from './OrderPopup'; // Adjust the path if necessary
import axios from 'axios';

function Sidebar() {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Example state to show/hide the sidebar
    const handleTakeOrder = () => {
        setIsOrderModalOpen(true);
    }
    const [status, setStatus] = useState(selectedTable ? selectedTable.status : 'Available');
    const [occupancy, setOccupancy] = useState(selectedTable ? selectedTable.capacity : 0);

    useEffect(() => {
        // Load initial values only if a table is selected
        if (selectedTable) {
            setStatus(selectedTable.status);
            setOccupancy(selectedTable.capacity);
        }
    }, [selectedTable]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        updateTableStatus(newStatus); // Call a function to update on the backend 
    };

    const handleOccupancyChange = (change) => {
        let newOccupancy = occupancy + change;
        if (newOccupancy >= 0) { // Basic validation
            setOccupancy(newOccupancy);
        }
    };

    const updateTableStatus = async (newStatus) => {
        try {
            await axios.put(`http://localhost:3001/api/tables/${selectedTable.id}`, { status: newStatus });
            console.log('Table status updated'); 
        } catch (error) {
            console.error('Error updating table status:', error);
        }
    };

    return (
        <div className="sidebar">
            <h3>Table Details</h3> 
            {selectedTable && ( 
                <div>
                    <p>Table ID: {selectedTable.id}</p>
                    <p>
                        Occupancy: 
                        <button onClick={() => handleOccupancyChange(-1)}>-</button>
                        {occupancy}
                        <button onClick={() => handleOccupancyChange(1)}>+</button> 
                    </p>
                    <p>Status:</p>  
                    <div> {/* Radio button container */}
                        <input type="radio" name="status" value="Available" checked={status === 'Available'} onChange={() => handleStatusChange('Available')} /> Available
                        <input type="radio" name="status" value="Occupied"  checked={status === 'Occupied'} onChange={() => handleStatusChange('Occupied')} /> Occupied
                    </div>
                    <p style={{ color: status === 'Available' ? 'green' : 'orange' }}>
                        {status} 
                    </p>                   
                    <button onClick={handleTakeOrder}>Take Order</button> 
    
                    {isOrderModalOpen && (  
                        <OrderPopup 
                            selectedTable={selectedTable} 
                            onClose={() => setIsOrderModalOpen(false)} 
                        /> 
                    )}
                </div> 
            )} 
        </div>
    );
    

                    }

export default Sidebar;
