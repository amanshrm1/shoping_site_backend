import { Request, Response, Router } from 'express'
const router = Router();


  router.get('/', (req: Request, res: Response) => {
    res.send(`
      <html>
         <body style="padding: 15% 35% 35% 35%">
            <h1 style="color:blue">Click Below To Login</h1>
         </body>
      </html>
    `)
  })

   export { router }