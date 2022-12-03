import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const baseUrl = "http://localhost:5000";

function LogInModal(props) {
  const navigate = useNavigate();

  const [isLogIn, setLogIn] = useState(true);
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogIn) {
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
            navigate("/user");
          }
        })
        .catch((error) => {
          props.onShowNotif(
            error.msg || error.response.data.msg || error.response.data.message,
            "danger"
          );
        });
    } else {
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
    }
  };

  const handleChange = (event) => {
    if (isLogIn) {
      setLogInData((logInData) => ({
        ...logInData,
        [event.target.name]: event.target.value,
      }));
    } else {
      setSignUpData((signUpData) => ({
        ...signUpData,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isLogIn ? "Log In" : "Sign Up"} Modal
          </Modal.Title>
        </Modal.Header>
        {isLogIn ? (
          <Modal.Body>
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
          </Modal.Body>
        ) : (
          <Modal.Body>
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        )}
        <Modal.Footer>
          {isLogIn ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="link"
            onClick={() => setLogIn(!isLogIn)}
            style={{ padding: "0px" }}
          >
            Click here
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogInModal;
