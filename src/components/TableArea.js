import React, { useState } from 'react';
import TableLayout from './TableLayout'; 
import '../App.css';

function TableArea() {
  const [selectedTable, setSelectedTable] = useState(null); 

  const handleTableSelect = (tableId) => { 
    setSelectedTable(tableId);  // Update state in TableArea
  };

  return (
    <div className="table-area"> 
      <TableLayout 
        selectedTable={selectedTable} 
        onTableSelect={handleTableSelect} // Pass the handler down
      />  
    </div>
  );
}

export default TableArea;
