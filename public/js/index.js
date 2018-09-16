var socket = io();  
 //calculates if messages have hit bottom of screen and whether scrolling is required.
function scrollToBottom(){
    //selectors 
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    // the scroll accounts for new messages and when you are currently not on at the bottom, it will not throw you to the bottom instantly
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight); 
    }

}

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
    //console.log("New message: ", message );
    var formattedTime = moment(message.createdAt).format("HH:mm");
    var template = jQuery('#message-template').html(); // this returns the template code
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    }); 
    jQuery('#messages').append(html);
    scrollToBottom();
    /* from the initial means to setup message injecting
   
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`)

    jQuery('#messages').append(li);*/
})

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format("HH:mm");
    var template = jQuery('#location-message-template').html(); // this returns the template code
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    }); 
    jQuery('#messages').append(html);
    scrollToBottom();
    /*
    var li = jQuery('<li></li>');
    var a = jQuery('<a target ="_blank">My current Location</a>');
    li.text(`${message.from} ${formattedTime}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li); */
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
