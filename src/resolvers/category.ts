export default {
  Query: {
    /* ------------------ Query to get all Categories --------------------------   */
    getCategories: (parent: any, argv: any, { prisma }: any) => prisma.categories.findMany(),

    /* ------------------ Query to get single Category --------------------------   */
    getCategory : (parent: any, { where }: any, { prisma }: any) => prisma.categories.findOne({
      where: {
        categoryId: where.categoryId
      }
    })
  },
  Category: {
    /* ------------------ Query to get products related to particular Category --------------------------   */
    products: (parent: any, argv: any, { prisma }: any) => prisma.product.findMany({
      where: {
        categoryID: parent.categoryId
      }
    })
  },

  Mutation: {
    /* ------------------ Mutation to create Category --------------------------   */
    createCategory: (parent: any, { data }: any, { prisma }: any) => prisma.categories.create({
      data: {
        ...data
      }
    }),

    /* ------------------ Mutation to get update Category --------------------------   */
    updateCategory: (parent: any, { data, where }: any, { prisma }:any) => prisma.categories.update({
      data: {
        ...data
      },
      where: {
        categoryId: where.categoryId
      }
    }),

    /* ------------------ Mutation to delete Category --------------------------   */
    deleteCategory: (parent: any, { where }: any, { prisma }: any) => prisma.categories.delete({
      where: {
        categoryId: where.categoryId
      }
    })
  }
}