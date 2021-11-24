import { firestore } from "../src/service/firebase.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var current_data = {};
const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

io.on('connection', socket => {


    console.log("socket connected")

    socket.on('showSelected',
        function (data) {
            console.log("selected data");
            console.log(data);
            current_data = data;
        });

    socket.on("requestShowInfo", function () {
        data = { 'user': 1 } // firebase 
        console.log("here?")
        socket.emit("requestShowInfo", data);
    })
    socket.on("user_add",
        function (data) {
            console.log("user add");
            console.log(current_data);
            firestore.collection("user_info").add({
                phone: data.phone,
                password: data.password,
                play: current_data.name,
                place: current_data.place,
                time: current_data.time,
                seat: "??"
            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });


            firestore.collection(current_data.name).
                add({
                    phone: data.phone,
                    password: data.password,
                    seat: "???"
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });


})

server.listen(4000, function () {
    console.log('listening on port 4000');
})
