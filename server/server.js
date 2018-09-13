//node module is called path. 
const path  = require ('path');
const http = require ('http');
const express =  require('express');
const socketIO = require ('socket.io');


const publicPath = path.join(__dirname, '../public') ; // this is better than ../../ because it makes issues.
const port = process.env.PORT || 3000 ;

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
    //used to send new message
    socket.emit('newMessage',{
        from: "Server",
        text: "aweeza",
        createdAt: new Date().getTime().toString()
    })
    // listens to users messages 
    socket.on('createMessage',(newMessage) => {
        //console.log('New message: ',newMessage)
        console.log(newMessage);
        
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