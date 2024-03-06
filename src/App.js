// App.js
import React, { useState } from 'react';
import './App.css'; // Import your styles
import RestaurantHeader from './components/RestaurantHeader';
import TableArea from './components/TableArea'; // Import the SidebarPopup component
import NotificationsBoard from './components/NotificationsBoard';
import TableDetailsPopup from './components/TableDetailsPopup';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isTableDetailsVisible, setIsTableDetailsVisible] = useState(false);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setIsTableDetailsVisible(true);
  };

  const handleClosePopup = () => {
    setIsTableDetailsVisible(false);
  };

  return (
    <div className='app-container'>
      <RestaurantHeader />
      <div className='content-wrapper'>
        <TableArea onTableSelect={handleTableSelect} />
        <TableDetailsPopup selectedTable={selectedTable} onClose={handleClosePopup} />
        <div className='side-area'>
          <NotificationsBoard />
        </div>
      </div>
    </div>
  );
}

export default App;
