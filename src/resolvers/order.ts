import {  decode } from 'jsonwebtoken'
import { dotenv } from '../index'
dotenv.config();

const tokenToCheck:string = process.env.ACCESSTOKEN4!

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
    createOrder: (parent: any, { data  }: any, { prisma }: any) =>  {
      /* -- extracting userid from token so as to order fro that particular user ------*/
      const extractedUserId: any =  decode(tokenToCheck, {complete: true}) 

      const createOrder = prisma.order.create({
        data: {
          ...data,
          belongs: {
            connect: { userId: extractedUserId['payload']['where']['userId'] }
          }
        }
      })
      return createOrder
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