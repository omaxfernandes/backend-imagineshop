import express from 'express'
import { listProductsController } from 'controllers/list-products.controller'
import { getProductController } from 'controllers/get-product.controller'

export const productsRoutes = express()
  .get('/products', listProductsController)
  .get('/products/:id', getProductController)
