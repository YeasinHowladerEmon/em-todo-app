import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SendEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [sent, setSent] = useState(false);
  const onSubmit = async (data) => {
    setSent(true);
    axios
      .post("https://sleepy-garden-57473.herokuapp.com/sendEmail", data)
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h1 className="mb-5 mt-5 text-center">Send Email</h1>
      {sent ? (
        <h2 className="text-center">Email Sent Successfully</h2>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="12" sm="12" className="input_container pt-5">
              <input placeholder="Submit" {...register("subject")} />
            </Col>
            <Col md="12" sm="12" className="input_container">
              <input
                as="textarea"
                {...register("body", { required: true })}
                placeholder="body"
              />
              {errors.body && <span>This field is required</span>}
            </Col>
            <Col lg="12" md="12" sm="12" className="btn_container">
              <Button type="submit">Send Mail</Button>
            </Col>
          </Row>
        </form>
      )}
    </div>
  );
};

export default SendEmail;
