import React, { useState, useEffect, useContext } from "react";
import styles from "./selectShow.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";
import Table from 'react-bootstrap/Table'
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

    const monthdayyear = startDate.getMonth()+1 + "-" + startDate.getDate() + "-" + startDate.getFullYear();
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
                                            locale = {ko}
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            minDate={new Date()}
                                            maxDate={new Date("11-29-2021")}
                                            inline
                                        />
                                    </body>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Header>시간 및 좌석</Card.Header>
                                        <Card.Body>
                                        <div className={styles.show3}>
                                            {
                                                cards[showCard].timeList[monthdayyear].map((value) => {
                                                    return (
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>공연 시간</th>
                                                                    <th>잔여 좌석/전체 좌석</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th>{value.startTime}~{value.endTime}</th>
                                                                    <th>{value.reservedSeat}/{value.allSeat}</th>
                                                                </tr>
                                                            </tbody>                                   
                                                        </Table>
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