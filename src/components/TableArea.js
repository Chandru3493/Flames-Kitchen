import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


function TableArea({ onTableSelect,data }) {
  const [tableStatus, setTableStatus] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);
  const legendRef = useRef(null);
  if (data && data ? data : true) {
    import('../waiter.css');
 }
  useEffect(() => {
    
    const fetchTableStatuses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tables');
        setTableStatus(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTableStatuses();

    if (!legendRef.current) {
  // Legend entries not created yet
  legendRef.current = []; // Initialize the ref with an empty array

  // Logic to populate the legend (same as before)
  const legendList = document.querySelector('.table-legend ul'); 
  const statusColors = ['available', 'occupied', 'reserved', 'out-of-service'];

  statusColors.forEach(status => {
    const listItem = document.createElement('li');

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box', status); 

    const description = document.createTextNode(`${status.charAt(0).toUpperCase() + status.slice(1)}`);

    listItem.appendChild(colorBox); 
    listItem.appendChild(description); 
    legendList.appendChild(listItem); 

    legendRef.current.push(listItem); // Add the list item to the ref
  });
}
  }, []);

  const handleTableClick = async (tableId) => {
    try {

      const response = await axios.get(`http://localhost:4000/api/tables/${tableId}`);
      setSelectedTable(response.data); 
      onTableSelect(response.data); 
    } catch (error) {
      console.error('Error fetching table details:', error);
    }
  };

  // Function to update the table status when the status changes
  const updateTableStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/tables');
      setTableStatus(response.data);
    } catch (error) {
      console.error("Error updating table status:", error);
    }
  };

  // useEffect to trigger the updateTableStatus function whenever the status changes
  useEffect(() => {
    updateTableStatus();
  }, [tableStatus]); 
  return (
    <div className="table-area">
      <div className="table-grid">
        {Object.keys(tableStatus).map((id) => {
          let statusClass;
          switch (tableStatus[id].status) {
            case 'Occupied':
              statusClass = 'occupied';
              break;
            case 'Available':
              statusClass = 'available';
              break;
            case 'Reserved':
              statusClass = 'reserved';
              break;
            case 'Out of Service':
              statusClass = 'out-of-service';
              break;
            default:
              statusClass = 'default';
          }
          return (
            <Button
              key={parseInt(id) + 1}
              className={`table-button ${statusClass}`}
              onClick={() => handleTableClick(parseInt(id) + 1)}
            >
              Table {parseInt(id, 10) + 1}
            </Button>
          );
        })}
      </div>
      <div className="table-area">
  </div> <div className="table-legend"> 
  <h2>Table Status</h2>
  <ul>
    </ul>
</div>
    </div>
  );
}

export default TableArea;