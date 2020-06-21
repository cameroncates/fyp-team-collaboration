const Express = require("express")()
const Http = require('http').Server(Express)
const Socketio = require("socket.io")(Http)

var workspace = 0

Socketio.on("connection", socket => {
    // console.log("new connection made")
    console.log(`Socket ${socket.id} connected. ${Socketio.engine.clientsCount}`);
    // socket.on('disconnect', () => {
    //     console.log(`Socket ${socket.id} disconnected.`);
    // });

    socket.emit("workspace", workspace)
    socket.on("workspace", data => {
        // position.x += 10
        // console.log(data, position.x, 'data on the server side')
        socket.broadcast.emit("workspace", data)
    })
    socket.on("editing", data => {
        // console.log('currentltarasda')
        socket.broadcast.emit('editing', data)
    })
})

Http.listen(5000, () => {
    console.log('listening at :5000...')
})
