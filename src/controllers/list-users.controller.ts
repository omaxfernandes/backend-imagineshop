import { Request, Response } from 'express'

export async function listUsersController(req: Request, res: Response) {
  const { name, age } = req.query
  console.log(name, age)
  return res.json({ message: 'Users list' })
}
