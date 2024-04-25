// main.go
package main

import (
	"log"
	"os"

	"github.com/Sayuru99/21c-abc-pharmacy/models"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v1")
	api.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend is running")
	})
	api.Post("/items/create", r.CreateItem)
	api.Post("/invoices/create", r.CreateInvoice)
}

func (r *Repository) CreateItem(c *fiber.Ctx) error {
	var item models.Item
	if err := c.BodyParser(&item); err != nil {
		return err
	}
	result := r.DB.Create(&item)
	if result.Error != nil {
		return result.Error
	}
	return c.JSON(item)
}

func (r *Repository) CreateInvoice(c *fiber.Ctx) error {
	var invoice models.Invoice
	if err := c.BodyParser(&invoice); err != nil {
		return err
	}
	result := r.DB.Create(&invoice)
	if result.Error != nil {
		return result.Error
	}
	return c.JSON(invoice)
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	db, err := gorm.Open(postgres.Open(os.Getenv("DATABASE_URL")), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	err = db.AutoMigrate(&models.Item{}, &models.Invoice{}, &models.Category{})
	if err != nil {
		log.Fatal(err)
	}

	r := Repository{
		DB: db,
	}

	app := fiber.New()
	r.SetupRoutes(app)
	app.Listen(":8080")
}
