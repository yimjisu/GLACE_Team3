import { firestore } from "../src/service/firebase.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var current_data = {};
const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors');
const bodyParser = require('body-parser');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

app.use(bodyParser.json());

app.get('/requestShowInfo', async (req, res) => {
    const snap = await firestore.collection("show_info").get();
    var titles = snap.docs.map(doc => doc.id)

    const show_info = []
    for (var i = 0; i < titles.length; i++) {
        var documentSnapshot = await firestore.collection(titles[i]).doc("공연정보").get()
        var showData = documentSnapshot.data()
        var show_dic = {}

        show_dic["title"] = titles[i]
        show_dic["place"] = showData.place
        show_dic["startDate"] = showData.startDate
        show_dic["endDate"] = showData.endDate
        show_dic["runTime"] = showData.runTime
        show_dic["poster"] = showData.poster

        show_info.push(show_dic)
    }

    // console.log(show_info)
    return res.status(200).json(show_info)
})

app.get('/showSelected', async (req, res) => {
    /*
    - output data format example
    {
        // 공연 날짜 시간: 예약 완료 좌석 (예약 완료, 예약중 두 상태 모두)
        "21.11.24 16:00": 6,
        "21.11.24 18:00": 0,
        "21.11.24 20:00": 0 
    }
    */

    current_data = await req;

    var times_info = {}

    var showTitle = await req.query.name;
    if (typeof showTitle != 'string') {
        return res.status(400).send("'name' must be String");
    }
    var documentSnapshot = await firestore.collection(showTitle).get();
    var times = documentSnapshot.docs.map(doc => doc.id);
    for (var i = 0; i < times.length; i++) {
        if (times[i] === '공연정보') {
            times.splice(i, 1);
            break
        }
    }

    for (var i = 0; i < times.length; i++) {
        var timeSnapshot = await firestore.collection(showTitle).doc(times[i]).get();
        var timeData = timeSnapshot.data();
        times_info[times[i]] = Object.keys(timeData).length
    }

    console.log(times_info)
    return res.status(200).json(times_info)
})

app.get('/seatInfo', async (req, res) => {
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
    var data = req.query

    const seat_info = {};
    var showTitle = data.title;
    var showTime = data.date + " " + data.time;

    var documentSnapshot = await firestore.collection(showTitle).doc("공연정보").get();
    var showData = documentSnapshot.data();
    var jsonFilePath = showData.seatInfo;

    const timeSnapshot = await firestore.collection(showTitle).doc(showTime).get();
    var timeData = timeSnapshot.data();
    // var reservationStates = Object.values(timeData);
    // var seats = Object.keys(timeData);

    var reserved = Object.keys(timeData).reduce(function (reserved, key) {
        if (timeData[key] === 'Reserved') reserved.push(key);
        return reserved;
    }, []);

    var progress = Object.keys(timeData).reduce(function (progress, key) {
        if (timeData[key] === 'Progress') progress.push(key);
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

    return res.status(200).send(seat_info)
})

app.get('/checkSeatReservation', async (req, res) => {
    /*
    - input data format example
    {
        title: "겨울이야기",
        date: "21.11.24",
        time: "16:00"
        seat: "A8"
    }
    - output data format example
    0: 좌석 선점 중, 좌석 선택 불가능
    1: 좌석 선택 가능
    */
    var data = req.query

    var showTitle = data.title;
    var showTime = data.date + " " + data.time;
    var findingSeat = data.seat;

    const timeSnapshot = await firestore.collection(showTitle).doc(showTime).get();
    var timeData = timeSnapshot.data();

    var seats = Object.keys(timeData);

    if (seats.indexOf(findingSeat) === -1) {
        return res.status(200).send("1")
    } else {
        return res.status(200).send("0")
    }
})


app.post('/addReservationInfo', async (req, res) => {
    /*
    - input data format example

    {
        title: "겨울이야기",
        date: "21.11.24",
        time: "16:00",
        place: "인사동",
        phone:"01012345678",
        password:"abcdef1!",
        seat:["A1","A2"]
        
    }

    
    */
    var data = req.body
    firestore.collection("reservation_info").add({
        title: data.title,
        place: data.place,
        date: data.date,
        time: data.time,
        phone: data.phone,
        password: data.password,
        seat: data.seat
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

    firestore.collection(data.title).
        add({
            phone: data.phone,
            password: data.password,
            seat: data.seat
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

})

io.on('connection', socket => {

    console.log("socket connected")

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

io.on('connection', socket => {

    console.log("socket connected")

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

    socket.on("seatSelected", function (seatName) {
        console.log("seat selected", seatName)
    })

    socket.on("seatUnselected", function (seatName) {
        console.log("seat unselected", seatName)
    })

})

server.listen(4000, function () {
    console.log('listening on port 4000');
})


server.listen(4000, function () {
    console.log('listening on port 4000');
})