import React, { useEffect, useState } from 'react';
import Grid from './Grid.js';
import Fields from './Fields.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function Form () {
    const [courses, setCourses] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const getCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5004/course');
        setCourses(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      getCourses();
    }, [setCourses]);

    return (
        <div className="container p-4">
            <div className="row">
                <h1>Courses</h1>
                    <Fields onEdit={onEdit} setOnEdit={setOnEdit} getCourses={getCourses}/>
                    <Grid courses={courses} setCourses={setCourses} setOnEdit={setOnEdit}/>
                    <ToastContainer position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
            </div>
        </div>
    );
};

export default Form;