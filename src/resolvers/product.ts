export default {
  Query: {
    /* ------------------ Query to get all Products --------------------------   */
    getProducts : (parent: any, argv: any, { prisma }: any) => prisma.product.findMany(),

    /* ------------------ Query to get all Categories --------------------------   */
    getProduct: (parent: any, { where }: any, { prisma }: any) => prisma.product.findOne({
      where: {
        productId: where.productId
      }
    })
  },
  Product: {
    /* ------------------ Query to get description of related Product --------------------------   */
    description: (parent: any, argv: any, { prisma }: any) => prisma.description.findOne({
      where: {
        descriptionID: parent.productId
      }
    }),

    /* ------------------ Query to get Category od related product--------------------------   */
    category: (parent: any, argv:any, { prisma }:any) => prisma.categories.findOne({
      where: {
        categoryId: parent.categoryID
      }
    })
  },

  Mutation: {
    /* ------------------ Mutation to create Category --------------------------   */
    createProduct: (parent: any, { data, where }: any, { prisma }: any) => prisma.product.create({
      data: {
        ...data,
        belongs: {
          connect: { categoryId: where.categoryID }
        }
      }
    }),

    /* ------------------ Mutation to delete Category --------------------------   */
    deleteProduct: (parent: any, { where }: any, { prisma }: any) => prisma.product.delete({
      where: {
        productId: where.productId
      }
    })
  }
}