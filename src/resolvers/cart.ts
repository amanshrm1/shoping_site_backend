export default {
  Query: {
    getAllCartItem: (parent: any, argv: any, { prisma }: any) =>  prisma.cart.findMany()
  },

  Mutation: {
    createCartItem: (parent:any, { data }: any, { prisma }: any) => prisma.cart.create({
      data: {
        ...data
      }
    }),

    deleteCartItem: (parent:any, { where }: any, { prisma }: any ) => prisma.cart.delete({
      where: {
        ...where
      }
    }),

    updateCartItem: ( parent:any, { data, where }: any, { prisma }: any ) => {
      const { cProductPrice, cProductQuantity, cfProductPrice } = data

      const finalProductPrice = cProductPrice * cProductQuantity
      
      const result = prisma.cart.update({
        data: {
          cProductPrice: cfProductPrice,
          cfProductPrice: finalProductPrice,
          cProductQuantity: cProductQuantity
        },
        where: {
          ...where
        }
      })

      return result
    }
  }
}