import React from "react";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
const TodoCreate = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        axios
            .post("http://localhost:5000/addEmploy", data)
            .then((res) => {
                if (res.data) {
                    return alert("Employ Added Successfully");
                }
            })
            .catch((err) => console.log(err, "failed"));
    };

    return (
        <div className="App">
            <div className="title">
                <h1>Todo App</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md="12" sm="12" className="input_container pt-5">
                        <input
                            defaultValue="test"
                            placeholder="Fast Name"
                            {...register("fastName")}
                        />
                    </Col>
                    <Col md="12" sm="12" className="input_container">
                        <input
                            {...register("lastName", { required: true })}
                            placeholder="Last Name"
                        />
                        {errors.lastName && <span>This field is required</span>}
                    </Col>
                    <Col md="12" sm="12" className="input_container">
                        <input
                            {...register("email", { required: true })}
                            placeholder="Email"
                        />
                        {errors.email && <span>This field is required</span>}
                    </Col>
                    <Col lg="12" md="12" sm="12" className="btn_container">
                        <Button type="submit">Add</Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default TodoCreate;
