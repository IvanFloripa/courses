// import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

function User () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5004/course');
      setUsers(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);
  return (
    <div className="container p-4">
      <div className="row">
        <h1>Users</h1>
        <form >
          <div className="col-6 mb-3">
            <label className="form-label">Name</label>
            <input 
             type='text'
             className='form-control' 
             name='name'      
             value={name}          
             onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-6 mb-3">
            <label className="staticPassword">E-mail</label>
            <input 
             type='email' 
             className='form-control' 
             name='email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="col-6 mb-3">
            <label className="staticPassword">Password</label>
            <input 
             type='password' 
             className='form-control' 
             name='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="col-6 mb-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;