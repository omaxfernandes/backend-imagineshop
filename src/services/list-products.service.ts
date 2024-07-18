import { prisma } from "lib/prisma";

export async function listProductsService() {
  const products = await prisma.product.findMany()
  return products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  }))
}
