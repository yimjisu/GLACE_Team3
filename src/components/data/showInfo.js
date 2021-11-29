import poster1 from './images/poster1.jpg';
import poster2 from './images/poster2.jpg';
import poster3 from './images/poster3.jpg';

const cards = [
    {
        name: "보통날의 기적", place: "교양분관", period: "2021.09.01 ~ 2021.11.01", time: "100분", img: poster1,
        timeList: {"11-28-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
    "11-29-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
    },
    {
        name: "한여름 밤의 꿈", place: "B", period: "2021.09.01 ~ 2021.11.01", time: "110분", img: poster2,
        timeList: {"11-28-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
    "11-29-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
    },
    {
        name: "방방콘", place: "C", period: "2021.09.01 ~ 2021.11.01", time: "120분", img: poster3,
        timeList: {"11-28-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
    "11-29-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
    },
    {
        name: "겨울이야기", place: "D", period: "2021.09.01 ~ 2021.11.01", time: "130분", img: poster1,
        timeList: {"11-28-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
    "11-29-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
    },
    {
        name: "연극E", place: "E", period: "2021.09.01 ~ 2021.11.01", time: "140분", img: poster2,
        timeList: {"11-28-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
    "11-29-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
    },
    {
        name: "연극F", place: "F", period: "2021.09.01 ~ 2021.11.01", time: "150분", img: poster3,
        timeList: {"11-28-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
    "11-29-2021" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
    }
];

export default cards;