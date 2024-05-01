import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, Button, TextField, Select, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
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

  const handleInvoiceClick = (invoiceId) => {
    setSelectedInvoice(invoiceId);
    setOpenModal(true);
    fetchInvoiceItems(invoiceId);
  };

  const fetchInvoiceItems = (invoiceId) => {
    axios
      .get(`http://localhost:8880/api/v1/invoices/${invoiceId}`)
      .then((response) => {
        console.log(response.data);
        setInvoiceItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoice items:", error);
      });
  };

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
    setOpenCreateModal(true);
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
        setOpenCreateModal(false);
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
        <Button onClick={handleCreateInvoice} variant="contained" color="primary">
          Create Invoice
        </Button>
      </div>

      <div className="card">
        <div className="card-header bg-gradient-to-r from-gray-400 to-gray-500 mb-8 p-6">
          <h6 className="text-white text-lg font-bold">Invoices Table</h6>
        </div>
        <div className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Invoice ID", "Customer", "Total Amount", "Actions", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <p className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </p>
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
        </div>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} className="flex justify-center items-center">
        <div className="p-8 bg-white w-[400px] mx-auto">
          <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
          <ul>
            {invoiceItems.map(({ ID, Quantity, UnitPrice, TotalPrice }) => (
              <li key={ID}>
                {Quantity} x {UnitPrice} = {TotalPrice}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)} className="flex justify-center items-center">
  <div className="p-8 bg-white w-[400px] mx-auto">
    <div className="mb-4">
      <TextField
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        fullWidth
        required
      />
    </div>
    <div className="mb-4">
      <TextField
        name="mobileNo"
        value={formData.mobileNo}
        onChange={handleInputChange}
        placeholder="Mobile Number"
        fullWidth
        required
      />
    </div>
    <div className="mb-4">
      <TextField
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        fullWidth
      />
    </div>
    <div className="mb-4">
      <TextField
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        fullWidth
        required
      />
    </div>
    <div className="mb-4">
      <TextField
        name="billingType"
        value={formData.billingType}
        onChange={handleInputChange}
        placeholder="Billing Type"
        fullWidth
        required
      />
    </div>
    <div className="mb-4">
      <Select
        value={selectedItem}
        onChange={handleItemChange}
        placeholder="Select Item"
        fullWidth
      >
        <MenuItem disabled value="">
          Select Item
        </MenuItem>
        {availableItems.map((item) => (
          <MenuItem key={item.ID} value={item.Name}>
            {item.Name}
          </MenuItem>
        ))}
      </Select>
    </div>
    <div className="mb-4">
      <TextField
        name="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        type="number"
        placeholder="Quantity"
        fullWidth
      />
    </div>
    <div className="flex justify-end">
      <Button onClick={handleAddItem} variant="contained" color="primary" className="mr-2">
        Add Item
      </Button>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Create
      </Button>
    </div>
  </div>
</Modal>

    </div>
  );
}

export default Invoices;
