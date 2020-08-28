import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
dotenv.config()

import { default as typeDefs} from './types'
import { default as user } from './resolvers/user'
import { default as product } from './resolvers/product'
import { default as description } from './resolvers/description'
import { default as category } from './resolvers/category'
import { default as order } from './resolvers/order'
import { default as checkout } from './resolvers/checkout'
const prisma = new PrismaClient();

import { router } from './default'

const server = new ApolloServer({
  typeDefs,
  resolvers: [user, product, description, category, order, checkout],
  context(){
    return {
      prisma
    }
  }
})

const app = express()
app.use('/', router)
server.applyMiddleware({app})


app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})

// ( async () => {
//   const app = express();

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers: [user, product, description, category, order, checkout],
//     context(){
//       return {
//         prisma
//       }
//     }
//   })

//   server.applyMiddleware({ app })
  
//   app.listen(4000, () => {
//     console.log('server is running')
//   })
// })() 

export {prisma, dotenv}
