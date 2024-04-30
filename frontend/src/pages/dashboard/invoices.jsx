import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import axios from "axios";
import { Modal, Button, TextField, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    billingType: "",
    invoiceItems: [],
  });
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8880/api/v1/items/")
      .then((response) => {
        setAvailableItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available items:", error);
      });

    axios
      .get("http://localhost:8880/api/v1/invoices")
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      const selectedItemDetails = availableItems.find(
        (item) => item.Name === selectedItem
      );

      if (selectedItemDetails) {
        const newItem = {
          item_id: selectedItemDetails.ID,
          quantity: quantity,
          unit_price: selectedItemDetails.UnitPrice,
          total_price: quantity * selectedItemDetails.UnitPrice,
        };

        setFormData({
          ...formData,
          totalAmount: formData.totalAmount + newItem.total_price,
          invoiceItems: [...formData.invoiceItems, newItem],
        });
      }
    }
  };

  const handleCreateInvoice = () => {
    setOpenModal(true);
  };

  const handleSubmit = () => {
    fetch("http://localhost:8880/api/v1/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoice: {
          name: formData.name,
          mobile_no: formData.mobileNo,
          email: formData.email,
          address: formData.address,
          billing_type: formData.billingType,
          total_amount: formData.invoiceItems.reduce(
            (total, item) => total + item.total_price,
            0
          ),
        },
        invoiceItems: formData.invoiceItems,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Invoice created successfully:", data);
        setOpenModal(false);
        Swal.fire({
          icon: "success",
          title: "Invoice Created Successfully!",
          html: `
            <p>Name: ${formData.name}</p>
            <p>Items:</p>
            <ul>
              ${formData.invoiceItems.map(
                (item) => `<li>${item.quantity} x ${item.unit_price}</li>`
              )}
            </ul>
            <p>Total: ${formData.invoiceItems.reduce(
              (total, item) => total + item.total_price,
              0
            )}</p>
          `,
        });
      })
      .catch((error) => console.error("Error creating invoice:", error));
  };

  const handleEditInvoice = (id) => {
    console.log("Edit invoice with ID:", id);
  };

  const handleDeleteInvoice = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8880/api/v1/invoices/${id}`)
          .then((response) => {
            setInvoices((prevInvoices) =>
              prevInvoices.filter((invoice) => invoice.ID !== id)
            );
            Swal.fire({
              icon: "success",
              title: "Invoice deleted successfully",
            });
          })
          .catch((error) => {
            console.error("Error deleting invoice:", error);
            Swal.fire({
              icon: "error",
              title: "Failed to delete invoice",
              text: "Please try again later",
            });
          });
      }
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex justify-start">
        <Button onClick={handleCreateInvoice} variant="contained">
          Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Invoices Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Invoice ID", "Customer", "Total Amount", "Actions", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {invoices.map(({ ID, Name, TotalAmount, Items }) => {
                const className = "py-3 px-5 border-b border-blue-gray-50";

                return (
                  <tr key={ID}>
                    <td className={className}>{ID}</td>
                    <td className={className}>{Name}</td>
                    <td className={className}>{TotalAmount}</td>
                    <td className={className}>
                      <Edit
                        className="cursor-pointer mr-2"
                        onClick={() => handleEditInvoice(ID)}
                      />
                      <Delete
                        className="cursor-pointer"
                        onClick={() => handleDeleteInvoice(ID)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="p-4 bg-white w-[400px] mx-auto">
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="mobileNo"
            label="Mobile Number"
            value={formData.mobileNo}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="billingType"
            label="Billing Type"
            value={formData.billingType}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            select
            label="Select Item"
            value={selectedItem}
            onChange={handleItemChange}
            fullWidth
            margin="normal"
          >
            {availableItems.map((item) => (
              <MenuItem key={item.ID} value={item.Name}>
                {item.Name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="quantity"
            label="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <Button onClick={handleAddItem} variant="contained">
            Add Item
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Invoices;
