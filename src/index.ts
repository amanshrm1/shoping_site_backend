import express from 'express'
import bodyParser from 'body-parser'
const app = express();
const PORT = 5000

import { router } from './default'

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)


app.listen(PORT, () => {
  console.log(`app is listning at ${PORT}`)
})