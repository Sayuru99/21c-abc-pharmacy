package main

import (
	"log"

	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/Sayuru99/21c-abc-pharmacy/internal/routes"
	"github.com/Sayuru99/21c-abc-pharmacy/internal/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	db, err := storage.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	err = db.AutoMigrate(
		&models.Item{},
		&models.Invoice{},
		&models.Category{},
		&models.InvoiceItem{},
	)
	if err != nil {
		log.Fatal(err)
	}

	r := routes.NewRepository(db)

	app := fiber.New()
	r.SetupRoutes(app)

	err = app.Listen(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
