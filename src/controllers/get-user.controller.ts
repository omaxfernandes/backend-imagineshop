import { Request, Response } from 'express'

export async function getUserController(req: Request, res: Response) {
  const user = req.user
  return res.json({ message: 'User' })
}
