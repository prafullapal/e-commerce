import { React, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

function LogInModal(props) {
  const [isLogIn, setLogIn] = useState(true);

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
            {isLogIn ? "Log In" : "Sign Up"}
          </Modal.Title>
        </Modal.Header>
        {isLogIn ? (
          <Modal.Body>
            <SignIn {...props} />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <SignUp {...props} />
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
