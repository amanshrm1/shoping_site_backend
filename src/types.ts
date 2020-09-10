export default `
 
 type User {
  userId: Int!
  username: String!
  password: String!
  orders: [Order!]
  totalOrderAmount: PaymentAmount
  accessToken: String
 }

 type Category {
   categoryId: Int!
   category : String!
   products: [Product]!
 }

 type Product {
  productId: Int!
  imageUrl: String!
  categoryID: Int!
  category: Category!
  description: Description!
 }

 type Description {
  descriptionId: Int!
  productName: String!
  productPrice: Int!
  productDescription: String!
  descriptionID: Int!
 }

 type Cart {
   cartId: Int!
   cProductName: String
   cProductPrice : Int
   cProductQuantity: Int
   cfProductPrice: Int
 }

 type Order {
  ItemId: Int!
  orderProductName: String!
  orderProductPrice: Int!
  orderProductQuantity: Int!
  userID: Int!
  cartID: Int!
  user: User!
 }

 type PaymentAmount{
   amountToBePayed: Int!
 }
  

 type Query {
  getAllUsers: [User]!
  getUser(where: userWhereUniqueInput!): User
  getCategories: [Category]!
  getCategory(where: uniqueCategoryInput!): Category
  getProducts: [Product]
  getProduct(where: productUniqueInput!): Product
  getDescriptions: [Description]
  getDescription(where: getDescriptionUniqueInput!): Description
  getAllCartItem: [Cart]
  getAllOrders: [Order]
  getOrder(where: updateOrderUniqueInput!): Order
  checkoutAmount(where: createOrderUniqueInput): PaymentAmount 
 }

 

 type Mutation {
  createUser(data: createUserData!): User
  loginUser(where: userLoginInput!): User
  updateUser(data: updateUserData!, where: userWhereUniqueInput!): User
  deleteUser(where: userWhereUniqueInput!): User

  createCategory(data: createCategoryData!): Category
  deleteCategory(where: uniqueCategoryInput!): Category
  updateCategory(data: createCategoryData!,where: uniqueCategoryInput!): Category

  createProduct(data: createProductData!, where: createProductUniqueInput!): Product
  updateProduct(data: createProductData!, where: productUniqueInput!): Product
  deleteProduct(where: productUniqueInput!): Product

  createDescription(data: createDescriptionData!, where: createDescriptionUniqueInput!): Description
  updateDescription(data: createDescriptionData!, where: descriptionUniqueInput!): Description

  createOrder(data: createOrderData!,where: createOrderUniqueInput): Order
  updateOrder(data: createOrderData!, where: updateOrderUniqueInput!): Order
  deleteOrder(where: updateOrderUniqueInput!): Order

  createCartItem(data: createCartItemData!): Cart
  deleteCartItem(where: cartUniqueId!): Cart
  updateCartItem(data: updateCartItemData!, where: cartUniqueId!): Cart
 }

 input cartUniqueId {
   cartId: Int!
 }

 input updateCartItemData {
  cProductPrice: Int
  cProductQuantity: Int
  cfProductPrice: Int
 }

 input createCartItemData {
   cProductName: String!
   cProductPrice: Int!
   cProductQuantity: Int!
   cfProductPrice : Int
 }
 
 input createUserData {
   username: String!
   password: String!
 }

 input updateUserData {
   name: String
 }

 input userWhereUniqueInput {
   userId: Int!
 }

 input userLoginInput {
  username: String!
  password: String!
 }

 input createCategoryData {
   category: String!
 }

 input uniqueCategoryInput {
   categoryId: Int!
 }

 input createProductData {
  imageUrl: String!
 }

 input createProductUniqueInput {
   categoryID: Int
 }

 input productUniqueInput {
  productId: Int!
 }

 input createDescriptionData {
  productName: String
  productPrice: Int
  productDescription: String
 }

 input createDescriptionUniqueInput {
  descriptionID: Int
 }

 input createOrderData {
  orderProductName: String!
  orderProductPrice: Int!
  orderProductQuantity: Int!
 }

 input createOrderUniqueInput {
  cartID: Int!
 }

 input getDescriptionUniqueInput {
  descriptionID : Int!
 }

 input updateOrderUniqueInput {
   ItemId: Int!
 }

 input descriptionUniqueInput {
  descriptionId: Int!
 }

`