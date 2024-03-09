import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RestaurantHeader from './RestaurantHeader';
import TableArea from './TableArea'; 
import NotificationsBoard from './NotificationsBoard';
import TableDetailsPopup from './TableDetailsPopup';

function Waitercom(props) {
    const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [isTableDetailsVisible, setIsTableDetailsVisible] = useState(false);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    props.data.x();
    navigate("/");
    window.location.reload();
    
  };
  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setIsTableDetailsVisible(true);
  };

  const handleClosePopup = () => {
    setSelectedTable(null);
    setIsTableDetailsVisible(false);
  };

  if (props.data && props.data.wtcss ? props.data.wtcss : true) {
    import('../waiter.css');
 }

  return (<>
    <div className='nav'>
      <div id="fir">
      <div id='ine'><img className='imag' src="./logo.png" /></div><div id='tuo'>FLAMES KITCHEN</div></div>
        
        <div id='tex'><div id='usern'>Hello {props.data.use.name}</div>
                             <div className='buttona' id='log'  onClick={()=>{handleLogout()}}>
    Logout</div>
        </div>
        
  </div>
    <div className='app-container'>
      <RestaurantHeader data={props.data.wtcss} />
      <div className='content-wrapper'>
        <TableArea data={props.data.wtcss} onTableSelect={handleTableSelect} />
        <TableDetailsPopup data={props.data.wtcss} selectedTable={selectedTable} onClose={handleClosePopup} />
        <div className='side-area'>
          <NotificationsBoard data={props.data.wtcss} />
        </div>
      </div>

    </div>
    </>

  );
}

export default Waitercom;