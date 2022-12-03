import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function AdminAllUser(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/", { withCredentials: true })
      .then((response) => {
        return response.data.users;
      })
      .then((docs) => setUsers(docs))
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
  }, []);
  return (
    <Container>
      <Row>
        {users.map((user) => (
          <p key={user._id}>{user.name}</p>
        ))}
      </Row>
    </Container>
  );
}

export default AdminAllUser;
