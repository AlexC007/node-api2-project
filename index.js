const express = require('express')
const server =  express()
const db  = require('./data/db')
const postRoutes = require('./post/postRoutes')

server.use(express.json())
server.use('/api/posts', postRoutes)
server.use('/', (req, res) => res.send('API up and running!'));


server.listen(5000, ()=>{
    console.log("Port 5000 open")
})