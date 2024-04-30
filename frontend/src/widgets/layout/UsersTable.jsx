// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// function UsersTable() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8880/api/v1/users")
//       .then(response => {
//         console.log(response.data)
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching users:", error);
//       });
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Full Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Created At</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map(user => (
//             <TableRow key={user.ID}>
//               <TableCell>{user.FullName}</TableCell>
//               <TableCell>{user.Email}</TableCell>
//               <TableCell>{formatDate(user.CreatedAt)} {formatTime(user.CreatedAt)}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default UsersTable;
