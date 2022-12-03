import React, { useState } from "react";

import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";

import { useNavigate } from "react-router-dom";

import { Image } from "react-bootstrap";
import profile from "./assets/profile.jpg";

function SideBar({ show, handleShow, handleClose, ...props }) {
  const navigate = useNavigate();
  const menus = [
    {
      name: "Home",
      logo: "",
      link: "/",
    },
    {
      name: "Sellers",
      logo: "",
      link: "/admin/sellers",
    },
    {
      name: "Users",
      logo: "",
      link: "/admin/users",
    },
    {
      name: "Orders",
      logo: "",
      link: "/admin/orders",
    },
    {
      name: "Settings",
      logo: "",
      link: "/admin/settings",
    },
  ];

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
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={true}
        style={{ width: "max-content" }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <Image
              src={profile}
              thumbnail={true}
              roundedCircle={true}
              style={{ width: "28px", height: "28px" }}
            />
            {props.user.name}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container fluid>
            <Nav className="flex-column" navbarScroll>
              {menus.map((menu, i) => (
                <Nav.Link key={i} href={menu.link}>
                  {menu.name}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="flex-column " navbarScroll>
              <Button
                variant="link"
                onClick={() => handleLogOut()}
                style={{ textDecoration: "None", color: "black" }}
              >
                Logout
              </Button>
            </Nav>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;
