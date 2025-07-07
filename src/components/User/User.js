import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import { getAllUser, deleteUser } from "../../service/apiService";
import Swal from "sweetalert2";
import "./User.scss"; // Import your custom styles if needed

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUser();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};


  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {
        console.error("Delete user error:", err);
        setError("Failed to delete user.");
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">List of Renters</h2>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No renter found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td>{formatDate(user.dateOfBirth)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ fontWeight: "bold" }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default User;