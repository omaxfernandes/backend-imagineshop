import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

// export const authMiddleware = express()
//   .use((req, res, next) => {
//     const auth = req.headers.authorization
//     if (auth === '123456') return next()
//     return res.status(403).json({ error: 'Forbidden' })
//   })

type UserProps = {
  id: string
  name: string
  email: string
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || ''

    const payload = verify(token, process.env.JWT_SECRET || '') as UserProps
    
    req.user = {
      id: payload.id,
      name: payload.name,
      email: payload.email
    }

    return next()
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden' })
  }
}
