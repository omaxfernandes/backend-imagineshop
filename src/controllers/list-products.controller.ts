import { Request, Response } from 'express'
import { listProductsService } from 'services/list-products.service'

export async function listProductsController(_: Request, res: Response) {
  try {
    const products = await listProductsService()
    return res.json({ data: { products } })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar produtos' })
  }
}
