import { firestore, db } from "./service/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var current_data = {};
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// admin firebase
const admin = require("firebase-admin");
var serviceAccount = require("./service/glace-team3-firebase-adminsdk-7n3hx-86e0c8186f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://glace-team3-default-rtdb.firebaseio.com",
});

async function checkTimeout(showTitle, showTime, seat) {
  const timeSnapshot = admin.firestore().collection(showTitle).doc(showTime);
  var tmpData = (await timeSnapshot.get()).data();
  if (tmpData[seat] == "Progress") {
    timeSnapshot.update({
      [seat]: admin.firestore.FieldValue.delete(),
    });
  }
}

async function addDateInfo(showTitle, startDate, endDate) {
  var start = new Date(
    startDate.substring(0, 4),
    startDate.substring(5, 7),
    startDate.substring(8)
  );
  var end = new Date(
    endDate.substring(0, 4),
    endDate.substring(5, 7),
    endDate.substring(8)
  );

  const snap = await firestore.collection(showTitle).get();
  var titles = snap.docs.map((doc) => doc.id);
  const timeInfo = ["10:00", "14:00"];
  for (let i = start.getDate(); i < end.getDate(); i++) {
    var date = new Date();
    date.setDate(i);

    let month = date.getMonth() + 1;
    let day = date.getDate();
    const year = date.getFullYear();

    if (month < 10) {
      month = "0" + month.toString();
    }
    if (day < 10) {
      day = "0" + day.toString();
    }

    var new_date = month + "-" + day + "-" + year;

    for (let time of timeInfo) {
      var new_time = new_date + " " + time;
      if (!titles.includes(new_time)) {
        firestore.collection(showTitle).doc(new_time).set({});
      }
    }
  }
}

app.use(bodyParser.json());

app.get("/shows", async (req, res) => {
  const snap = await firestore.collection("show_info").get();
  var titles = snap.docs.map((doc) => doc.id);

  const show_info = [];
  for (var i = 0; i < titles.length; i++) {
    var documentSnapshot = await firestore
      .collection(titles[i])
      .doc("????????????")
      .get();
    var showData = documentSnapshot.data();
    var show_dic = {};

    show_dic["title"] = titles[i];
    show_dic["place"] = showData.place;
    show_dic["startDate"] = showData.startDate;
    show_dic["endDate"] = showData.endDate;
    show_dic["runTime"] = showData.runTime;
    show_dic["img"] = showData.img;
    show_dic["totalSeatNumber"] = showData.totalSeatNumber;

    show_info.push(show_dic);

    addDateInfo(titles[i], showData.startDate, showData.endDate);
  }

  return res.status(200).json(show_info);
});

app.get("/show/:name", async (req, res) => {
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

  var times_info = {};
  var showTitle = await req.params.name;
  if (typeof showTitle != "string") {
    return res.status(400).send("'title' must be String");
  }
  var documentSnapshot = await firestore.collection(showTitle).get();
  var times = documentSnapshot.docs.map((doc) => doc.id);

  for (var i = 0; i < times.length; i++) {
    if (times[i] === "????????????" || typeof times[i] != "string") {
      continue;
    } else {
      var timeSnapshot = await firestore
        .collection(showTitle)
        .doc(times[i])
        .get();
      var timeData = timeSnapshot.data();
      var reserveNum = Object.keys(timeData).length;

      var split_string = times[i].split(" ");
      var date = split_string[0];
      var time = split_string[1];

      if (!(date in times_info)) {
        times_info[date] = [];
      }
      times_info[date].push({ time: time, reservedSeat: reserveNum });
    }
  }

  return res.status(200).json(times_info);
});
app.get("/seatInfo", async (req, res) => {
  /*
    - input data format example
    {
        title: "???????????????",
        date: "21.11.24",
        time: "16:00"
    }
    - output data format example
    {
        reserved: ['A10', 'B16', 'C2', 'D5'],
        progress: ['A8', 'C25']
    }
    */
  var data = req.query;
  const seat_info = {};
  var showTitle = data.title;
  var showTime = data.date + " " + data.time;
  var documentSnapshot = await firestore
    .collection(showTitle)
    .doc("????????????")
    .get();
  var showData = documentSnapshot.data();
  const dbRef = db.ref();
  var jsonFile = await dbRef.child(data.title).get();
  const timeSnapshot = await firestore
    .collection(showTitle)
    .doc(showTime)
    .get();

  var timeData = timeSnapshot.data();

  var reserved = Object.keys(timeData).reduce(function (reserved, key) {
    if (timeData[key] === "Reserved") reserved.push(key);
    return reserved;
  }, []);

  var progress = Object.keys(timeData).reduce(function (progress, key) {
    if (timeData[key] === "Progress") progress.push(key);
    return progress;
  }, []);

  seat_info["jsonFile"] = jsonFile;
  seat_info["reserved"] = reserved;
  seat_info["progress"] = progress;

  return res.status(200).send(seat_info);
});

