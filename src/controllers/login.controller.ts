import { Request, Response } from 'express'
import { loginService } from 'services/login.service'

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const { user, accessToken } = await loginService(email, password)
    return res.json({ message: 'User logged', user, accessToken })
  } catch (error: any) {
    if (error.cause === 'Unauthorized') return res.status(401).json({ error: error.message })
    return res.status(500).json({ error: 'Internal server error' })
  }
}