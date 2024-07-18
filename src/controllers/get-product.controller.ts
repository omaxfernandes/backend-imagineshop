import { Request, Response } from 'express'
import { getProductService } from 'services/get-product.service'

export async function getProductController(req: Request, res: Response) {
  try {
    const { id } = req.params
    const product = await getProductService(id)
    return res.json({ data: { product } })
  } catch (error: any) {
    if (error.cause === 'ProductNotFound') {
      return res.status(404).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Erro ao buscar produto' })
  }
}
