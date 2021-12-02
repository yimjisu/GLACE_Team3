import { firestore } from "../src/service/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
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

// admin firebase
const admin = require('firebase-admin');
var serviceAccount = require("../glace-team3-firebase-adminsdk-7n3hx-86e0c8186f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://glace-team3-default-rtdb.firebaseio.com"
  });

app.use(bodyParser.json());

app.get('/shows', async (req, res) => {
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
        show_dic["img"] = showData.img
        show_dic["totalSeatNumber"] = showData.totalSeatNumber

        show_info.push(show_dic)
    }

    // console.log(show_info)
    return res.status(200).json(show_info)
})

app.get('/show/:name', async (req, res) => {
    /*
    - output data format example
    {
        '11-24-2021': [
            { time: '10:00', reservaedSeat: 3 },
            { time: '14:00', reservaedSeat: 2 }
        ],
        '11-26-2021': [ { time: '10:00', reservaedSeat: 2 } ]
    }
    */
    current_data = await req;

    var times_info = {}
    var showTitle = await req.params.name;
    if (typeof showTitle != 'string') {
        return res.status(400).send("'title' must be String");
    }
    var documentSnapshot = await firestore.collection(showTitle).get();
    var times = documentSnapshot.docs.map(doc => doc.id);

    for (var i = 0; i < times.length; i++) {
        if (times[i] === '공연정보' || typeof times[i] != "string") {
            // times.splice(i, 1);
            continue
        }
        else {
            var timeSnapshot = await firestore.collection(showTitle).doc(times[i]).get();
            var timeData = timeSnapshot.data();
            var reserveNum = Object.keys(timeData).length;

            var split_string = times[i].split(' ');
            var date = split_string[0];
            var time = split_string[1];

            if(!(date in times_info)) {
                times_info[date] = []
            }
            times_info[date].push({time: time, reservedSeat: reserveNum})
        }
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
    var data = req.query;
    console.log(data);
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

app.post('/seat/:seatID', async (req, res) => {
    /*
    - input data format example
    {
        title: "겨울이야기",
        date: "11-24-2021",
        time: "10:00"
        seat: "A11"
        type: "Progress" or "Cancel" or "Reserved"
    }
    - output data format example

    0: 업데이트 실패
    1: 업데이트 성공
    */

    var data = req.body

    var showTitle = data["title"];
    var showTime = data["date"] + " " + data["time"];
    // var seat = data["seat"];
    var seat = req.params.seatID;
    var updateType = data["type"];

    const timeSnapshot = admin.firestore().collection(showTitle).doc(showTime);
    // var timeSnapshotGet = timeSnapshot.get();
    // var timeData = timeSnapshotGet.data();
    var timeData = (await timeSnapshot.get()).data();

    var seats = Object.keys(timeData);

    if (updateType === 'Progress') {
        if(seats.indexOf(seat) === -1) {
            timeSnapshot.update({
                [seat]: updateType
            });

            // 선점 timeout
            setTimeout(() => {
                console.log(seat);
                timeSnapshot.update({
                    [seat]: admin.firestore.FieldValue.delete()
                });
                console.log('erase');
            }, 300000);
            
            return res.status(201).send("1")
        } else {
            return res.status(409).send("0")
        }
    } else if (updateType === 'Cancel') {
        if(seats.indexOf(seat) != -1) {
            timeSnapshot.update({
                [seat]: admin.firestore.FieldValue.delete()
            });
            return res.status(200).send("1")
        } else {
            return res.status(400).send("0")
        }
    } else if (updateType === 'Reserved') {
        timeSnapshot.update({
            [seat]: updateType
        });
        return res.status(200).send("1")
    }

    return res.status(400).send("0")
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
    //console.log(encodeURIComponent("4oif2/!?:;fe"));

    var data = req.body;
    console.log(data);


    firestore.collection("reservation_info").add({
        title: data.title,
        place: data.place,
        date: data.date,
        time: data.time,
        phone: data.phone,
        password: encodeURIComponent(data.password),
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
            password: encodeURIComponent(data.password),
            seat: data.seat
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

})

app.post('/checkReservationInfo', async (req, res) => {
    /*
    - input data format example

    {
        phone:"01012345678",
        password:"abcdef1!"
    }

    - output data format example
    [
        {
            password: 'qwertyui',
            seat: [ 'A115' ],
            date: '11-28-2021',
            place: 'C',
            time: {
            endTime: '14:00',
            allSeat: 400,
            startTime: '12:00',
            reservedSeat: 200
            },
            title: '방방콘',
            phone: '01023433333'
        },
        ...
    ]
    */
    var data = req.body;
    console.log(data);

    const reservRef = collection(firestore, "reservation_info");
    const q = query(reservRef, where("phone", "==", data.phone), where("password", "==", encodeURIComponent(data.password)));

    const querySnapshot = await getDocs(q);
    //console.log("data!!");
    var reserv_info = [];
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        reserv_info.push(doc.data());
    });
    console.log(reserv_info);

    return res.status(200).send(reserv_info)

})

server.listen(4000, function () {
    console.log('listening on port 4000');
})
