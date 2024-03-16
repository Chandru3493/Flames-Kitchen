import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import OrderTakingPopup from './OrderTakingPopup';

function TableDetails({ selectedTable, onClose,data }) {
  
  console.log('Table Details - selectedTable:', selectedTable); 

  console.log('selectedTable:', selectedTable);
  const [status, setStatus] = useState('Available'); 
  const [occupancy, setOccupancy] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    if (selectedTable) {
      setStatus(selectedTable.status || 'Available'); // Handle potential undefined status
      setOccupancy(selectedTable.capacity || 0); // Handle potential undefined capacity 
    } else {
      // Reset to defaults when no table is selected
      setStatus('Available');
      setOccupancy(0);
    }
  }, [selectedTable]);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      //console.log('Updating table with ID:', selectedTable.id); 

      await axios.put(`http://localhost:4000/api/tables/${selectedTable?.id}`, { status: newStatus });
      //console.log('Table status updated');
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  const handleOccupancyChange = async (newOccupancy) => {
    setOccupancy(newOccupancy); 
  
    try {
      await axios.put(`http://localhost:4000/api/tables/${selectedTable?.id}`, { capacity: newOccupancy });
      console.log('Table occupancy updated');
    } catch (error) {
      console.error('Error updating table occupancy:', error);
    }
  };
  

  const handleTakeOrder = () => {
    setIsOrderModalOpen(true); // Open the order modal
    console.log('Take order clicked');
  };

  const handleCloseOrderPopup = () => {
    console.log('handleCloseOrderPopup called, current isTableDetailsVisible:', isOrderModalOpen); // Check current visibility state
    setIsOrderModalOpen(false);  
    console.log('State updated, new isTableDetailsVisible:', isOrderModalOpen); // Check updated visibility state
    onClose(); 
    console.log('onClose from parent component called'); // Check if the parent's handler is called
  };

  return (
    <div className="table-details">
      {selectedTable && (
        <div className="popup-container">
          <div className="popup-content">
            <p><h4>Table ID:</h4>    {selectedTable?.id}</p>
            <p>
              <h4>Occupancy:</h4>
              <select value={occupancy} onChange={(e) => handleOccupancyChange(e.target.value)}>
                {[...Array(11).keys()].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </p>
            <h4>Status:</h4>
            <div>
              <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
          </div>
          
          {status === 'Occupied' && (
            <div className="popup-buttons">
              <button className="popup-button popup-button-action" onClick={handleTakeOrder}>Take Order</button>
            </div>
          )}
          <button className="popup-button popup-button-close" onClick={handleCloseOrderPopup}>&larr;</button>
        </div>
      )}
      <OrderTakingPopup 
      data={data}
      show={isOrderModalOpen} 
      onClose={handleCloseOrderPopup}
      tableNumber ={selectedTable?.id} />
    </div>
  );
}

function TableDetailsPopup({ selectedTable, onClose }) {
  console.log('TableDetailsPopup rendered, selectedTable:', selectedTable); 
  return (
    <>
      {/* {selectedTable && (
        <div className="backdrop" onClick={() => {
          console.log('Backdrop clicked');
          onClose();
        }}>
      </div>
      )} */}
      <Modal
        show={selectedTable !== null}
        onHide={() => {
          console.log('Modal onHide triggered')
          onClose();
          }}
        centered
        dialogClassName="table-details-modal"
      >
        <Modal.Body>
          <TableDetails selectedTable={selectedTable} onClose={onClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableDetailsPopup;
