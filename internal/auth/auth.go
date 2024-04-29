package auth

import (
	"fmt"
	"time"

	"github.com/Sayuru99/21c-abc-pharmacy/internal/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var jwtSecret = []byte("199930801779v")

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func Login(c *fiber.Ctx, db *gorm.DB) error {
	type LoginInput struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}

	var input LoginInput
	if err := c.BodyParser(&input); err != nil {
		return err
	}

	if err := validate.Struct(input); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var user models.User
	if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return fiber.NewError(fiber.StatusUnauthorized, "Invalid credentials")
		}
		return err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid credentials")
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["email"] = user.Email
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return err
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
		Secure:   true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"token": tokenString,
	})
}

func AuthMiddleware() func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		if c.Path() == "/api/v1/login" {
			return c.Next()
		}

		cookie := c.Cookies("jwt")
		if cookie == "" {
			return fiber.NewError(fiber.StatusUnauthorized, "Unauthorized: Missing JWT token")
		}

		token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})
		if err != nil || !token.Valid {
			fmt.Println("Token validation error:", err)
			return fiber.NewError(fiber.StatusUnauthorized, "Unauthorized: Invalid JWT token")
		}

		fmt.Println("Token claims:", token.Claims)

		return c.Next()
	}
}
