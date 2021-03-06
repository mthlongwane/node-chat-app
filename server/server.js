//node module is called path. 
const path  = require ('path');
const http = require ('http');
const express =  require('express');
const socketIO = require ('socket.io');


const publicPath = path.join(__dirname, '../public') ; // this is better than ../../ because it makes issues.
const port = process.env.PORT || 3000 ;
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users');

var app = express()
var server = http.createServer(app);

var io = socketIO(server); //add to server
var users = new Users();


io.on('connection', (socket) =>{
    // This is an event listener 
    // this defines each socket connection as the callback function returns each individual socket connection.
    //console.log("Socket connected.")
    /*
    socket.emit('newEmail',{
        from: 'thando@gmail.com',
        to: "sizwe@gmail.com",
        text: 'Wazzup'
    }); 
    
    socket.on('createEmail',(newEmail) => {
        console.log('createEmail',newEmail)
    })*/

    socket.on('join', (params, callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room) ){
            return callback('Name and room are required.') //ensures that if data not valid, code below will not run
        }
        socket.join(params.room); //socket connection for specific rooms
        users.removeUser(socket.id); // remove user from other rooms before putting them into a new room
        //add user to list after joining chatroom
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        //io.emit --> io.to('zaio').emit
        //socket.broadcast.emit --> socket.broadcast.to('zaio').emit
        //socket.emit
        socket.emit('newMessage',generateMessage( "Admin","Welcome to the chatApp")); // more modular way of generating messages
        socket.broadcast.to(params.room).emit('newMessage', generateMessage( "Admin",`${params.name} has joined the chat`))
        callback();
    });

    // listen for users disconnections
    socket.on('disconnect', ()=>{
       var user = users.removeUser(socket.id); // remove user
       //console.log("Client disconnected.") 
       
       if(user){
           io.to(user.room).emit('updateUserList', users.getUserList(user.room)); //will remove user from room list
           io.to(user.room).emit('newMessage', generateMessage(`Admin`,` ${user.name} has left the chat`)); //emit message to everyone
       }
       //io.emit('newMessage',  generateMessage('user',"has left the chat."));
    })

    //used to send welcome message 
/*    socket.emit('newMessage',{ //emits to socket connected only
        from: "Admin",
        text: "Welcome to the chatApp",
        createdAt: new Date().getTime()
    }) */
    
    /*
    socket.broadcast.emit('newMessage',{ //emits to all sockets excluding self
        from: "Admin",
        text: "New user has joined the chat",
        createdAt: new Date().getTime()
    }) */

    // listens to users messages 
    socket.on('createMessage',(newMessage, callback) => {
        //console.log('New message: ',newMessage)
        var user = users.getUser(socket.id);
        if (user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text)) // emits message to all sockets including self    
        }
        /*
        socket.broadcast.emit('newMessage',{ // emits message to all sockets excluding self
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime().toString()
        }); */
        //callback({text: "Broacast was recieved and passed on"}); //acknowledgement that data recieved via a socket callback response
        callback();
    })

    socket.on('createLocationMessage', (coords) => {
        //io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`)) ;
        var user = users.getUser(socket.id);
        if (user){
        
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })
    

})

//middleware
app.use(express.static(publicPath));


server.listen(port, () => {
    console.log(`server up on port ${port}`);
})

/*
app.get('/',(req, res) =>{
    res.send("Awe")
})
*/