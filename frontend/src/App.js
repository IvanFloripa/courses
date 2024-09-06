import Form from './components/Form.js';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import React, {useContext } from 'react';
import {AuthContext} from './contexts/Auth/AuthContext.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
          { auth ? <Route path="/" element={<Form />} /> : null }
      </Routes>
    </Router>
  );

}

export default App;
