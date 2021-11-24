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
        async function (data) {
            // console.log("selected data");
            // console.log(data);
            current_data = data;

            var showTitle = data["name"];
            var documentSnapshot = await firestore.collection(showTitle).get();
            var times = documentSnapshot.docs.map(doc => doc.id);
            for (var i = 0; i < times.length; i++) {
                if (times[i] === '공연정보') {
                    times.splice(i, 1);
                    break
                }
            }

            // console.log(times)
            socket.emit("showSelected", times);
        });

    socket.on("requestShowInfo", async function () {
        const snap = await firestore.collection("show_info").get();
        var titles = snap.docs.map(doc => doc.id)

        const show_info = []
        for (var i = 0; i < titles.length; i++) {
            var documentSnapshot = await firestore.collection(titles[i]).doc("공연정보").get()
            var showData = documentSnapshot.data()
            var show_dic = {}

            show_dic["title"] = titles[i]
            show_dic["place"] = showData.place
            show_dic["period"] = showData.period
            show_dic["runTime"] = showData.runTime
            show_dic["poster"] = showData.poster

            show_info.push(show_dic)
        }

        // console.log(show_info)
        socket.emit("requenstShowInfo", show_info);
    })

    socket.on("seatInfo", async function (data) {
        /*
        - input data format example

        {
            title: "겨울이야기",
            date: "21.11.24",
            time: "16:00"
        }

        - output data format example

        {
            jsonFilePath: "../SeatLayout/seats-kaist.json", // or some url
            reserved: ['A10', 'B16', 'C2', 'D5'],
            progress: ['A8', 'C25']
        }
        */
        const seat_info = {};
        var showTitle = data["title"];
        var showTime = data["date"] + " " + data["time"];

        var documentSnapshot = await firestore.collection(showTitle).doc("공연정보").get();
        var showData = documentSnapshot.data();
        jsonFilePath = showData.seatInfo;

        const timeSnapshot = await firestore.collection(showTitle).doc(showTime).get();
        var timeData = timeSnapshot.data();
        // var reservationStates = Object.values(timeData);
        // var seats = Object.keys(timeData);

        var reserved = Object.keys(timeData).reduce(function (reserved, key) {
            if(timeData[key] === 'Reserved') reserved.push(key);
            return reserved;
        }, []);

        var progress = Object.keys(timeData).reduce(function (progress, key) {
            if(timeData[key] === 'Progress') progress.push(key);
            return progress;
        }, []);

        // var reserved = [];
        // var progress = [];
        // for (var i = 0; i < seats.length; i++) {
        //     if (reservationStates[i] === "Reserved") {
        //         reserved.push(seats[i]);
        //     }
        //     else {
        //         progress.push(seats[i]);
        //     }
        // }

        seat_info["jsonFilePath"] = jsonFilePath;
        seat_info["reserved"] = reserved;
        seat_info["progress"] = progress;

        socket.emit("seatInfo", seat_info);
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
