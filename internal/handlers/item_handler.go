package handlers

import (
	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateItem(c *fiber.Ctx) error {
	item := new(models.Item)
	if err := c.BodyParser(item); err != nil {
			return err
	}
	if err := r.DB.Create(&item).Error; err != nil {
			return err
	}
	return c.JSON(item)
}

// GetItems retrieves all items
func (r *Repository) GetItems(c *fiber.Ctx) error {
	var items []models.Item
	if err := r.DB.Find(&items).Error; err != nil {
			return err
	}
	return c.JSON(items)
}

// GetItem retrieves a single item by ID
func (r *Repository) GetItem(c *fiber.Ctx) error {
	var item models.Item
	if err := r.DB.First(&item, c.Params("id")).Error; err != nil {
			return err
	}
	return c.JSON(item)
}

// UpdateItem updates an existing item
func (r *Repository) UpdateItem(c *fiber.Ctx) error {
	var item models.Item
	if err := r.DB.First(&item, c.Params("id")).Error; err != nil {
			return err
	}
	updatedItem := new(models.Item)
	if err := c.BodyParser(updatedItem); err != nil {
			return err
	}
	item.Name = updatedItem.Name
	item.UnitPrice = updatedItem.UnitPrice
	item.CategoryID = updatedItem.CategoryID
	if err := r.DB.Save(&item).Error; err != nil {
			return err
	}
	return c.JSON(item)
}

// DeleteItem deletes an item by ID
func (r *Repository) DeleteItem(c *fiber.Ctx) error {
	var item models.Item
	if err := r.DB.First(&item, c.Params("id")).Error; err != nil {
			return err
	}
	if err := r.DB.Delete(&item).Error; err != nil {
			return err
	}
	return c.SendString("Item deleted successfully")
}