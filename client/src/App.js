import React from "react";
import Home from "./pages/home";
import Admin from "./pages/dashboard/admin";
import Seller from "./pages/dashboard/seller";
import Cart from "./pages/cart";
import axios from "axios";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {
  state = {
    showFlash: false,
    setMessage: "",
    variant: "light",
    isLoggedIn: false,
    currentUser: null,
  };
  handleFlashShow = (inputMessage, type) => {
    this.setState({
      showFlash: true,
      setMessage: inputMessage,
      variant: type,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/showMe", { withCredentials: true })
      .then((response) => {
        this.setState({ currentUser: response.data.user });
        return response.status;
      })
      .then((code) => {
        if (code === 200) {
          this.setState({ isLoggedIn: true });
        }
      })
      .catch((err) => {
        if (
          err.response.status === 403 &&
          err.response.data.msg === "Authentication Invalid"
        )
          console.log("No User Logged In.");
        else {
          console.log(err);
        }
      });
  }

  toggleFlash = () => {
    this.setState({
      showFlash: false,
      setMessage: "",
      variant: "light",
    });
  };

  handleLogIn = (user) => {
    this.setState({
      isLoggedIn: true,
      currentUser: user,
    });
  };

  handleLogOut = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: null,
    });
  };
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  onShowNotif={this.handleFlashShow}
                  isLoggedIn={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  onLogOut={this.handleLogOut}
                  onLogIn={this.handleLogIn}
                />
              }
            />
            <Route
              exact
              path="/admin"
              element={
                <Admin
                  onShowNotif={this.handleFlashShow}
                  isLoggedIn={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  onLogOut={this.handleLogOut}
                  onLogIn={this.handleLogIn}
                />
              }
            />
            <Route
              exact
              path="/seller"
              element={
                <Seller
                  onShowNotif={this.handleFlashShow}
                  isLoggedIn={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  onLogOut={this.handleLogOut}
                  onLogIn={this.handleLogIn}
                />
              }
            />
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  onShowNotif={this.handleFlashShow}
                  isLoggedIn={this.state.isLoggedIn}
                  user={this.state.currentUser}
                  onLogOut={this.handleLogOut}
                  onLogIn={this.handleLogIn}
                />
              }
            />
          </Routes>
        </Router>
        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            show={this.state.showFlash}
            onClose={this.toggleFlash}
            bg={this.state.variant}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Notifications</strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>{this.state.setMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  }
}

export default App;
