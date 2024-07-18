import express from 'express'
import { getUserController } from 'controllers/get-user.controller'
import { listUsersController } from 'controllers/list-users.controller'
import { createUserController } from 'controllers/create-user.controller'

export const userRoutes = express()
  .get('/users/:id', getUserController)
  .get('/users', listUsersController)
  .post('/users', createUserController)
