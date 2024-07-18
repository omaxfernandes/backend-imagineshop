import express from 'express'
import { loginController } from 'controllers/login.controller'

export const authRoutes = express()
  .post('/login', loginController)
