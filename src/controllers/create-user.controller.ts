import { Request, Response } from 'express'

export async function createUserController(req: Request, res: Response) {
  const { name } = req.body
  console.log(name)
  return res.status(201).json({ message: 'User created' })
}
