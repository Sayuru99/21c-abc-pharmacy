package handlers

import (
	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/gofiber/fiber/v2"
)

// CreateInvoice creates a new invoice
func (r *Repository) CreateInvoice(c *fiber.Ctx) error {
	invoice := new(models.Invoice)
	if err := c.BodyParser(invoice); err != nil {
			return err
	}
	if err := r.DB.Create(&invoice).Error; err != nil {
			return err
	}
	return c.JSON(invoice)
}

// GetInvoices retrieves all invoices
func (r *Repository) GetInvoices(c *fiber.Ctx) error {
	var invoices []models.Invoice
	if err := r.DB.Find(&invoices).Error; err != nil {
			return err
	}
	return c.JSON(invoices)
}

// GetInvoice retrieves a single invoice by ID
func (r *Repository) GetInvoice(c *fiber.Ctx) error {
	var invoice models.Invoice
	if err := r.DB.First(&invoice, c.Params("id")).Error; err != nil {
			return err
	}
	return c.JSON(invoice)
}

// UpdateInvoice updates an existing invoice
func (r *Repository) UpdateInvoice(c *fiber.Ctx) error {
	var invoice models.Invoice
	if err := r.DB.First(&invoice, c.Params("id")).Error; err != nil {
			return err
	}
	updatedInvoice := new(models.Invoice)
	if err := c.BodyParser(updatedInvoice); err != nil {
			return err
	}
	invoice.Name = updatedInvoice.Name
	invoice.MobileNo = updatedInvoice.MobileNo
	invoice.Email = updatedInvoice.Email
	invoice.Address = updatedInvoice.Address
	invoice.BillingType = updatedInvoice.BillingType
	if err := r.DB.Save(&invoice).Error; err != nil {
			return err
	}
	return c.JSON(invoice)
}

// DeleteInvoice deletes an invoice by ID
func (r *Repository) DeleteInvoice(c *fiber.Ctx) error {
	var invoice models.Invoice
	if err := r.DB.First(&invoice, c.Params("id")).Error; err != nil {
			return err
	}
	if err := r.DB.Delete(&invoice).Error; err != nil {
			return err
	}
	return c.SendString("Invoice deleted successfully")
}