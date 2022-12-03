import { React, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LogInModal from "../pages/login";
import { Image } from "react-bootstrap";
import profile from "./assets/profile.jpg";
import SideBar from "./sideBar";

function Header(props) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const handleLogOut = async () => {
    await axios
      .get("http://localhost:5000/auth/logout/", { withCredentials: true })
      .then((response) => {
        console.log(response);
        props.onShowNotif("Successfully Logged out", "success");
        props.onLogOut();
      });
    navigate("/");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <LogInModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Container fluid>
          {props.isLoggedIn && props.user.role === "admin" && (
            <div>
              <SideBar
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                {...props}
              />
              <Button
                variant="link"
                onClick={handleShow}
                style={{ textDecoration: "None", color: "white" }}
              >
                <FontAwesomeIcon icon="fa-solid fa-bars" />
              </Button>
            </div>
          )}
          <Navbar.Brand href="/">eBazaar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="justify-content-between"
          >
            {(props.user === null ||
              (props.isLoggedIn && props.user.role !== "admin")) && (
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Shop" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                {!props.isLoggedIn && (
                  <Button
                    variant="link"
                    onClick={() => setModalShow(true)}
                    style={{ textDecoration: "None", color: "white" }}
                  >
                    Log In
                  </Button>
                )}
                <Nav.Link href="#action2">Become a Seller</Nav.Link>
                <Nav.Link href="#" disabled>
                  Admin Log In
                </Nav.Link>
              </Nav>
            )}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            {props.isLoggedIn && (
              <Nav>
                <NavDropdown
                  title={
                    <Image
                      src={profile}
                      thumbnail={true}
                      roundedCircle={true}
                      style={{ width: "28px", height: "28px" }}
                    />
                  }
                >
                  <NavDropdown.Item href="#/">Wishlist</NavDropdown.Item>
                  <NavDropdown.Item href="#/action-2">Orders</NavDropdown.Item>
                  <NavDropdown.Item href="#/action-3">
                    Notifications
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#/action-3">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Button
                      variant="link"
                      onClick={() => handleLogOut()}
                      style={{ textDecoration: "None", color: "black" }}
                    >
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/cart">
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                  Cart
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
