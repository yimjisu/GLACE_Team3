import React, { useState, useRef, useEffect } from "react";
import styles from './reservationDone.module.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import {State} from '../Panel/panel';
import axios from 'axios';


const ReservationDone = ({ 
    state, setState, selectedSeat, selectedShowInfo, userInfo
    }) => {

    const onClickBtn = () => {
        setState(State.SelectShow);
    }

    useEffect(() => {
        axios.post('/addReservationInfo', {
            params : {
                title : selectedShowInfo.title,
                date : selectedShowInfo.date,
                time : selectedShowInfo.time,
                place : selectedShowInfo.place,
                seat : selectedSeat,
                phone : userInfo.phone,
                password : userInfo.password                
            }
        })
    }, [])
    return (
        <div>
            <div className={styles.block}>
                <div>
                <Row>
                    <Col>
                        <div className={styles.text}>예약이 완료되었습니다.</div>
                        <Card className={styles.card}>
                            <Card.Img variant="top" height="600px" src={selectedShowInfo.img}/>
                        </Card>
                    </Col>

                    <Col>
                        <form className={styles.userInfo}>
                            <div>
                                <b>공연&nbsp;&nbsp;</b>{selectedShowInfo.name}<br/>
                                <b>장소&nbsp;&nbsp;</b>{selectedShowInfo.place}<br/>
                                <b>날짜&nbsp;&nbsp;</b>{selectedShowInfo.date}<br/>
                                <b>시간&nbsp;&nbsp;</b>{selectedShowInfo.time.startTime} ~ {selectedShowInfo.time.endTime}<br/>
                                <b>좌석&nbsp;&nbsp;</b>{selectedSeat.join(", ")}<br/>
                                <b>휴대폰&nbsp;&nbsp;</b>{userInfo.phone}
                            </div>
                        </form>
                    </Col>
                </Row>
                </div>

                <Button onClick={onClickBtn}>처음으로</Button>
            </div>
        </div>
    );
}

export default ReservationDone;