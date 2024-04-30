import { Card, CardBody, Button } from "@material-tailwind/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, TextField, IconButton, Snackbar } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", email: "", phoneNumber: "", password: "" });
  const [error, setError] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8880/api/v1/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = () => {
    axios.post("http://localhost:8880/api/v1/users", newUser)
      .then(response => {
        console.log("User created successfully:", response.data);
        setIsModalOpen(false);
        setUsers(prevUsers => [...prevUsers, response.data]);
      })
      .catch(error => {
        console.error("Error creating user:", error);
      });
  };

  const handleEditUser = (userId) => {
    console.log("Edit user with ID:", userId);
  };

  const handleDeleteUser = (userId, userName) => {
    Swal.fire({
      title: `Are you sure you want to delete the user "${userName}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8880/api/v1/users/${userId}`)
        .then(response => {
          setUsers(prevUsers => prevUsers.filter(user => user.ID !== userId));
          Swal.fire({
            icon: 'success',
            title: 'User deleted successfully',
          });
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          setError("Failed to delete user. Please try again later.");
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete user',
            text: 'Please try again later',
          });
        });
      }
    });
  };

  return (
    <>
      <div className="mb-4">
        <Button color="blue" onClick={() => setIsModalOpen(true)}>Create User</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.ID}>
                <TableCell>{user.FullName}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{formatDate(user.CreatedAt)} {formatTime(user.CreatedAt)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditUser(user.ID)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.ID, user.FullName)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>Create User</Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter full name"
              name="fullName"
              value={newUser.fullName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={newUser.phoneNumber}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              placeholder="Enter password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleCreateUser}>Create</Button>
            <Button variant="contained" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message={error || "User deleted successfully"}
      />
    </>
  );
}

function Users() {
  return (
    <Card>
      <CardBody>
        <UsersTable />
      </CardBody>
    </Card>
  );
}

export default Users;
