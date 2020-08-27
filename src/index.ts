import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server'
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

// const app = express()

// app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/', router)

// app.listen(process.env.PORT, () => {
//   console.log(`port is running at ${process.env.PORT}` )
// })

//const options = {
  const PORT = process.env.PORT
  //endpoint: process.env.ENDPOINT


const server = new ApolloServer({
  typeDefs,
  resolvers: [user, product, description, category, order, checkout],
  context(){
    return {
      prisma
    }
  }
})


server.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`)
})

export {prisma, dotenv}
