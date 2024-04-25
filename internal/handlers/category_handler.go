package handlers

import (
	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/gofiber/fiber/v2"
)

// CreateCategory creates a new category
func (r *Repository) CreateCategory(c *fiber.Ctx) error {
	category := new(models.Category)
	if err := c.BodyParser(category); err != nil {
			return err
	}
	if err := r.DB.Create(&category).Error; err != nil {
			return err
	}
	return c.JSON(category)
}

// GetCategories retrieves all categories
func (r *Repository) GetCategories(c *fiber.Ctx) error {
	var categories []models.Category
	if err := r.DB.Find(&categories).Error; err != nil {
			return err
	}
	return c.JSON(categories)
}

// GetCategory retrieves a single category by ID
func (r *Repository) GetCategory(c *fiber.Ctx) error {
	var category models.Category
	if err := r.DB.First(&category, c.Params("id")).Error; err != nil {
			return err
	}
	return c.JSON(category)
}

// UpdateCategory updates an existing category
func (r *Repository) UpdateCategory(c *fiber.Ctx) error {
	var category models.Category
	if err := r.DB.First(&category, c.Params("id")).Error; err != nil {
			return err
	}
	updatedCategory := new(models.Category)
	if err := c.BodyParser(updatedCategory); err != nil {
			return err
	}
	category.Name = updatedCategory.Name
	category.Description = updatedCategory.Description
	if err := r.DB.Save(&category).Error; err != nil {
			return err
	}
	return c.JSON(category)
}

// DeleteCategory deletes a category by ID
func (r *Repository) DeleteCategory(c *fiber.Ctx) error {
	var category models.Category
	if err := r.DB.First(&category, c.Params("id")).Error; err != nil {
			return err
	}
	if err := r.DB.Delete(&category).Error; err != nil {
			return err
	}
	return c.SendString("Category deleted successfully")
}