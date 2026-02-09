const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

let idCounters = {}

// Middleware to ensure integer IDs
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    // Remove any id from the request body
    delete req.body.id
    
    // Get the resource name (employees, students, etc.)
    const resource = req.path.split('/')[1]
    
    // Read current db to get max id
    const db = router.db
    const collection = db.get(resource).value()
    
    // Find max id and add 1
    const maxId = collection.length > 0 
      ? Math.max(...collection.map(item => parseInt(item.id) || 0))
      : 0
    
    // Force integer id
    req.body.id = maxId + 1
  }
  next()
})

server.use(middlewares)
server.use(router)

const PORT = 3000
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})