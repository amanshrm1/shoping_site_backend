# Migration `20200910075850-shopers`

This migration has been generated at 9/10/2020, 1:28:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"userId" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"username" text   ,
"password" text   ,
PRIMARY KEY ("userId")
)

CREATE TABLE "public"."Categories" (
"categoryId" SERIAL,
"category" text   NOT NULL ,
PRIMARY KEY ("categoryId")
)

CREATE TABLE "public"."Product" (
"productId" SERIAL,
"imageUrl" text   ,
"categoryID" integer   ,
PRIMARY KEY ("productId")
)

CREATE TABLE "public"."Description" (
"descriptionId" SERIAL,
"productName" text   NOT NULL ,
"productPrice" integer   NOT NULL ,
"productDescription" text   NOT NULL ,
"descriptionID" integer   NOT NULL ,
PRIMARY KEY ("descriptionId")
)

CREATE TABLE "public"."Cart" (
"cartId" SERIAL,
"cProductName" text   NOT NULL ,
"cProductPrice" integer   NOT NULL ,
"cProductQuantity" integer   NOT NULL ,
"cfProductPrice" integer   NOT NULL ,
PRIMARY KEY ("cartId")
)

CREATE TABLE "public"."Order" (
"orderId" SERIAL,
"orderProductName" text   NOT NULL ,
"orderProductPrice" integer   NOT NULL ,
"orderProductQuantity" integer   NOT NULL ,
"cartID" integer   ,
"userID" integer   ,
PRIMARY KEY ("orderId")
)

CREATE UNIQUE INDEX "User.username_unique" ON "public"."User"("username")

CREATE UNIQUE INDEX "Categories.category_unique" ON "public"."Categories"("category")

CREATE UNIQUE INDEX "Description.descriptionID_unique" ON "public"."Description"("descriptionID")

ALTER TABLE "public"."Product" ADD FOREIGN KEY ("categoryID")REFERENCES "public"."Categories"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Description" ADD FOREIGN KEY ("descriptionID")REFERENCES "public"."Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Order" ADD FOREIGN KEY ("userID")REFERENCES "public"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Order" ADD FOREIGN KEY ("cartID")REFERENCES "public"."Cart"("cartId") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200910075850-shopers
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,60 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  userId    Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  username      String? @unique
+  password  String?
+  orders    Order[]
+}
+
+model Categories {
+  categoryId Int       @id @default(autoincrement())
+  category   String    @unique
+  products   Product[]
+}
+
+model Product {
+  productId   Int          @id @default(autoincrement())
+  imageUrl    String?
+  category     Categories?  @relation(fields: [categoryID], references: [categoryId])
+  categoryID  Int?
+  description Description?
+}
+
+model Description {
+  descriptionId      Int     @id @default(autoincrement())
+  productName        String
+  productPrice       Int
+  productDescription String
+  product            Product @relation(fields: [descriptionID], references: [productId])
+  descriptionID      Int     @unique
+}
+
+model Cart {
+  cartId           Int   @id @default(autoincrement())
+  cProductName     String
+  cProductPrice    Int
+  cProductQuantity Int
+  cfProductPrice   Int
+}
+
+model Order {
+  orderId           Int    @id @default(autoincrement())
+  orderProductName  String
+  orderProductPrice Int
+  orderProductQuantity Int
+  user           User?  @relation(fields: [userID], references: [userId])  
+  cart           Cart?  @relation(fields: [cartID], references: [cartId])
+  cartID         Int?
+  userID         Int?
+}
+
+
```


