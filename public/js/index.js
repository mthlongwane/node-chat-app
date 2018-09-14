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

//action listener for message submit button
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextbox= jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'user',
        text: messageTextbox.val()
    }, function(response){ // this is waiting for the socket callback response
        //console.log("Server response:", response)
        messageTextbox.val('')
    });
})

//action listener for send location button
var locationButton = jQuery('#send-Location') ;
locationButton.on('click', function(){

    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser.')
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition( function(position){
        //console.log(position);
        
        locationButton.removeAttr('disabled').text('Send location');        
        
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
    });
})
