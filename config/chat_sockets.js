module.exports.chatSockets = (socketServer)=>{
    let io = require('socket.io')(socketServer)

    //Event is different just in this case
    //Udhar connect hai, idhar connection
    io.sockets.on('connection', (socket)=>{
        console.log("new connection recieved :", socket.id)

        socket.on('disconnect', ()=>{
            console.log("Socket disconnected!");
        })

    })


}