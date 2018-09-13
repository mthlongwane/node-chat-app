//node module is called path. 
const path  = require ('path');
const http = require ('http');
const express =  require('express');
const socketIO = require ('socket.io');


const publicPath = path.join(__dirname, '../public') ; // this is better than ../../ because it makes issues.
const port = process.env.PORT || 3000 ;
const {generateMessage} = require('./utils/message')


var app = express()
var server = http.createServer(app);

var io = socketIO(server); //add to server


io.on('connection', (socket) =>{
    // This is an event listener 
    // this defines each socket connection as the callback function returns each individual socket connection.
    console.log("Socket connected.")
    /*
    socket.emit('newEmail',{
        from: 'thando@gmail.com',
        to: "sizwe@gmail.com",
        text: 'Wazzup'
    }); 
    
    socket.on('createEmail',(newEmail) => {
        console.log('createEmail',newEmail)
    })*/

    // listen for users disconnections
    socket.on('disconnect', ()=>{
       console.log("Client disconnected.") 
    })

    //used to send welcome message 
/*    socket.emit('newMessage',{ //emits to socket connected only
        from: "Admin",
        text: "Welcome to the chatApp",
        createdAt: new Date().getTime()
    }) */
    socket.emit('newMessage',generateMessage( "Admin","Welcome to the chatApp")); // more modular way of generating messages
    /*
    socket.broadcast.emit('newMessage',{ //emits to all sockets excluding self
        from: "Admin",
        text: "New user has joined the chat",
        createdAt: new Date().getTime()
    }) */
    socket.broadcast.emit('newMessage', generateMessage( "Admin","New user has joined the chat"))

    // listens to users messages 
    socket.on('createMessage',(newMessage) => {
        //console.log('New message: ',newMessage)
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text)) // emits message to all sockets including self    
        /*
        socket.broadcast.emit('newMessage',{ // emits message to all sockets excluding self
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime().toString()
        }); */
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