module.exports.chatSockets = (socketServer)=>{
    let io = require('socket.io')(socketServer)

    //Event is different just in this case
    //Udhar connect hai, idhar connection
    io.sockets.on('connection', (socket)=>{
        console.log("new connection recieved :", socket.id)

        socket.on('disconnect', ()=>{
            console.log("Socket disconnected!");
        })

        socket.on('join_room', (data)=>{
            console.log('Joinin request recieved ', data);

            socket.join(data.chatRoom);     

            io.in(data.chatRoom).emit('user_joined', data);
        })

        socket.on('sendMessage', (data)=>{
            io.in(data.chatRoom).emit('recieve_message', data);
        })
    })


}