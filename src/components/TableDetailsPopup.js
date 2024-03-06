import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OrderTakingPopup from './OrderTakingPopup';

function TableDetails({ selectedTable, onClose }) {
  const [status, setStatus] = useState(selectedTable ? selectedTable[0].status : 'Available');
  const [occupancy, setOccupancy] = useState(selectedTable ? selectedTable[0].capacity : 0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    if (selectedTable) {
      setStatus(selectedTable?.[0].status);
      setOccupancy(selectedTable?.[0].capacity);
    }
  }, [selectedTable]);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      await axios.put(`http://localhost:3001/api/tables/${selectedTable[0].id}`, { status: newStatus });
      console.log('Table status updated');
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  const handleOccupancyChange = async (newOccupancy) => {
    setOccupancy(newOccupancy);
    try {
      await axios.put(`http://localhost:3001/api/tables/${selectedTable[0].id}`, { capacity: newOccupancy });
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
    setIsOrderModalOpen(false); // Close the order modal
    onClose();
  };

  return (
    <div className="table-details">
      {selectedTable && (
        <div className="popup-container">
          <div className="popup-content">
            <p>Table ID: {selectedTable[0].id}</p>
            <p>
              Occupancy:
              <select value={occupancy} onChange={(e) => handleOccupancyChange(parseInt(e.target.value))}>
                {[...Array(11).keys()].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </p>
            <p>Status:</p>
            <div>
              <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
          </div>
          <button className="popup-button popup-button-close" onClick={handleCloseOrderPopup}>Close</button>
          {status === 'Occupied' && (
            <div className="popup-buttons">
              <button className="popup-button popup-button-action" onClick={handleTakeOrder}>Take Order</button>
            </div>
          )}
        </div>
      )}
      <OrderTakingPopup 
      show={isOrderModalOpen} 
      onClose={handleCloseOrderPopup}
      tableNumber ={selectedTable[0].id} />
    </div>
  );
}

function TableDetailsPopup({ selectedTable, onClose }) {
  return (
    <>
      {selectedTable && <div className="backdrop" onClick={onClose}></div>}
      <Modal
        show={selectedTable !== null}
        onHide={onClose}
        centered
        dialogClassName="table-details-modal"
      >
        <Modal.Header closeButton className="modal-header"> 
          <Modal.Title>Table Details</Modal.Title>
        </Modal.Header>


        <Modal.Body>
          <TableDetails selectedTable={selectedTable} onClose={onClose} />
        </Modal.Body>
        {/* No footer needed */}
      </Modal>
    </>
  );
}

export default TableDetailsPopup;
