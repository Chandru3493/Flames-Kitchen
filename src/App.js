// App.js
import React, { useState } from 'react';
import './waiter.css'; 
import RestaurantHeader from './components/RestaurantHeader';
import TableArea from './components/TableArea'; 
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
    setSelectedTable(null);
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
