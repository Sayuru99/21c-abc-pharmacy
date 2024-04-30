/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL
 Source Server Type    : PostgreSQL
 Source Server Version : 160001 (160001)
 Source Host           : localhost:5432
 Source Catalog        : abc-pharmacy
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160001 (160001)
 File Encoding         : 65001

 Date: 29/04/2024 10:43:35
*/


-- ----------------------------
-- Sequence structure for categories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."categories_id_seq";
CREATE SEQUENCE "public"."categories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for invoice_items_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."invoice_items_id_seq";
CREATE SEQUENCE "public"."invoice_items_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for invoices_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."invoices_id_seq";
CREATE SEQUENCE "public"."invoices_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for items_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."items_id_seq";
CREATE SEQUENCE "public"."items_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
  "id" int8 NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" timestamptz(6),
  "created_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" VALUES (4, 'Analgesics', 'Medications used to relieve pain.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (5, 'Antibiotics', 'Medications used to treat bacterial infections.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (6, 'Antipyretics', 'Medications used to reduce fever.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (7, 'Antihistamines', 'Medications used to treat allergies.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (8, 'Antacids', 'Medications used to neutralize stomach acid.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (9, 'Antidepressants', 'Medications used to treat depression.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (10, 'Antifungals', 'Medications used to treat fungal infections.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (11, 'Antivirals', 'Medications used to treat viral infections.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (12, 'Cardiovascular Medications', 'Medications used to treat heart and blood vessel conditions.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (13, 'Respiratory Medications', 'Medications used to treat respiratory conditions.', '2024-04-29 10:27:28.098371+05:30', '2024-04-29 10:27:28.098371+05:30', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for invoice_items
-- ----------------------------
DROP TABLE IF EXISTS "public"."invoice_items";
CREATE TABLE "public"."invoice_items" (
  "id" int4 NOT NULL DEFAULT nextval('invoice_items_id_seq'::regclass),
  "invoice_id" int8,
  "item_id" int8,
  "quantity" int8 NOT NULL,
  "unit_price" numeric(10,2) NOT NULL,
  "total_price" numeric(10,2) DEFAULT 0.00,
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" timestamptz(6),
  "created_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of invoice_items
-- ----------------------------
INSERT INTO "public"."invoice_items" VALUES (15, 21, 44, 5, 5.25, 26.25, '2024-04-29 10:40:32.99864+05:30', '2024-04-29 10:40:32.99864+05:30', NULL, NULL, NULL);
INSERT INTO "public"."invoice_items" VALUES (16, 21, 45, 5, 8.50, 42.50, '2024-04-29 10:40:32.99864+05:30', '2024-04-29 10:40:32.99864+05:30', NULL, NULL, NULL);
INSERT INTO "public"."invoice_items" VALUES (17, 21, 49, 5, 9.50, 47.50, '2024-04-29 10:40:32.99864+05:30', '2024-04-29 10:40:32.99864+05:30', NULL, NULL, NULL);
INSERT INTO "public"."invoice_items" VALUES (18, 21, 51, 5, 7.99, 39.95, '2024-04-29 10:40:32.99864+05:30', '2024-04-29 10:40:32.99864+05:30', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for invoices
-- ----------------------------
DROP TABLE IF EXISTS "public"."invoices";
CREATE TABLE "public"."invoices" (
  "id" int4 NOT NULL DEFAULT nextval('invoices_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "mobile_no" text COLLATE "pg_catalog"."default" NOT NULL,
  "email" text COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "billing_type" text COLLATE "pg_catalog"."default" NOT NULL,
  "total_amount" numeric(10,2) DEFAULT 0.00,
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" timestamptz(6),
  "created_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of invoices
-- ----------------------------
INSERT INTO "public"."invoices" VALUES (21, 'Sayuru De Alwis', '0771234567', 'sayurudealwis99@gmail.com', '27, Ayurvedha Medical College Road, Rajagiriya', 'Cash', 156.20, '2024-04-29 10:40:32.99864+05:30', '2024-04-29 10:40:32.99864+05:30', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for items
-- ----------------------------
DROP TABLE IF EXISTS "public"."items";
CREATE TABLE "public"."items" (
  "id" int4 NOT NULL DEFAULT nextval('items_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "unit_price" numeric(10,2) NOT NULL,
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" timestamptz(6),
  "category_id" int8 NOT NULL,
  "created_by" int8,
  "updated_by" int8,
  "quantity" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO "public"."items" VALUES (44, 'Panadol', 5.25, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 4, NULL, NULL, 200);
INSERT INTO "public"."items" VALUES (45, 'Amoxil', 8.50, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 5, NULL, NULL, 150);
INSERT INTO "public"."items" VALUES (46, 'Augmentin', 12.75, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 5, NULL, NULL, 180);
INSERT INTO "public"."items" VALUES (47, 'Brufen', 6.99, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 4, NULL, NULL, 170);
INSERT INTO "public"."items" VALUES (48, 'Zithromax', 15.25, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 5, NULL, NULL, 190);
INSERT INTO "public"."items" VALUES (49, 'Allegra', 9.50, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 7, NULL, NULL, 160);
INSERT INTO "public"."items" VALUES (50, 'Zyrtec', 11.75, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 7, NULL, NULL, 170);
INSERT INTO "public"."items" VALUES (51, 'Gaviscon', 7.99, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 8, NULL, NULL, 200);
INSERT INTO "public"."items" VALUES (52, 'Nexium', 10.25, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 8, NULL, NULL, 210);
INSERT INTO "public"."items" VALUES (53, 'Prozac', 12.50, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 9, NULL, NULL, 150);
INSERT INTO "public"."items" VALUES (54, 'Zoloft', 14.75, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 9, NULL, NULL, 160);
INSERT INTO "public"."items" VALUES (55, 'Diflucan', 8.99, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 10, NULL, NULL, 140);
INSERT INTO "public"."items" VALUES (56, 'Lamisil', 10.25, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 10, NULL, NULL, 160);
INSERT INTO "public"."items" VALUES (57, 'Aciclovir', 15.99, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 11, NULL, NULL, 180);
INSERT INTO "public"."items" VALUES (58, 'Valtrex', 18.50, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 11, NULL, NULL, 200);
INSERT INTO "public"."items" VALUES (59, 'Lisinopril', 13.99, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 12, NULL, NULL, 220);
INSERT INTO "public"."items" VALUES (60, 'Atenolol', 11.25, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 12, NULL, NULL, 180);
INSERT INTO "public"."items" VALUES (61, 'Ventolin', 8.75, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 13, NULL, NULL, 190);
INSERT INTO "public"."items" VALUES (62, 'Symbicort', 12.50, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 13, NULL, NULL, 210);
INSERT INTO "public"."items" VALUES (63, 'Singulair', 9.99, '2024-04-29 10:30:36.373047+05:30', '2024-04-29 10:30:36.373047+05:30', NULL, 13, NULL, NULL, 180);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" timestamptz(6),
  "full_name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "phone_number" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, '2024-04-26 11:29:47.725148+05:30', '2024-04-26 11:29:47.725148+05:30', NULL, 'Sayuru De Alwis', 'sayurudealwis99@gmail.com', '0778279803', '$2a$10$vcFRYZcp8mijY8mwDVbjfOPrgVbCf6HzqFZBrigY/OUNF6U5R2a4.');
INSERT INTO "public"."users" VALUES (2, '2024-04-26 21:55:59.668022+05:30', '2024-04-26 21:55:59.668022+05:30', '2024-04-27 10:19:07.651037+05:30', 'admin 21 c', 'admin@21ccare.com', '0772121212', '$2a$10$2fPxGdbQfQSSlhwkgSJLSOeLxDGG8BGcheL/2szciQ777BE5gYVve');
INSERT INTO "public"."users" VALUES (4, '2024-04-27 10:20:39.662766+05:30', '2024-04-27 10:20:39.662766+05:30', NULL, 'admin', 'admin@21_ccare.com', '0778279803', '$2a$10$2e6wwQeXjLkQoZR40nN4tOXp1ZCd2ursBaXKAdMldQSQnBnKwhgHC');
INSERT INTO "public"."users" VALUES (5, '2024-04-27 10:24:37.329152+05:30', '2024-04-27 10:24:37.329152+05:30', '2024-04-27 10:33:33.909815+05:30', 'test', 'test@test.com', '911', '$2a$10$OYF3iVLVK3Z8/4l1aXptx.8T1/rVe0w6FsIjOF0Nr2rw5HYMXFygK');
INSERT INTO "public"."users" VALUES (6, '2024-04-27 10:36:07.268856+05:30', '2024-04-27 10:36:07.268856+05:30', '2024-04-27 10:36:10.436629+05:30', 'Mahesh Rajasinghe', 'hsc.global85@gmail.com', '0778279803', '$2a$10$0Mr96RjVxSnciiu7DSBL3eimBbzh/bLf0h3DNBxXpqfa8Qks/b9xy');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."categories_id_seq"
OWNED BY "public"."categories"."id";
SELECT setval('"public"."categories_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."invoice_items_id_seq"
OWNED BY "public"."invoice_items"."id";
SELECT setval('"public"."invoice_items_id_seq"', 18, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."invoices_id_seq"
OWNED BY "public"."invoices"."id";
SELECT setval('"public"."invoices_id_seq"', 21, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."items_id_seq"
OWNED BY "public"."items"."id";
SELECT setval('"public"."items_id_seq"', 63, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 6, true);

-- ----------------------------
-- Indexes structure for table categories
-- ----------------------------
CREATE INDEX "idx_categories_deleted_at" ON "public"."categories" USING btree (
  "deleted_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table invoice_items
-- ----------------------------
CREATE INDEX "idx_invoice_items_deleted_at" ON "public"."invoice_items" USING btree (
  "deleted_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table invoice_items
-- ----------------------------
ALTER TABLE "public"."invoice_items" ADD CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table invoices
-- ----------------------------
CREATE INDEX "idx_invoices_deleted_at" ON "public"."invoices" USING btree (
  "deleted_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table invoices
-- ----------------------------
ALTER TABLE "public"."invoices" ADD CONSTRAINT "invoices_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table items
-- ----------------------------
CREATE INDEX "idx_category_id" ON "public"."items" USING btree (
  "category_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);
CREATE INDEX "idx_items_deleted_at" ON "public"."items" USING btree (
  "deleted_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table items
-- ----------------------------
ALTER TABLE "public"."items" ADD CONSTRAINT "items_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table invoice_items
-- ----------------------------
ALTER TABLE "public"."invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."invoice_items" ADD CONSTRAINT "invoice_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table items
-- ----------------------------
ALTER TABLE "public"."items" ADD CONSTRAINT "fk_items_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
