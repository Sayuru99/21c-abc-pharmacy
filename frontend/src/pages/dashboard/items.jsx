import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardHeader, MenuItem } from "@material-tailwind/react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function Items() {
  const [items, setItems] = useState([]);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [formData, setFormData] = useState({
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
    axios.get("http://localhost:8880/api/v1/items")
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching items:", error);
      });
  };

  const fetchCategories = () => {
    axios.get("http://localhost:8880/api/v1/categories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
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

  const handleAddCategory = () => {
    setOpenCategoryModal(true);
  };

  const handleCloseItemModal = () => {
    setOpenItemModal(false);
  };

  const handleCloseCategoryModal = () => {
    setOpenCategoryModal(false);
  };

  const handleSubmitItem = () => {
    axios.post("http://localhost:8880/api/v1/items", formData)
      .then(response => {
        setItems([...items, response.data]);
        fetchItems();
        setOpenItemModal(false);
      })
      .catch(error => {
        console.error("Error adding item:", error);
      });
  };

  const handleSubmitCategory = () => {
    axios.post("http://localhost:8880/api/v1/categories", categoryFormData)
      .then(response => {
        setCategories([...categories, response.data]);
        fetchCategories();
        setOpenCategoryModal(false);
      })
      .catch(error => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <div className="flex justify-start">
        <Button onClick={handleAddItem} color="indigo" ripple="light" className="mb-4">
          Add Item
        </Button>
        <Button onClick={handleAddCategory} color="indigo" ripple="light" className="mb-4 ml-4">
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Available Items
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Unit Price
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Category
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.ID}>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {item.Name}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {item.UnitPrice}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {item.Category ? item.Category.Name : ""}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Edit className="cursor-pointer mr-2" />
                    <Delete className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog open={openItemModal} onClose={handleCloseItemModal}>
        <DialogTitle>
          <Typography variant="h6">Add New Item</Typography>
        </DialogTitle>
        <DialogContent>
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
            {categories.map(category => (
              <MenuItem key={category.ID} value={category.ID.toString()}>
                {category.Name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseItemModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitItem} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCategoryModal} onClose={handleCloseCategoryModal}>
        <DialogTitle>
          <Typography variant="h6">Add New Category</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={categoryFormData.name}
            onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={categoryFormData.description}
            onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategoryModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitCategory} color="primary">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Items;
