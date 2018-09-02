//node module is called path. 
const path  = require ('path');
const http = require ('http');
const express =  require('express');
const socketIO = require ('socket.io');


const publicPath = path.join(__dirname, '../public') ; // this is better that ../../ because it makes issues.
const port = process.env.PORT || 3000 ;

var app = express()
var server = http.createServer(app);

var io = socketIO(server);
io.on('connection', (socket) =>{
    // this defines each socket connection as the callback function returns each individual socket connection.
    console.log("Socket connected.")

    socket.on('disconnect', ()=>{
       console.log("It disconnected.") 
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