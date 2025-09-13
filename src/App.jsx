import React from 'react'
import {} from "antd";
import "./App.css";
import AppHeader from "./Components/Header"
import AppFooter from "./Components/Footer"
import PageContent from './Components/PageContent';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
     <AppHeader/>
     <PageContent/>
     <AppFooter/>
     </BrowserRouter>
    </div>
  )
}


export default App
