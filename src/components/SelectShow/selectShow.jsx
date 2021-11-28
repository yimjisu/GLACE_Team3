import React, { useState, useEffect, useContext } from "react";
import styles from "./selectShow.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";
import cards from '../data/showInfo';
//import db from "../../service/firebase";


import { SocketContext } from '../../service/socket';

const SelectShow = ({
    state, setState, setShowInfo
}) => {

    const socket = useContext(SocketContext);

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