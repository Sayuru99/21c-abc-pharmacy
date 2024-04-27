package models

import "gorm.io/gorm"

type Invoice struct {
	gorm.Model
	Name        string `gorm:"not null"`
	MobileNo    string `gorm:"not null"`
	Email       string
	Address     string
	BillingType string
	TotalAmount float64 `gorm:"default:0.00"`
	CreatedBy   uint
	UpdatedBy   uint
	Items       []Item `gorm:"many2many:invoice_items;"`
}
