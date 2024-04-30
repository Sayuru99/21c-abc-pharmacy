// import React, { useState } from "react";
// import axios from "axios";
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from "@material-tailwind/react";

// function UsersModal({ isModalOpen, setIsModalOpen }) {
//   const [newUser, setNewUser] = useState({ fullName: "", email: "", phoneNumber: "", password: "" });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleCreateUser = () => {
//     axios.post("http://localhost:8880/api/v1/users", newUser)
//       .then(response => {
//         console.log("User created successfully:", response.data);
//         // Close the modal and refresh the user list
//         setIsModalOpen(false);
//       })
//       .catch(error => {
//         console.error("Error creating user:", error);
//       });
//   };

//   return (
//     <Modal size="lg" active={isModalOpen} toggler={() => setIsModalOpen(false)}>
//       <ModalHeader toggler={() => setIsModalOpen(false)}>Create User</ModalHeader>
//       <ModalBody>
//         <div className="flex flex-col gap-4">
//           <Input
//             type="text"
//             placeholder="Full Name"
//             name="fullName"
//             value={newUser.fullName}
//             onChange={handleInputChange}
//           />
//           <Input
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={newUser.email}
//             onChange={handleInputChange}
//           />
//           <Input
//             type="text"
//             placeholder="Phone Number"
//             name="phoneNumber"
//             value={newUser.phoneNumber}
//             onChange={handleInputChange}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={newUser.password}
//             onChange={handleInputChange}
//           />
//         </div>
//       </ModalBody>
//       <ModalFooter>
//         <Button color="blue" onClick={handleCreateUser}>Create</Button>
//         <Button color="gray" onClick={() => setIsModalOpen(false)}>Cancel</Button>
//       </ModalFooter>
//     </Modal>
//   );
// }

// export default UsersModal;
