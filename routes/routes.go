package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v1")
	api.Post("/items/create", r.CreateItem)
	api.Post("/invoices/create", r.CreateInvoice)
}

func (r *Repository) CreateItem(c *fiber.Ctx) error {
	return c.SendString("CreateItem handler called")
}

func (r *Repository) CreateInvoice(c *fiber.Ctx) error {
	return c.SendString("CreateInvoice handler called")
}
