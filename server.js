const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 8080

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('add player', (player) => {
    console.log('Player Added: ', player, new Date().toLocaleTimeString())
    io.sockets.emit('add player', player)
  })

  socket.on('start game', (playerlist) => {
    console.log('Game started with players:', playerlist, new Date().toLocaleTimeString())
    io.sockets.emit('start game', playerlist)
  })

  socket.on('kill player', (player) => {
    console.log('Player Killed: ', player, new Date().toLocaleTimeString())
    io.sockets.emit('kill player', player)
  })

  socket.on('hang player', (player) => {
    console.log('Voted to hang player: ', player, new Date().toLocaleTimeString())
    io.sockets.emit('hang player', player)
  })

  socket.on('execute player', (player) => {
    console.log('Town executed player: ', player, new Date().toLocaleTimeString())
    io.sockets.emit('execute player', player)
  })

  socket.on('end game', (winner) => {
    console.log('The winner of the game is the:', winner, new Date().toLocaleTimeString())
    io.sockets.emit('end game', winner)
  })

  socket.on('mafia wakeup', () => {
    console.log('Mafia Wakeup', new Date().toLocaleTimeString())
    io.sockets.emit('mafia wakeup')
  })
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))