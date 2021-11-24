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

    
    // const snap = firestore.collection("show_info");
    // snap.get().then(snapshots => {
    //     console.log(snapshots.docs.map(doc => doc.id))
    // })
    // console.log(typeof snap);
    // snap.then(doc => {
    //     console.log(doc.id, '=>', doc.data());
    //     console.log(doc.data().place)
    // });


    console.log("socket connected")

    socket.on('showSelected',
        async function (data) {
            // console.log("selected data");
            // console.log(data);
            current_data = data;

            var showTitle = data["name"]
            var documentSnapshot = await firestore.collection(showTitle).get()
            var times = documentSnapshot.docs.map(doc => doc.id)
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
