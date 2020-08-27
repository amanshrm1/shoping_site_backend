export default {
  Query: {
    /* ------------------ Query to get total Order Amount --------------------------   */
    checkoutAmount: async (parent: any, { where }: any, {prisma}: any) => {
      let amountToBePayed = 0

      const result = await prisma.order.findMany({
        where: {
          userID: where.userID
        }
      })

      if(result != []){
        for(let key in result){
          amountToBePayed += result[key].orderProductPrice
        }
        return {amountToBePayed: amountToBePayed}
      }
      throw new Error('User dont have any orders')
    }
  }
}