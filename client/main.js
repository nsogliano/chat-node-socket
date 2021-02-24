var socket = io.connect('http://192.168.0.116:6677',{'forceNew':true});

// Agarro los messages emitidos por el servidor.
socket.on('messages', (data) => {
    console.log(data);
    render(data);
})

function render(data){
    var html = data.map(function(message, index){
        return (`
        <div class="message">
            <strong>${message.nickname}</strong> dice:
            <p>${message.text}</p>
        </div>
    `)
    }).join(' ');

    var divMessages = document.getElementById('messages')
    divMessages.innerHTML = html;
    divMessages.scrollTop = divMessages.scrollHeight
}

function addMessage(event){
    // Creamos el message
    var m = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
    }

    document.getElementById('nickname').style.display = 'none';

    // Emitimos el message al servidor.
    socket.emit('add-message', m)
    return false;
}