import { decode, JsonWebTokenError, verify } from 'jsonwebtoken'
import { dotenv } from '../index'
dotenv.config();

const tokenToCheck:string = process.env.ACCESSTOKEN1!, salt: any = process.env.SALT

export default {
  Query: {
    /* ------------------ Query to get all Orders --------------------------   */
    getAllOrders:  (parent: any, argv: any, { prisma }: any) => prisma.order.findMany(),

    /* ------------------ Query to get single Order --------------------------   */
    getOrder: (parent: any, { where }: any, { prisma }: any) => prisma.order.findOne({
      where: {
        ItemId: where.ItemId
      }
    })
  },
  Order: {
    /* ------------------ Query to get user related to order --------------------------   */
    user: (parent: any, argv: any, { prisma }: any) => prisma.user.findOne({
      where: {
        userId: parent.userID
      }
    })
  },

  Mutation: {
    /* ------------------ Mutation to create Order --------------------------   */
    
    createOrder: async (parent: any, { data, where }: any, { prisma }: any) => {

      const extractUsernameForuserId: any =  decode(tokenToCheck, {complete: true}) 
      
      if(extractUsernameForuserId != null){
        const getUserId = await prisma.user.findOne({
          where: {
            username: extractUsernameForuserId['payload']['where']['username']
          }
        })
        console.log(getUserId['userId'])
  
        const result = await prisma.order.create({
          data: {
            ...data,
            user: {
              connect: { userId: getUserId['userId'] }
            },
            cart: {
              connect: { cartId: where.cartID}
            }
          }
        })
  
        const deleteFromCart = await prisma.cart.delete({
          where: {
            cartId: where.cartID
          }
        })
        return result
      }
      throw new Error('no token provided')
    },

    /* ------------------ Mutation to update Order --------------------------   */
    updateOrder: (parent: any, { data, where }: any, { prisma }: any) => prisma.order.update({
      data: {
        ...data
      },
      where: {
        ItemId: where.ItemId
      }
    }),

    /* ------------------ Mutation to delete Order --------------------------   */
    deleteOrder: (parent: any, { where }: any, { prisma }: any) => prisma.order.delete({
      where: {
        ItemId: where.ItemId
      }
    })
  }
}