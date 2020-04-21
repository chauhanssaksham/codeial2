class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000'); 

        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){ //Emits an event 'connection', different in this case only
            console.log("Connection established using sockets");

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatRoom: 'codeial'
            })

            self.socket.on('user_joined', (data)=>{
                console.log("A user joined, ", data);
            })
        })

       $('#send-message').click(function(){
            let msg = $('#message-input').val();
            if (msg != ''){
                self.socket.emit('sendMessage', {
                    message: msg,
                    userEmail: self.userEmail,
                    chatRoom: 'codeial'
                });
                $('#message-input').val('');
            }
        });

        self.socket.on('recieve_message', (data)=>{
            if(data.userEmail == self.userEmail){
                let msgElement = `<div class="col s10 right message amber lighten-1">${data.message}</div>`;
                $('#message-box').append(msgElement);
            } else {
                let msgElement = `<div class="col s10 message">${data.message}</div>`;
                $('#message-box').append(msgElement);
            }
        });
    }
}