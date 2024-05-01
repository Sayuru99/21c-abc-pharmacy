import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuItem,
  TextField,
  Button,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

function Items() {
  const [items, setItems] = useState([]);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    unitPrice: 0,
    categoryId: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = () => {
    axios
      .get("http://localhost:8880/api/v1/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const handleDeleteItem = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8880/api/v1/items/${itemId}`)
          .then(() => {
            const updatedItems = items.filter((item) => item.id !== itemId);
            setItems(updatedItems);
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the item.",
              "error"
            );
          });
      }
    });
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:8880/api/v1/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "unitPrice" ? parseFloat(value) : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryId: categoryId,
    }));
  };

  const handleAddItem = () => {
    setOpenItemModal(true);
  };

  const handleEditItem = (item) => {
    setFormData({
      id: item.ID,
      name: item.Name,
      unitPrice: item.UnitPrice,
      categoryId: item.Category ? item.Category.ID : "",
    });
    setOpenEditModal(true);
  };

  const handleAddCategory = () => {
    setOpenCategoryModal(true);
  };

  const handleCloseItemModal = () => {
    setOpenItemModal(false);
  };

  const handleCloseCategoryModal = () => {
    setOpenCategoryModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSubmitItem = () => {
    axios
      .post("http://localhost:8880/api/v1/items", formData)
      .then((response) => {
        setItems([...items, response.data]);
        fetchItems();
        setOpenItemModal(false);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleSubmitCategory = () => {
    axios
      .post("http://localhost:8880/api/v1/categories", categoryFormData)
      .then((response) => {
        setCategories([...categories, response.data]);
        fetchCategories();
        setOpenCategoryModal(false);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  const handleEditSubmit = () => {
    axios
      .put(`http://localhost:8880/api/v1/items/${formData.id}`, formData)
      .then((response) => {
        const updatedItems = items.map((item) =>
          item.ID === formData.id ? formData : item
        );
        setItems(updatedItems);
        setOpenEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <div className="flex justify-start">
        <Button
          onClick={handleAddItem}
          variant="contained"
          color="primary"
          className="mb-4"
        >
          Add Item
        </Button>
        <Button
          onClick={handleAddCategory}
          variant="contained"
          color="primary"
          className="mb-4 ml-4"
        >
          Add Category
        </Button>
      </div>

      {/* Items Card */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-100 border-b">
          <Typography variant="h6">Available Items</Typography>
        </div>
        <div className="p-4">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-gray-200 py-3 px-5 text-left">
                  Name
                </th>
                <th className="border-b border-gray-200 py-3 px-5 text-left">
                  Unit Price
                </th>
                <th className="border-b border-gray-200 py-3 px-5 text-left">
                  Category
                </th>
                <th className="border-b border-gray-200 py-3 px-5 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.ID}>
                  <td className="border-b border-gray-200 py-3 px-5">
                    {item.Name}
                  </td>
                  <td className="border-b border-gray-200 py-3 px-5">
                    {item.UnitPrice}
                  </td>
                  <td className="border-b border-gray-200 py-3 px-5">
                    {item.Category ? item.Category.Name : ""}
                  </td>
                  <td className="border-b border-gray-200 py-3 px-5">
                    <Edit
                      className="cursor-pointer mr-2"
                      onClick={() => handleEditItem(item)}
                    />

                    <Delete
                      className="cursor-pointer"
                      onClick={() => handleDeleteItem(item.ID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={openItemModal} onClose={handleCloseItemModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Item
          </Typography>
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
            name="unitPrice"
            label="Unit Price"
            value={formData.unitPrice}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            type="number"
            step="0.01"
          />
          <TextField
            select
            label="Category"
            value={formData.categoryId}
            onChange={handleCategoryChange}
            fullWidth
            required
            margin="normal"
            name="categoryId"
          >
            {categories.map((category) => (
              <MenuItem key={category.ID} value={category.ID.toString()}>
                {category.Name}
              </MenuItem>
            ))}
          </TextField>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleCloseItemModal}
              variant="contained"
              color="secondary"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitItem}
              variant="contained"
              color="primary"
            >
              Add Item
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Item
          </Typography>
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
            name="unitPrice"
            label="Unit Price"
            value={formData.unitPrice}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            type="number"
            step="0.01"
          />
          <TextField
            select
            label="Category"
            value={formData.categoryId}
            onChange={handleCategoryChange}
            fullWidth
            required
            margin="normal"
            name="categoryId"
          >
            {categories.map((category) => (
              <MenuItem key={category.ID} value={category.ID.toString()}>
                {category.Name}
              </MenuItem>
            ))}
          </TextField>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleCloseEditModal}
              variant="contained"
              color="secondary"
              className="mr-2"
            >
              Cancel
            </Button>

            <Button
              onClick={handleEditSubmit}
              variant="contained"
              color="primary"
            >
              Add Item
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openCategoryModal} onClose={handleCloseCategoryModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Category
          </Typography>
          <TextField
            name="name"
            label="Name"
            value={categoryFormData.name}
            onChange={(e) =>
              setCategoryFormData({ ...categoryFormData, name: e.target.value })
            }
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={categoryFormData.description}
            onChange={(e) =>
              setCategoryFormData({
                ...categoryFormData,
                description: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleCloseCategoryModal}
              variant="contained"
              color="secondary"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitCategory}
              variant="contained"
              color="primary"
            >
              Add Category
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Items;
