import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({ courses, setCourses, setOnEdit }) => {

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
                <tbody>{courses.map((item, i) => (

                    <tr key={i}>
                        <th scope="row">{i}</th>
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
            </div>
            
        </>
    );
};

export default Grid;