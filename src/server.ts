import express, { json } from 'express'
import cors from 'cors'
import { authRoutes } from 'routes/auth.routes'
import { productsRoutes } from 'routes/products.routes'
import { userRoutes } from 'routes/users.routes'
import { orderRoutes } from 'routes/orders.routes'
import { authMiddleware } from 'middlewares/auth.middleware'

express()
  .use(json())
  .use(cors())
  .use('/images', express.static('public'))
  .use(authRoutes)
  .use(productsRoutes)
  .use(authMiddleware)
  .use(userRoutes)
  .use(orderRoutes)
  .listen(3333, () => console.log('Server is running on :3333'))
