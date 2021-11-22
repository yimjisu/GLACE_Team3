const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors');
const io = require('socket.io')(server, {
    cors : {
        origin: '*',
        credentials : true
    }
});

io.on('connection', socket=> {
    console.log("socket connected")
    socket.on('showSelected', 
        function(data){
            console.log(data);
        });
    
    socket.on("requestShowInfo", function(){
        data = {'user': 1} // firebase 
        console.log("here?")
        socket.emit("requestShowInfo", data);
    })
    

})

server.listen(4000, function(){
    console.log('listening on port 4000');
})
