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
    console.log('Player Added: ', player)
    io.sockets.emit('add player', player)
  })

  socket.on('start game', (playerlist) => {
    console.log('Game started with players:', playerlist)
    io.sockets.emit('start game', playerlist)
  })

  socket.on('kill player', (player) => {
    console.log('Player Killed: ', player)
    io.sockets.emit('kill player', player)
  })

  socket.on('hang player', (player) => {
    console.log('Voted to hang player: ', player)
    io.sockets.emit('hang player', player)
  })

  socket.on('execute player', (player) => {
    console.log('Town executed player: ', player)
    io.sockets.emit('execute player', player)
  })
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))