import { React, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const baseUrl = "http://localhost:5000";

function SignUp(props) {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/auth/register`, signUpData)
      .then((response) => {
        props.onShowNotif(
          "Registration Successful. Please Check your email to verify.",
          "success"
        );
      })
      .catch((error) => {
        props.onShowNotif(
          error.msg || error.response.data.msg || error.response.data.message,
          "danger"
        );
      });
  };

  const handleChange = (event) => {
    setSignUpData((signUpData) => ({
      ...signUpData,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formSignUpName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          defaultValue={signUpData.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSignUpEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          defaultValue={signUpData.email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSignUpPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          defaultValue={signUpData.password}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSignUpSeller">
        <Form.Check
          type="switch"
          name="isSeller"
          id="custom-switch"
          label="Become a Seller"
          onChange={handleChange}
          defaultChecked={signUpData.isSeller}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignUp;
