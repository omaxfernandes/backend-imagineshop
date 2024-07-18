import { Request, Response } from 'express'
import { createOrderService } from 'services/create-order.service'

export async function createOrderController(req: Request, res: Response) {
  const { products } = req.body
  const { id } = req.user
  await createOrderService({ products, userId: id })
  return res.status(201).json({ message: 'Order created' })
}
