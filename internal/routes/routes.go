package routes

import (
	"errors"
	"strconv"

	"github.com/Sayuru99/21c-abc-pharmacy/internal/auth"
	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
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

	api.Post("/users", r.CreateUser)
	api.Post("/login", func(c *fiber.Ctx) error {
		return auth.Login(c, r.DB)
	})
	api.Get("/users", r.GetUsers)
	api.Get("/users/:id", r.GetUser)
	api.Get("/users", r.GetUserByEmail)
	api.Put("/users/:id", r.UpdateUser)
	api.Delete("/users/:id", r.DeleteUser)

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

func (r *Repository) CreateUser(c *fiber.Ctx) error {
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	if err := r.DB.Create(&user).Error; err != nil {
		return err
	}

	return c.JSON(user)
}

func (r *Repository) GetUsers(c *fiber.Ctx) error {
	email := c.Query("email")

	if email != "" {
		var user models.User
		if err := r.DB.Select("id, full_name, email, phone_number, created_at, updated_at, deleted_at").Where("email = ?", email).First(&user).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fiber.NewError(fiber.StatusNotFound, "User not found")
			}
			return err
		}
		return c.JSON(user)
	}

	var users []models.User
	if err := r.DB.Select("id, full_name, email, phone_number, created_at, updated_at, deleted_at").Find(&users).Error; err != nil {
		return err
	}
	return c.JSON(users)
}

func (r *Repository) GetUser(c *fiber.Ctx) error {
	var user models.User
	if err := r.DB.First(&user, c.Params("id")).Error; err != nil {
		return err
	}
	return c.JSON(user)
}

func (r *Repository) UpdateUser(c *fiber.Ctx) error {
	var user models.User
	if err := r.DB.First(&user, c.Params("id")).Error; err != nil {
		return err
	}
	updatedUser := new(models.User)
	if err := c.BodyParser(updatedUser); err != nil {
		return err
	}
	user.FullName = updatedUser.FullName
	user.Email = updatedUser.Email
	user.PhoneNumber = updatedUser.PhoneNumber

	if err := r.DB.Save(&user).Error; err != nil {
		return err
	}
	return c.JSON(user)
}

func (r *Repository) GetUserByEmail(c *fiber.Ctx) error {
	email := c.Query("email")

	var user models.User
	if err := r.DB.Select("id, full_name, email, phone_number, created_at, updated_at, deleted_at").Where("email = ?", email).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return fiber.NewError(fiber.StatusNotFound, "User not found")
		}
		return err
	}

	return c.JSON(user)
}

func (r *Repository) DeleteUser(c *fiber.Ctx) error {
	userID := c.Params("id")

	id, err := strconv.Atoi(userID)
	if err != nil {
		return err
	}

	if err := r.DB.Delete(&models.User{}, id).Error; err != nil {
		return err
	}

	return c.SendString("User deleted successfully")
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

	soldQuantity := updatedItem.Quantity
	newQuantity := item.Quantity - soldQuantity
	if newQuantity < 0 {
		return errors.New("not enough quantity available")
	}
	item.Quantity = newQuantity

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

	var requestBody map[string]interface{}
	if err := c.BodyParser(&requestBody); err != nil {
		return err
	}

	invoiceData, ok := requestBody["invoice"].(map[string]interface{})
	if !ok || invoiceData == nil {
		return errors.New("invoice data is missing or invalid")
	}

	invoice := models.Invoice{
		Name:        invoiceData["name"].(string),
		MobileNo:    invoiceData["mobile_no"].(string),
		Email:       invoiceData["email"].(string),
		Address:     invoiceData["address"].(string),
		BillingType: invoiceData["billing_type"].(string),
		TotalAmount: invoiceData["total_amount"].(float64),
	}

	tx := r.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Create(&invoice).Error; err != nil {
		tx.Rollback()
		return err
	}

	invoiceItemsData, ok := requestBody["invoiceItems"].([]interface{})
	if !ok {
		tx.Rollback()
		return errors.New("invoice items data is missing or invalid")
	}

	for _, item := range invoiceItemsData {
		itemData, ok := item.(map[string]interface{})
		if !ok {
			tx.Rollback()
			return errors.New("invoice item data is missing or invalid")
		}

		invoiceItem := models.InvoiceItem{
			InvoiceID:  invoice.ID,
			ItemID:     uint(itemData["item_id"].(float64)),
			Quantity:   int(itemData["quantity"].(float64)),
			UnitPrice:  itemData["unit_price"].(float64),
			TotalPrice: itemData["total_price"].(float64),
		}

		if err := tx.Create(&invoiceItem).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	tx.Commit()

	return c.JSON(fiber.Map{
		"invoice":      invoice,
		"invoiceItems": invoiceItemsData,
	})
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
