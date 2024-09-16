// import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

function UserList () {

  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5004/user');
      setUsers(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (id) => {
    await axios
        .delete(`http://localhost:5004/user/${id}`)
        .then(({ data }) => {
            setUsers(
                users.filter((post) => {
                   return post.id !== id;
                })
             );
            toast.success(data);
        })
        .catch((error) => {
            toast.error(error);
        });
  };

  

  useEffect((id) => {
    getUsers();
  }, [setUsers]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);


  

  function prePage ()  {
    if (currentPage !== firstIndex) {
        setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage (id)  {
      setCurrentPage(id);
  }

  function nextPage() {
      if(currentPage !== lastIndex) {
          setCurrentPage(currentPage + 1);
      }
  }

      return (
        <>
          <div className="container p-4">
            <div className='row'>
                <div className='col-12'>
                        <h1>Users</h1>
                </div>
                <div className='col-4'>
                    <Link
                        to='/create-user'
                        className='btn btn-primary'
                    >
                        Create User 
                    </Link>
                </div>
            </div>
              <div className="row p-2">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>{records.map((item, i) => (

                        <tr key={i}>
                            <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Link
                                        to={`/edit-user/${item.id}`}
                                        className='btn btn-primary'
                                    >
                                        Edit 
                                    </Link>
                                </td> 
                                <td>
                                    <Link
                                        className='btn btn-danger' onClick={() => handleDelete(item.id)}
                                    >
                                        Delete 
                                    </Link>
                                </td>                               
                        </tr>
                    ))}</tbody>
                </table>
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            {currentPage != 1 && <a href="#" className="page-link" onClick={prePage}>Prev</a>}
                        </li>
                        {
                            numbers.map((n, i)  => (
                                <li className={`page-item ${currentPage === n ?  'active' : '' }`}key={i}>
                                    <a href="#" className="page-link" onClick={() => changeCPage(n)}> {n} </a>
                                </li>
                            ))
                        }
                        <li className="page-item">
                            {currentPage != nPages && <a href='#' className="page-link" onClick={nextPage}>Next</a>}
                        </li>
                    </ul>
                </nav>
            </div>
          </div>
        </>
    );
}

export default UserList ;
