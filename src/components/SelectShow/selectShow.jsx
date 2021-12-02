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
import { SocketContext } from '../../service/socket';
import axios from 'axios';


const SelectShow = ({
    state, setState, setShowInfo, setDateInfo
}) => {
    const socket = useContext(SocketContext);

    const headerStyle = {};//{ backgroundColor : "#FFFFFF"};
    const footerStyle = {};//{ backgroundColor : "#FFFFFF" };//#3e3e3e"};

    const [showCard, setShowCard] = useState(-1);
    const onClickNext = (index) => {
        console.log(index);
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
                                    <Card className={styles.cards} onClick={() => onClickNext(index)} style={{ cursor: 'pointer' }}>
                                        <Card.Img variant="top" height="400px" src={value.img} />
                                        <Card.Footer style={footerStyle} className={styles.show} >
                                            <b>{value.name}</b>
                                            <div className={styles.info}>
                                                장소: {value.place}<br />기간: {value.period}
                                            </div>
                                        </Card.Footer >
                                    </Card>);
                            })
                        }
                    </div>
                ) : (
                    <div className={styles.panel2}>
                        <div className = {styles.row}>
                        <div className = {styles.column}>
                            <Card className={styles.card}>
                                <Card.Header style={headerStyle}>
                                    <div className={styles.header}>
                                    {cards[showCard].name}
                                    </div>
                                </Card.Header>
                                <Card.Img className = {styles.cardImg} variant="top" height="500px" src={cards[showCard].img}/>
                                <Card.Footer style={footerStyle}>                    
                                    <div className={styles.footer}>
                                            장소 : {cards[showCard].place}<br/>
                                            기간 : {cards[showCard].period}<br/>
                                            관람 시간 : {cards[showCard].time}<br/>
                                    </div>
                                </Card.Footer >
                            </Card>                                    
                        </div>
                        <div className = {styles.border}></div>
                        <div className = {styles.column}>
                                <div className={styles.title}>날짜</div>
                                <DatePicker
                                    locale = {ko}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={Date.now()}
                                    maxDate={new Date("12-31-2021")}
                                    inline
                                />
                        </div>
                        <div className = {styles.border}></div>
                        <div className = {styles.column}>
                            <div className = {styles.title}>시간 및 좌석</div>
                            <div className={styles.show3}>
                                {
                                     cards[showCard].timeList[monthdayyear] && 
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
                        </div>
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