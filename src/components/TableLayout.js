import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../App.css';

function TableLayout() {
  const [tableStatus, setTableStatus] = useState({}); 
  const [selectedTable, setSelectedTable] = useState(null); // Track currently selected table 

  useEffect(() => {
    const fetchTableStatuses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tables');  
        setTableStatus(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error); 
      } 
    };
    fetchTableStatuses();
  }, [tableStatus]);

  const handleTableClick = async (tableId) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/tables/${tableId}`);
        setSelectedTable(response.data); // Store all table details 
        console.log(selectedTable)
    } catch (error) {
        //console.error('Error fetching table details:', error);
    }
};
  function getVariantForStatus(status, selected) {
    if (selected) return 'info'; 
    switch(status) {
      case 'Occupied': return 'danger';
      case 'Available': return 'warning';
      default: return 'success';
    }
}
 

  return (
    <div className="table-grid"> 
      {Object.keys(tableStatus).map((tableId) => (
        <Button 
          key={tableId} 
          variant={getVariantForStatus(tableStatus[tableId].status, tableId === selectedTable)} 
          className="table-button"
          onClick={() => handleTableClick(tableId)} 
        >
          Table {parseInt(tableId, 10) + 1}
        </Button>
      ))}
    </div>
  );
}

export default TableLayout;
