import { createOrderController } from 'controllers/create-order.controller'
import express from 'express'

export const orderRoutes = express()
  .post('/orders', createOrderController)
