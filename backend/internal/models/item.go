package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Name       string  `gorm:"not null"`
	UnitPrice  float64 `gorm:"not null"`
	Quantity   int     `gorm:"not null;default:0"`
	CategoryID uint
	Category   Category `gorm:"foreignKey:CategoryID"`
	CreatedBy  uint
	UpdatedBy  uint
}
