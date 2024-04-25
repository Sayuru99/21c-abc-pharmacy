package routes

import (
	"github.com/Sayuru99/21c-abc-pharmacy/internal/handlers"
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
	api.Post("/items", handlers.CreateItem)
	api.Get("/items", handlers.GetItems)
	api.Get("/items/:id", handlers.GetItem)
	api.Put("/items/:id", handlers.UpdateItem)
	api.Delete("/items/:id", handlers.DeleteItem)

	api.Post("/invoices", handlers.CreateInvoice)
	api.Get("/invoices", handlers.GetInvoices)
	api.Get("/invoices/:id", handlers.GetInvoice)
	api.Put("/invoices/:id", handlers.UpdateInvoice)
	api.Delete("/invoices/:id", handlers.DeleteInvoice)

	api.Post("/categories", handlers.CreateCategory)
	api.Get("/categories", handlers.GetCategories)
	api.Get("/categories/:id", handlers.GetCategory)
	api.Put("/categories/:id", handlers.UpdateCategory)
	api.Delete("/categories/:id", handlers.DeleteCategory)

	api.Post("/invoice_items", handlers.CreateInvoiceItem)
	api.Get("/invoice_items", handlers.GetInvoiceItems)
	api.Get("/invoice_items/:id", handlers.GetInvoiceItem)
	api.Put("/invoice_items/:id", handlers.UpdateInvoiceItem)
	api.Delete("/invoice_items/:id", handlers.DeleteInvoiceItem)
}
