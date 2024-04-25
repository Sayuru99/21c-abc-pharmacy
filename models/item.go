// models/item.go
package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Name        string  `gorm:"not null"`
	UnitPrice   float64 `gorm:"not null"`
	CategoryID  uint
	Category    Category `gorm:"foreignKey:CategoryID"`
}
