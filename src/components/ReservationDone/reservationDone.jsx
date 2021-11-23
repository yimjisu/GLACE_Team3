import React, { useState, useRef, useEffect } from "react";
import styles from './reservationDone.module.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';


const ReservationDone = ({ 
    state, setState, showInfo
    }) => {

    return (
        <div>
            <Row>
                <Col xs={3}>
                    <div className={styles.text}>예약이 완료되었습니다.</div>
                    <Card className={styles.card}>
                        <Card.Img variant="top" height="600px" src={showInfo.img}/>
                    </Card>
                </Col>

                <Col xs={7}>
                    <form className={styles.userInfo}>
                        <div>
                            <b>예약번호&nbsp;&nbsp;</b>서버에서 get<br/><br/>
                            <b>공연&nbsp;&nbsp;</b>{showInfo.name}<br/>
                            <b>장소&nbsp;&nbsp;</b>{showInfo.place}<br/>
                            <b>날짜&nbsp;&nbsp;</b>2021.11.17(수)<br/>
                            <b>시간&nbsp;&nbsp;</b>20:00<br/>
                            <b>좌석&nbsp;&nbsp;</b>C1, C2
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default ReservationDone;