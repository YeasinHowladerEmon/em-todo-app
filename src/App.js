import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import SendEmail from './Components/SendEmail.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sendEmail" element={<SendEmail />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
