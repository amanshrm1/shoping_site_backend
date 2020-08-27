import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = process.env.PORT

import { router } from './default'

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)


app.listen(PORT, () => {
  console.log(`app is listning at ${PORT}`)
})