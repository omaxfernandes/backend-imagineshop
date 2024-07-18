import http from 'node:http'

const users: { id: number, name: string }[] = []

http.createServer()
  .listen(4444, () => console.log('Server is running on port 4444'))
  .on('request', (req, res) => {
    console.log(req.method, req.url)

    if (req.method === 'GET' && req.url === '/users') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(users))
      return
    }

    if (req.method === 'POST' && req.url === '/users') {
      users.push({ id: users.length + 1, name: 'Jackson' })
      res.writeHead(201, 'User Created', { 'Content-Type': 'application/json' })
      res.end()
      return
    }

    res.writeHead(404, 'Not found').end()
  })

// ----------------------------------------------------------------------------

function authMiddleware(req: http.IncomingMessage, res: http.ServerResponse) {
  const auth = req.headers.authorization

  if (auth === '123456') {
    console.log('Authorized')
    return true
  }

  res.writeHead(401, 'Unauthorized').end()
  return false
}

http.createServer()
  .listen(5555, () => console.log('Server is running on port 5555'))
  .on('request', (req, res) => {
    const { method, url } = req
    const isAuthorized = authMiddleware(req, res)
    if (!isAuthorized) return

    switch(url) {
      case '/users':
        switch (method) {
          case 'GET':
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(users))
            break
          case 'POST':
            users.push({ id: users.length + 1, name: 'Jackson' })
            res.writeHead(201, 'User Created', { 'Content-Type': 'application/json' })
            res.end()
            break
          default:
            res.writeHead(501, 'Method not implemented').end()
            break
        }
        break
      default:
        res.writeHead(404, 'Not found').end()
        break
    }
  })

function buildRoutePathRegex(path: string) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const paramsFromPath = path.replaceAll(routeParametersRegex, '(.*?)')

  const pathRegex = new RegExp(`^${paramsFromPath}(?<query>\\?(.*))?$`)

  return pathRegex
}

export function extractQueryParams(query: string) {
  return query.split('&').reduce((queryParams: any, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}

const routes = [
  {
    method: 'GET',
    path: buildRoutePathRegex('/users/:id'),
    handler: (req: any, res: any) => {
      const user = users.find(user => user.id === +req.params)
      return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(user))
    }
  },
  {
    method: 'POST',
    path: buildRoutePathRegex('/users'),
    handler: (req: any, res: any) => {
      users.push({ id: users.length + 1, name: 'Jackson' })
      return res.writeHead(201).end()
    }
  }
]

http.createServer()
  .listen(6666, () => console.log('Server is running on port 6666'))
  .on('request', (req: any, res) => {
    const { method, url } = req
    const isAuthorized = authMiddleware(req, res)
    if (!isAuthorized) return

    const route = routes.find(route => route.method === method && route.path.test(url!))
    if (route) {
      const routeParams = req.url!.match(route.path)
      const { query } = routeParams!.groups!
      req.params = routeParams[1]
      req.query = query ? extractQueryParams(query) : {}
      return route.handler(req, res)
    }
    return res.writeHead(404).end()
  })
