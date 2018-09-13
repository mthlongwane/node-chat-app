var socket = io();  
socket.on('connect', function(){
    console.log("client socket connected")
    /*socket.emit('createEmail', {
        from: "sizwe@gmail.com",
        to: 'thando@gmail.com',
        text: 'Bhudda ugrend?'
    })*/
    socket.emit('createMessage',{
        from: "newUser",
        text: "hey I've just joined!"
    })
})

socket.on('disconnect', function(){
    console.log("Disconnected from server")
})
/*    
socket.on('newEmail', function(email){
    console.log('New email',email);
})*/
socket.on('newMessage', function(message){
    console.log("New message: ", message );
})
