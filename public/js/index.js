var socket = io();  
socket.on('connect', function(){
    console.log("client socket connected")
    /*socket.emit('createEmail', {
        from: "sizwe@gmail.com",
        to: 'thando@gmail.com',
        text: 'Bhudda ugrend?'
    })*/
    /*
    //emits message to server 
    socket.emit('createMessage',{
        from: "newUser",
        text: "hey I've just joined!"
    }) */
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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target ="_blank">My current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})

/*
socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(response){ // this is waiting for the socket callback response
    console.log("Got it", response)
});*/

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function(response){ // this is waiting for the socket callback response
        console.log("Server response:", response)
    });
})

var locationButton = jQuery('#send-Location') ;

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser.')
    }

    navigator.geolocation.getCurrentPosition( function(position){
        //console.log(position);
        
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function(){
        alert('Unable to fetch location.')
    });
})
