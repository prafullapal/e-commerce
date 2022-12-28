import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import VerifiedIcon from "@mui/icons-material/Verified";

function AdminAllSeller(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users?role=seller", { withCredentials: true })
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
  console.log(users);
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      {users.map((user, ind) => (
        <tbody key={user._id}>
          <tr>
            <td>{ind + 1}</td>
            <td>
              {user.name}
              {user.isVerified && <VerifiedIcon style={{ color: "green" }} />}
            </td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}

export default AdminAllSeller;
