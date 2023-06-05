import React from 'react';
import {Route, Routes, Link, useLocation} from "react-router-dom";
import Analytics from './pages/Analytics';
import TableComponent from './components/TableComponents';
import "./App.css"
const App = () => {
  const location = useLocation();

  const buttonLink = location.pathname === '/analytics' ? '/' : '/analytics';
  const buttonText = location.pathname === '/analytics' ? 'Table' : 'Analytics';

  return (
    <div className="app-container">
      <h1 className="app-title">SpaceX Launches</h1>
      <button className="app-button">
        <Link to={buttonLink} className="app-link">{buttonText}</Link>
      </button>
      
      <Routes>
      <Route path='/' element={<TableComponent/>}/>
      <Route path='/analytics' element={<Analytics/>}/>
      <Route/>
      </Routes>
    </div>
  );
};

export default App;
