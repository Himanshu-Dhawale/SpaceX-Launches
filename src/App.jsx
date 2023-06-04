import React from 'react';


// import LaunchTable from './components/LaunchTable';
import {Route, Routes, Link} from "react-router-dom";
import Analytics from './pages/Analytics';
import TableComponent from './components/TableComponents';

const App = () => {
  return (
    <div>
      <h1>SpaceX Launches</h1>
      <button ><Link to={"/analytics"}>
      Analytics
        </Link></button>
      
      <Routes>
      <Route path='/' element={<TableComponent/>}/>
      <Route path='/analytics' element={<Analytics/>}/>
      <Route/>
      </Routes>
    </div>
  );
};

export default App;
