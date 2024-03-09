  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Button from 'react-bootstrap/Button';
  import '../waiter.css';

  function TableArea({ onTableSelect }) {
    const [tableStatus, setTableStatus] = useState({});
    const [selectedTable, setSelectedTable] = useState(null);

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
      </div>
    );
  }

  export default TableArea;
