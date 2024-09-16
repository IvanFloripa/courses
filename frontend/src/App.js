import Form from './components/Form.js';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import React, {useContext } from 'react';
import {AuthContext} from './contexts/Auth/AuthContext.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from './components/UserList.js';
import UserForm from './components/UserForm.js';

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserList />} />
          { auth ? <Route path="/" element={<Form />} /> : <Route path="/login" element={<Login />} /> }
        <Route 
          path="/create-user/" 
          element={<UserForm />} 
          />
        <Route 
          path="/edit-user/:id" 
          element={<UserForm />} 
          />
      </Routes>
    </Router>
  );

}

export default App;
