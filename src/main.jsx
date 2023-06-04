import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { Provider } from 'react-redux'
// import { store } from './store/store';
import store from './store/store';
// import TableComponent from './components/TableComponent';
import {BrowserRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      {/* <TableComponent/> */}
    </Provider>
      </BrowserRouter>
  </React.StrictMode>,
)
