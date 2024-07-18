import { User } from "@prisma/client";
import { sign } from 'jsonwebtoken'
import { prisma } from "lib/prisma";

type UserProps = Partial<User>

export async function createOrderService({ userId, products }: { userId: string, products: string[] }) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('Usuário não encontrado', { cause: 'UserNotFound' })
  }

  const productsFound = await prisma.product.findMany({
    where: { id: { in: products } },
    select: { id: true }
  })

  if (productsFound.length !== products.length) {
    throw new Error('Um ou mais produtos não foram encontrados', { cause: 'ProductsNotFound' })
  }

  await prisma.order.create({
    data: {
      userId,
      products: {
        connect: productsFound
      }
    }
  })
}
