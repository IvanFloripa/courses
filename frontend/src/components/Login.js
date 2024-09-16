// import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { toast } from 'react-toastify';
import axios from "axios";

function Login (login) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth  } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault()
    let email = event.currentTarget.elements.email.value;
    let password = event.currentTarget.elements.password.value;
    await axios
        .post(`http://localhost:5004/auth/login`,{
          email: email,
          password: password
        })
        .then(({ data }) => {
          setAuth(true);
          toast.success("Logado com sucesso!");
          navigate("/");
        })
        .catch((error) => {
            toast.error("Erro no login");
        });
  };
  return (
    <div className="container p-4">
      <div className="row">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="col-6 mb-3">
            <label className="staticEmail">Email</label>
            <input 
             type='email'
             className='form-control' 
             name='email'      
             value={email}          
             onChange={(e) => setEmail(e.target.value)}
            />
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

export default Login;