// const io = require('socket.io')(8000)
// node server which will handle socket io connection
const io = require('socket.io')(8000, {cors: {origin: "*"}}); 
const users = {};
io.on('connection',socket => {
    socket.on('new-user-joined',name => {
        // console.log("name",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message => {
        // console.log("name",message);
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });

    socket.on("disconnect", (reason) => {
        socket.broadcast.emit('disconnect_client',{message: "left the chat",name: users[socket.id]})
        delete users[socket.id];
      });
})
