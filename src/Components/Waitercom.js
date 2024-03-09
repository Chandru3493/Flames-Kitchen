import React, { useState } from 'react';
import '../waiter.css'; 
import RestaurantHeader from './RestaurantHeader';
import TableArea from './TableArea'; 
import NotificationsBoard from './NotificationsBoard';
import TableDetailsPopup from './TableDetailsPopup';

function Waitercom() {
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

export default Waitercom;