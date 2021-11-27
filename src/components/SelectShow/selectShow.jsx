import React, { useState, useEffect, useContext } from "react";
import styles from "./selectShow.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";
import poster1 from '../images/poster1.jpg';
import poster2 from '../images/poster2.jpg';
import poster3 from '../images/poster3.jpg';
//import db from "../../service/firebase";


import { SocketContext } from '../../service/socket';

const SelectShow = ({
    state, setState, setShowInfo
}) => {

    const socket = useContext(SocketContext);
    const cards = [
        {
            name: "보통날의 기적", place: "교양분관", period: "2021.09.01 ~ 2021.11.01", time: "100분", img: poster1,
            timeList: {"11-28" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
        "11-29" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
        },
        {
            name: "한여름 밤의 꿈", place: "B", period: "2021.09.01 ~ 2021.11.01", time: "110분", img: poster2,
            timeList: {"11-28" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
        "11-29" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
        },
        {
            name: "방방콘", place: "C", period: "2021.09.01 ~ 2021.11.01", time: "120분", img: poster3,
            timeList: {"11-28" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
        "11-29" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
        },
        {
            name: "겨울이야기", place: "D", period: "2021.09.01 ~ 2021.11.01", time: "130분", img: poster1,
            timeList: {"11-28" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
        "11-29" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
        },
        {
            name: "연극E", place: "E", period: "2021.09.01 ~ 2021.11.01", time: "140분", img: poster2,
            timeList: {"11-28" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
        "11-29" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
        },
        {
            name: "연극F", place: "F", period: "2021.09.01 ~ 2021.11.01", time: "150분", img: poster3,
            timeList: {"11-28" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 100, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 200, allSeat: 400 }],
        "11-29" : [{ startTime : "10:00", endTime : "12:00", reservedSeat : 0, allSeat: 600 }, { startTime : "12:00", endTime : "14:00", reservedSeat : 0, allSeat: 400 }]}
        }
    ];

    const footerStyle = { backgroundColor: "#FFFFFF" };//#3e3e3e"};

    const [showCard, setShowCard] = useState(-1);
    const onClickNext = (index) => {
        console.log("showSelected");
        socket.emit("showSelected", cards[index]);
        setShowCard(index);
    }
    const onClickPrevBtn = () => {
        setShowCard(-1);
    }
    const onClickNextBtn = () => {
        setState(state + 1);
        setShowInfo(cards[showCard]);
    }

    useEffect(() => {
        socket.emit("requestShowInfo");
        socket.on("requestShowInfo", function (data) {
            console.log(data);
        });
    }, []);
    
    const [startDate, setStartDate] = useState(new Date());

    const monthday = startDate.getMonth()+1 + "-" + startDate.getDate();
    return (
        <div className={styles.panelWindow}>
            {
                showCard == -1 ? (
                    <div className={styles.cardDiv}>
                        {
                            cards.map((value, index) => {
                                return (
                                    <Card className={styles.cards} onClick={() => { onClickNext(index); }} style={{ cursor: 'pointer' }}>
                                        <Card.Img variant="top" height="400px" src={value.img} />
                                        <Card.Footer style={footerStyle} className={styles.show} >
                                            <b>{value.name}</b>
                                            <div className={styles.info}>
                                                <br />장소: {value.place}<br />기간: {value.period}
                                            </div>
                                        </Card.Footer >
                                    </Card>);
                            })
                        }
                    </div>
                ) : (
                    <div className={styles.panel2}>
                        <div>
                            <Row xs={1} md={3}>
                                <Col>
                                    <div className={styles.show2}>
                                        {cards[showCard].name}
                                    </div><br />
                                    <Image variant="top" src={cards[showCard].img} width="300px" />
                                    <br /><br />
                                    <div className={styles.show2}>
                                        장소: {cards[showCard].place}
                                    </div><br />
                                    <div className={styles.show2}>
                                        기간: {cards[showCard].period}
                                    </div><br />
                                    <div className={styles.show2}>
                                        관람시간: {cards[showCard].time}
                                    </div>
                                </Col>
                                <Col>
                                    <header>
                                        <div className={styles.show2}>날짜</div>
                                    </header><br />
                                    <body>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            inline
                                        />
                                    </body>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Header>공연 시간 및 잔여 좌석</Card.Header>
                                        <Card.Body>
                                        <div className={styles.show3}>
                                            {
                                                cards[showCard].timeList[monthday].map((value) => {
                                                    return (
                                                        <div>
                                                            {value.startTime}~{value.endTime}&emsp;&emsp;
                                                            {value.reservedSeat}/{value.allSeat}<br/>
                                                        </div>
                                                        );
                                                })
                                            }
                                        </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <Button className={styles.prevBtn} onClick={onClickPrevBtn}>이전</Button>
                        <Button className={styles.nextBtn} onClick={onClickNextBtn}>다음</Button>
                    </div>
                )
            }
        </div>
    );
}

export default SelectShow;