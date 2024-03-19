import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    heigth: 42px;
`;

const Form = ({ getCourses, onEdit, setOnEdit }) => {
    const ref = useRef();
    useEffect(() => {
        if(onEdit){
            const course = ref.current;
            course.title.value = onEdit.title;
            course.description.value = onEdit.description;
            course.rating.value = onEdit.rating;
            course.totalHours.value = onEdit.totalHours;

        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = ref.current;

        if(
            !course.title.value ||
            !course.description.value ||
            !course.rating.value ||
            !course.totalHours.value
        ) {
            return toast.warn("Fill in all fields");
        }

        if(onEdit) {
            await axios 
            .patch(`http://localhost:3000/course/${onEdit.id}`, {
                "description": course.description.value,
                "rating": course.rating.value,
                "totalHours": course.totalHours.value,
            })
            .then(() => toast("Form updated successfully"))   
            .catch((error) => toast.error(error));
        } else {
            await axios 
            .post("http://localhost:3000/course", {
                "title": course.title.value,
                "description": course.description.value,
                "rating": course.rating.value,
                "totalHours": course.totalHours.value,
            })
            .then(() => toast.success("Form saved successfully", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })) 
            .catch((error) => 
                toast.error("Error Saving Form", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }));

        }

        course.title.value = "";
        course.description.value = "";
        course.rating.value = "";
        course.totalHours.value = "";

        setOnEdit(null);
        getCourses();

    };

    return (
        <section className="mb-4">
            <div className="container">
                <FormContainer ref={ref} onSubmit={handleSubmit}>
                    <InputArea>
                        <Label>Title</Label>
                        <Input name="title"></Input>
                    </InputArea>
                    <InputArea>
                        <Label>Description</Label>
                        <Input name="description"></Input>
                    </InputArea>
                    <InputArea>
                        <Label>Rating</Label>
                        <Input name="rating"></Input>
                    </InputArea>
                    <InputArea>
                        <Label>Total Hours</Label>
                        <Input name="totalHours"></Input>
                    </InputArea>

                    <Button type="submit">Save</Button>
                </FormContainer>
            </div>
        </section>
        
    );
};

export default Form;