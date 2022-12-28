import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const baseUrl = "http://localhost:5000";

function SignIn(props) {
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/auth/login`, logInData, { withCredentials: true })
      .then((response) => {
        props.onShowNotif("User Logged In Successfully!", "success");
        props.onLogIn(response.data.user);
        if (response.data.user.role === "seller") {
          navigate("/seller");
        } else if (response.data.user.role === "admin") {
          navigate("/admin");
        } else if (response.data.user.role === "user") {
          navigate("/");
        }
      })
      .catch((error) => {
        // console.log(error);
        props.onShowNotif(error.response.data.message, "danger");
      });
  };

  const handleChange = (event) => {
    setLogInData((logInData) => ({
      ...logInData,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formLogInEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          defaultValue={logInData.email}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLogInPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={logInData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignIn;
