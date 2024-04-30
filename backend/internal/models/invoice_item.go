package models

import "gorm.io/gorm"

type InvoiceItem struct {
	gorm.Model
	InvoiceID  uint
	ItemID     uint
	Quantity   int     `gorm:"not null"`
	UnitPrice  float64 `gorm:"not null"`
	TotalPrice float64 `gorm:"default:0.00"`
	CreatedBy  uint
	UpdatedBy  uint
}