app.post("/seat/:seatID", async (req, res) => {
  /*
    - input data format example
    {
        title: "???????????????",
        date: "11-24-2021",
        time: "10:00"
        seat: "A11"
        type: "Progress" or "Cancel" or "Reserved"
    }
    - output data format example

    0: ???????????? ??????
    1: ???????????? ??????
    */

  var data = req.body;

  var showTitle = data["title"];
  var showTime = data["date"] + " " + data["time"];
  var seat = req.params.seatID;
  var updateType = data["type"];

  const timeSnapshot = admin.firestore().collection(showTitle).doc(showTime);
  var timeData = (await timeSnapshot.get()).data();

  var seats = Object.keys(timeData);

  if (updateType === "Progress") {
    if (seats.indexOf(seat) === -1) {
      await timeSnapshot.update({
        [seat]: updateType,
      });

      // ?????? timeout
      setTimeout(() => {
        checkTimeout(showTitle, showTime, seat);
      }, 300000);

      return res.status(201).send("1");
    } else {
      return res.status(409).send("0");
    }
  } else if (updateType === "Cancel") {
    if (seats.indexOf(seat) != -1 && timeData[seat] == "Progress") {
      timeSnapshot.update({
        [seat]: admin.firestore.FieldValue.delete(),
      });
      return res.status(200).send("1");
    } else {
      return res.status(400).send("0");
    }
  } else if (updateType === "Reserved") {
    timeSnapshot.update({
      [seat]: updateType,
    });
    return res.status(200).send("1");
  }

  return res.status(400).send("0");
});

app.post("/reservation", async (req, res) => {
  /*
    - input data format example

    {
        title: "???????????????",
        date: "21.11.24",
        time: "16:00",
        place: "?????????",
        phone:"01012345678",
        password:"abcdef1!",
        seat:["A1","A2"]
        
    }

    
    */

  var data = req.body;
  firestore
    .collection("reservation_info")
    .add({
      title: data.title,
      place: data.place,
      date: data.date,
      time: data.time,
      phone: data.phone,
      img: data.img,
      password: data.password,
      seat: data.seat,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

app.post("/user/reservation", async (req, res) => {
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
            title: '?????????',
            img: 'imgUrl',
            phone: '01023433333'
        },
        ...
    ]
    */

  var phone = req.body.phone;
  var password = req.body.password;

  const reservRef = collection(firestore, "reservation_info");
  const q = query(
    reservRef,
    where("phone", "==", phone),
    where("password", "==", password)
  );

  const querySnapshot = await getDocs(q);

  var reserv_info = [];
  querySnapshot.forEach((doc) => {
    reserv_info.push(doc.data());
  });
  if (reserv_info.length > 0) return res.status(200).send(reserv_info);

  return res.status(409).send(null);
});

io.on("connection", function (socket) {
  socket.on("seatChange", function (data) {
    const showTitle = data.title;
    const showTime = data.date + " " + data.time.time;
    const timeSnapshot = admin.firestore().collection(showTitle).doc(showTime);
    timeSnapshot.onSnapshot((doc) => {
      socket.emit("seatChanged", doc.data());
    });
  });
});

server.listen(4000, function () {
  console.log("listening on port 4000");
});
