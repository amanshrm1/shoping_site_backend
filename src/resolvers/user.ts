import { sign } from 'jsonwebtoken'
import { dotenv } from '../index'
dotenv.config();

const secret: string = process.env.SECRET!
const tokenExpiry = process.env.EXPTOKENTIME

export default {

  Query: {
    /* ------------------ Query to get all Users --------------------------   */
    getAllUsers: (parent: any, argv: any, { prisma }: any) => prisma.user.findMany(),

    /* ------------------ Query to get single Users --------------------------   */
    getUser: (parent: any, { where }: any, { prisma }: any) => prisma.user.findOne({
      where: {
        userId: where.userId
      }
    })
  },
  User: {
    /* ------------------ Query to get orders of Users --------------------------   */
    orders: (parent: any, argv: any, { prisma }: any) => prisma.order.findMany({
      where: {
        userID: parent.userId
      }
    }),

    /* ------------------ Query to get orders of Users --------------------------   */
    totalOrderAmount: async (parent: any, argv: any, { prisma }: any) => {
      let amountToBePayed = 0

      const result = await prisma.order.findMany({
        where: {
          userID: parent.userId
        }
      })

      if(result != []){
        for(let key in result){
          amountToBePayed += result[key].orderProductPrice
        }
        console.log(amountToBePayed)
        return {amountToBePayed: amountToBePayed}
      }
      throw new Error('User dont have any orders')
    }
  },

  Mutation: {
    /* ------------------ Mutation to get create User --------------------------   */
    createUser: (parent: any, { data }: any, { prisma }: any) => {
      return prisma.user.create({
        data: {
          ...data
        }
      })
    },

    /* ------------------ Provide Token for track of user ---------------------- */
    loginUser: async (parent: any, { where }: any, { prisma }: any ) => {
  
      const { userId } = where
      const user = await prisma.user.findOne({
        where: {
          userId: where.userId
        }
      })

      if (!user) {
        throw new Error('User not found')
      }
      let accessToken = sign({ where }, secret ,{expiresIn: tokenExpiry})

      return {
        accessToken: accessToken
      }
    },

    /* ------------------ Mutation to update User --------------------------   */
    updateUser: (parent: any, { data, where }: any, { prisma }: any) => {
      return prisma.user.update({
        data: {
          ...data
        },
        where: {
          userId : where.userId
        }
      })   
    },

    /* ------------------ Mutation to delete User --------------------------   */
    deleteUser: (parent:any, { where }:any, { prisma }:any) => {
      return prisma.user.delete({
        where: {
          userId: where.userId
        }
      })
    }
  },
}