import React, { useState, useRef, useEffect } from "react";
import styles from './reservationDone.module.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import {State} from '../Panel/panel'


const ReservationDone = ({ 
    state, setState, showInfo
    }) => {

    const onClickBtn = () => {
        setState(State.SelectShow);
    }

    return (
        <div>
            <div className={styles.block}>
                <div>
                <Row>
                    <Col>
                        <div className={styles.text}>예약이 완료되었습니다.</div>
                        <Card className={styles.card}>
                            <Card.Img variant="top" height="600px" src={showInfo.img}/>
                        </Card>
                    </Col>

                    <Col>
                        <form className={styles.userInfo}>
                            <div>
                                <b>공연&nbsp;&nbsp;</b>{showInfo.name}<br/>
                                <b>장소&nbsp;&nbsp;</b>{showInfo.place}<br/>
                                <b>날짜&nbsp;&nbsp;</b>2021.11.17(수)<br/>
                                <b>시간&nbsp;&nbsp;</b>20:00<br/>
                                <b>좌석&nbsp;&nbsp;</b>C1, C2<br/>
                                <b>휴대폰&nbsp;&nbsp;</b>010-1234-5678
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