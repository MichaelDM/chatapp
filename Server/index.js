const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const fs = require('fs')
const path = require('path')
const usersQuery = require('../DB/users')

function handler(req, res) {
  console.log("request starting...")

  let filePath = `.${req.url}`
  if (filePath === './') {
    filePath = `${__dirname}/../App/index.html`
  }

  const extname = path.extname(filePath)
  let contentType;
  switch (extname) {
    case '.html':
      contentType = 'text/html'
      break;
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.css':
      contentType = 'text/css'
      break;
  }

  console.log('before fs.existsSync')

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html')
      } else {
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data, 'utf-8')
      }
    })
  } else {
    console.log('pathName is not found:', filePath)
    res.writeHead(404)
    res.end('File not found')
  }
}

const message = []
function storeMessage(msgObject) {
  message.push(msgObject)
}

io.on('connection', function (socket) {

  socket.emit('connected')

  usersQuery.getUsers((users) => socket.emit('users', { users }))

  // username 
  socket.on('username', function (data) {
    if (data.username)
      usersQuery.insertUser(data.username)
    socket.username = data.username
  })

  socket.on('message', function (msgObject) {
    storeMessage(msgObject)
    console.log('msgObject is', msgObject)
    socket.emit('message', msgObject)
  })

})


app.listen(8080)
console.log('app is running on port 8080')