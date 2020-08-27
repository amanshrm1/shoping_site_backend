export default {
  Query: {
     /* ------------------ Query to get Descriptions --------------------------   */
    getDescriptions: (parent:any, argv:any, { prisma }:any) => prisma.description.findMany(),

     /* ------------------ Query to get Description --------------------------   */
    getDescription: (parent:any, { where }:any, { prisma }:any) => prisma.description.findOne({
      where: {
        descriptionId: where.descriptionID
      }
    })
  },

  Mutation: {
    /* ------------------ Mutation to create Description --------------------------   */
    createDescription: (parent: any, { data, where }: any, { prisma }: any) => prisma.description.create({
      data: {
        ...data,
        belongs: {
          connect: { productId: where.descriptionID }
        }
      }
    }),

    /* ------------------ Mutation to update Description --------------------------   */
    updateDescription: (parent: any, { data, where }: any, { prisma }: any) => prisma.description.update({
      data: {
        ...data
      },
      where: {
        descriptionId: where.descriptionId
      }
    }),
  }
}