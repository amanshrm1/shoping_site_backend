import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { default as typeDefs} from './types'
import { default as user } from './resolvers/user'
import { default as product } from './resolvers/product'
import { default as description } from './resolvers/description'
import { default as category } from './resolvers/category'
import { default as order } from './resolvers/order'
import { default as checkout } from './resolvers/checkout'
import { router } from './default'

/*  Please Check the Explanation.txt for all the routes */


/* --------  created prisma client to deal with database ---------*/
const prisma = new PrismaClient();
dotenv.config();

/* -------- GraphqlServer object  ------------------------------ */
const server = new ApolloServer({
  typeDefs,
  resolvers: [user, product, description, category, order, checkout],
  context(){
    return {
      prisma
    }
  }
})

/*----------- Express integration ------------------------------------- */
const app = express()
app.use('/check', router)
server.applyMiddleware({app})

/* --------- Server starts ------------------------------------ */
app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})

export { prisma, dotenv }
