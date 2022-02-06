import axios from "axios";
import React, { useEffect, useState } from "react";
import { parse } from "papaparse";
import { Alert, CloseButton, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const DragAndDrop = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [closes, setCloses] = useState(true);

  const ondrag = (data) => {
    // console.log(data)

    Array.from(data.file)
      .filter((file) => file.type === "application/vnd.ms-excel")
      .forEach(async (file) => {
        const text = await file.text();
        let result = parse(text, { header: true });
        const resultData = result.data;
        const dataFilter = resultData.filter(
          (file) => (file.fastName && file.lastName && file.email) !== ""
        );
        const dataError = resultData.filter(
          (file) => (file.fastName && file.lastName && file.email) === ""
        );
        console.log(dataFilter);
        setSuccess(dataFilter.length);
        setErrors(dataError.length);
        axios
          .post("http://localhost:5000/addMoreEmploy", dataFilter)
          .then((res) => {
            if (res.data) {
              return alert("Employ Added Successfully");
            }
          })
          .catch((err) => console.log(err, "failed"));
      });
  };

  return (
    <div>
      <form onChange={handleSubmit(ondrag)}>
        <Row>
          <Col md="12" sm="12" className="input_container pt-5">
            <input type="file" {...register("file")} />
          </Col>
          {errors ? (
            <div>
              {closes && (
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Oh Sit! You got an error!</Alert.Heading>
                  <p>
                    Invalid <strong>{errors}</strong> Errors
                  </p>
                  and <strong>{success} successfully send</strong>
                  <CloseButton
                    onClick={() => setCloses(false)}
                    variant="white"
                  />
                </Alert>
              )}
            </div>
          ) : (
            success && (
              <div>
                {closes && (
                  <Alert variant="success" dismissible>
                    <Alert.Heading>Hoorey! You did it !</Alert.Heading>
                    <CloseButton
                      onClick={() => setCloses(false)}
                      variant="white"
                    />
                    <p>Successfully {success} gone</p>
                  </Alert>
                )}
              </div>
            )
          )}
        </Row>
      </form>
    </div>
  );
};
export default DragAndDrop;
