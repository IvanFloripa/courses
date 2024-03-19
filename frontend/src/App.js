import Form from './components/Form.js';
import { useEffect, useState } from 'react';
import Grid from './components/Grid.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getCourses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/course');
      setCourses(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [setCourses]);

  return (
    <section id="crud-course">
        <div className="container">
          <h1>Courses</h1>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getCourses={getCourses}/>
          <Grid courses={courses} setCourses={setCourses} setOnEdit={setOnEdit}/>
        </div>
    </section>
  );
}

export default App;
