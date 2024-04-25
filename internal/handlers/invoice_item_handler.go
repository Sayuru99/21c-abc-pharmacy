package handlers

import (
	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/gofiber/fiber/v2"
)

// CreateInvoiceItem creates a new invoice item
func (r *Repository) CreateInvoiceItem(c *fiber.Ctx) error {
	invoiceItem := new(models.InvoiceItem)
	if err := c.BodyParser(invoiceItem); err != nil {
			return err
	}
	if err := r.DB.Create(&invoiceItem).Error; err != nil {
			return err
	}
	return c.JSON(invoiceItem)
}

// GetInvoiceItems retrieves all invoice items
func (r *Repository) GetInvoiceItems(c *fiber.Ctx) error {
	var invoiceItems []models.InvoiceItem
	if err := r.DB.Find(&invoiceItems).Error; err != nil {
			return err
	}
	return c.JSON(invoiceItems)
}

// GetInvoiceItem retrieves a single invoice item by ID
func (r *Repository) GetInvoiceItem(c *fiber.Ctx) error {
	var invoiceItem models.InvoiceItem
	if err := r.DB.First(&invoiceItem, c.Params("id")).Error; err != nil {
			return err
	}
	return c.JSON(invoiceItem)
}

// UpdateInvoiceItem updates an existing invoice item
func (r *Repository) UpdateInvoiceItem(c *fiber.Ctx) error {
	var invoiceItem models.InvoiceItem
	if err := r.DB.First(&invoiceItem, c.Params("id")).Error; err != nil {
			return err
	}
	updatedInvoiceItem := new(models.InvoiceItem)
	if err := c.BodyParser(updatedInvoiceItem); err != nil {
			return err
	}
	invoiceItem.InvoiceID = updatedInvoiceItem.InvoiceID
	invoiceItem.ItemID = updatedInvoiceItem.ItemID
	invoiceItem.Quantity = updatedInvoiceItem.Quantity
	invoiceItem.UnitPrice = updatedInvoiceItem.UnitPrice
	invoiceItem.TotalPrice = updatedInvoiceItem.TotalPrice
	if err := r.DB.Save(&invoiceItem).Error; err != nil {
			return err
	}
	return c.JSON(invoiceItem)
}

// DeleteInvoiceItem deletes an invoice item by ID
func (r *Repository) DeleteInvoiceItem(c *fiber.Ctx) error {
	var invoiceItem models.InvoiceItem
	if err := r.DB.First(&invoiceItem, c.Params("id")).Error; err != nil {
			return err
	}
	if err := r.DB.Delete(&invoiceItem).Error; err != nil {
			return err
	}
	return c.SendString("Invoice item deleted successfully")
}
