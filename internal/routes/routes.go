package routes

import (
	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{DB: db}
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v1")
	api.Post("/items", r.CreateItem)
	api.Get("/items", r.GetItems)
	api.Get("/items/:id", r.GetItem)
	api.Put("/items/:id", r.UpdateItem)
	api.Delete("/items/:id", r.DeleteItem)

	api.Post("/invoices", r.CreateInvoice)
	api.Get("/invoices", r.GetInvoices)
	api.Get("/invoices/:id", r.GetInvoice)
	api.Put("/invoices/:id", r.UpdateInvoice)
	api.Delete("/invoices/:id", r.DeleteInvoice)

	api.Post("/categories", r.CreateCategory)
	api.Get("/categories", r.GetCategories)
	api.Get("/categories/:id", r.GetCategory)
	api.Put("/categories/:id", r.UpdateCategory)
	api.Delete("/categories/:id", r.DeleteCategory)

	api.Post("/invoice_items", r.CreateInvoiceItem)
	api.Get("/invoice_items", r.GetInvoiceItems)
	api.Get("/invoice_items/:id", r.GetInvoiceItem)
	api.Put("/invoice_items/:id", r.UpdateInvoiceItem)
	api.Delete("/invoice_items/:id", r.DeleteInvoiceItem)
}


var validate *validator.Validate

func init() {
	validate = validator.New()
}


func (r *Repository) CreateItem(c *fiber.Ctx) error {
	item := new(models.Item)
	if err := c.BodyParser(item); err != nil {
		return err
	}

	
	if err := validate.Struct(item); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := r.DB.Create(&item).Error; err != nil {
		return err
	}

	return c.JSON(item)
}


func (r *Repository) GetItems(c *fiber.Ctx) error {
	var items []models.Item
	if err := r.DB.Preload("Category").Find(&items).Error; err != nil {
			return err
	}
	return c.JSON(items)
}


func (r *Repository) GetItem(c *fiber.Ctx) error {
	var item models.Item
	if err := r.DB.First(&item, c.Params("id")).Error; err != nil {
		return err
	}
	return c.JSON(item)
}


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


func (r *Repository) GetInvoices(c *fiber.Ctx) error {
	var invoices []models.Invoice
	if err := r.DB.Find(&invoices).Error; err != nil {
		return err
	}
	return c.JSON(invoices)
}


func (r *Repository) GetInvoice(c *fiber.Ctx) error {
	var invoice models.Invoice
	if err := r.DB.First(&invoice, c.Params("id")).Error; err != nil {
		return err
	}
	return c.JSON(invoice)
}


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


func (r *Repository) GetCategories(c *fiber.Ctx) error {
	var categories []models.Category
	if err := r.DB.Find(&categories).Error; err != nil {
		return err
	}
	return c.JSON(categories)
}


func (r *Repository) GetCategory(c *fiber.Ctx) error {
	var category models.Category
	if err := r.DB.First(&category, c.Params("id")).Error; err != nil {
		return err
	}
	return c.JSON(category)
}


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


func (r *Repository) GetInvoiceItems(c *fiber.Ctx) error {
	var invoiceItems []models.InvoiceItem
	if err := r.DB.Find(&invoiceItems).Error; err != nil {
		return err
	}
	return c.JSON(invoiceItems)
}


func (r *Repository) GetInvoiceItem(c *fiber.Ctx) error {
	var invoiceItem models.InvoiceItem
	if err := r.DB.First(&invoiceItem, c.Params("id")).Error; err != nil {
		return err
	}
	return c.JSON(invoiceItem)
}


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
