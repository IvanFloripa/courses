// import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ToastMessage from '../messages/ToastMessage';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function UserForm() {
  const param = useParams();
  const SUCCESS = "success";
  const ERROR = "error";
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      name: event.currentTarget.elements.name.value,
      email: event.currentTarget.elements.email.value,
      password:  event.currentTarget.elements.password.value,
    }
    if (param.id) {
      await axios
      .patch(`http://localhost:5004/user/${param.id}`, user)
      .then(() => {
        ToastMessage(SUCCESS,"Usuário Alterado com sucesso!");
        setTimeout(() => { 
          navigate("/user") 
        }, 1500);
      })
      .catch((error) => {
          ToastMessage(ERROR,"Erro ao Atualizar o Usuário !");
          setTimeout(() => { 
          }, 1500);
      });
    } else {
      await axios
      .post(`http://localhost:5004/user/`, user)
      .then(() => {
        toast.success("Usuário Cadastrado com sucesso!");
        setTimeout(() => { 
          navigate("/user") 
        }, 1500);
      })
      .catch((error) => {
          console.log(error);
          toast.error("Erro ao Cadastrar o Usuário !");
          setTimeout(() => { 
          }, 1500);
      });
    }
  };

  useEffect(() => {
    if (param.id) {
      const getUser = async () => {
        try {
            const res = await axios.get(`http://localhost:5004/user/${param.id}`)
            setUser(res.data);
        } catch (error) {
          toast.error(error);
        }
      };
      getUser();
    }
   
  }, [setUser, param]);
  
      return (
        <>
          <div className="container p-4">
            <div className="row">
                <h1>Users</h1>
                <form onSubmit={handleSubmit}>
                <div className="col-6 mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type='text'
                        className='form-control' 
                        name='name'      
                        defaultValue={user.name} />
                </div>
                <div className="col-6 mb-3">
                    <label className="staticPassword">E-mail</label>
                    <input 
                        type='email' 
                        className='form-control' 
                        name='email'
                        defaultValue={user.email} />
                </div>
                <div className="col-6 mb-3">
                    <label className="staticPassword">Password</label>
                    <input 
                        type='password' 
                        className='form-control' 
                        name='password'
                        defaultValue={user.password}/>
                </div>
                <div className="col-6 mb-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <ToastContainer
                      autoClose={5000}
    	                position="top-right"
    	              />
                </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default UserForm;