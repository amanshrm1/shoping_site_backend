export default {
  Query: {
    /* ------------------ Query to get total Order Amount --------------------------   */
    checkoutAmount: async (parent: any, { where }: any, {prisma}: any) => {
      let amountToBePayed = 0

      if(where){
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
        throw new Error('No orders')
      }else{
        const result = await prisma.cart.findMany()

        if(result != []){
          for(let key in result){
            amountToBePayed += result[key].cfProductPrice
          }
          return {amountToBePayed: amountToBePayed}
        }
        throw new Error('Cart is Empty')
      }
    }
  }
}