import { User } from "@prisma/client";
import { sign } from 'jsonwebtoken'
import { prisma } from "lib/prisma";

type UserProps = Partial<User>

export async function loginService(email: string, password: string) {
  let user = await prisma.user.findFirst({
    where: {
      email
    }
  }) as UserProps

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        password,
      }
    }) as UserProps
  }

  if (user.password !== password) {
    throw new Error('Invalid password', { cause: 'Unauthorized' })
  }

  delete user.password
  const accessToken = sign(user, process.env.JWT_SECRET || '', { expiresIn: '1d' })

  return { user, accessToken }
}
