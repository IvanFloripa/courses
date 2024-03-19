import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";

const Grid = ({ courses, setCourses, setOnEdit }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = courses.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(courses.length / recordsPerPage);
    const numbers = [...Array(nPages + 1).keys()].slice(1);

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:3000/course/${id}`)
            .then(({ data }) => {
                const newArray = courses.filter((course) => course.id !== id);

                setCourses(newArray);
                toast.success(data);
            })
            .catch((error) => {
                toast.error(error);
            });
        setOnEdit(null);
    };

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
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Total Hours</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>{records.map((item, i) => (

                        <tr key={i}>
                            <th scope="row">{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.rating}</td>
                                <td>{item.totalHours}</td>
                                <td>
                                    <FaEdit onClick={() => handleEdit(item)}/>
                                </td>
                                <td>
                                    <FaTrash onClick={() => handleDelete(item.id)}/>
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
            
        </>
    );
};

export default Grid;