import { prisma } from "lib/prisma";

export async function getProductService(id: string) {
  const product = await prisma.product.findFirst({
    where: {
      id
    }
  })

  if (!product) {
    throw new Error('Produto não encontrado', { cause: 'ProductNotFound' })
  }

  return {
    ...product,
    summary: product.details
  }
}
