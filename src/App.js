import React, {useState} from 'react';
import './App.css'; // Import your styles
import RestaurantHeader from './components/RestaurantHeader';
import TableArea from './components/TableArea';
import Sidebar from './components/Sidebar';
import NotificationsBoard from './components/NotificationsBoard';


function App() {

  const [selectedTable, setSelectedTable] = useState(null);
  return (
    <div className='app-container'>
      <RestaurantHeader />
      <div className='content-wrapper'>
        <TableArea selectedTable={selectedTable} setSelectedTable={setSelectedTable} /> {/* Pass state and setter */}
        <div className='side-area'>
          <NotificationsBoard />
          <Sidebar selectedTable={selectedTable} /> {/* Pass state */}
        </div>
      </div>
    </div>
  );
}

export default App;
