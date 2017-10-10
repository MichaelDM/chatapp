const elUsers = document.querySelector('.users')
const elMessages = document.querySelector('.messages ul')
const elConnectedUser = document.querySelector('.connected-user')
const elSendButton = document.querySelector('.send')

let me;

function displayMe() {
  elConnectedUser.innerText = `me: ${me}`
}

const displayConnectedUsers = users => {
  console.log('users once connected is', users)
  users.map(user => {
    const node = document.createElement('li')
    node.className += user.id
    const textnode = document.createTextNode(`${user.name}`)
    node.appendChild(textnode)
    elUsers.appendChild(node)
  })
}

function displayMessages(msgs) {

}

const appendMessage = ({ username, message }) => {
  const node = document.createElement('li')
  const textnode = document.createTextNode(`${username}: ${message}`)
  node.appendChild(textnode)
  elMessages.appendChild(node)
}


const socket = io()

console.log('js is running...')

socket.on('connected', function (data) {
  console.log('socket is connected')
  // username 
  me = prompt('what is your username?')
  displayMe(me);
  socket.emit('username', { username: me })

  //users 
  socket.on('users', ({ users }) => displayConnectedUsers(users))

  // connection 
  socket.emit('message', { username: me, message: 'is now connected' })

  // messages
  elSendButton.addEventListener('click', function () {
    const message = elMessages.value
    console.log('message value is', message)
    socket.emit('message', { username: me, message })
  })

  // socket.on('message', appendMessage(msgObject))
  socket.on('message', function (data) {
    appendMessage(data)
  })
})
