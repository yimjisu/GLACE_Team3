import React, { useState, useRef, useEffect } from "react";
import styles from './reservationCheck.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {checkPwd, checkPhoneNumber} from '../../util'


const ReservationCheck = ({ 
    state, setState, showInfo
    }) => {
    
    const headfootStyle = {backgroundColor: "#FFFFFF"};//"#758BFF"};

    const [phoneNumber, setPhoneNumber] = useState('');
    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const [pwd, setPwd] = useState('');
    const onChangePwd = (e) => {
        setPwd(e.target.value);
    }

    const [confirmPwd, setConfirmPwd] = useState('');
    const onChangeConfirmPwd = (e) => {
        setConfirmPwd(e.target.value);
    }

    const onClickPrevBtn = () => {
        setState(state - 1);
    }
    
    function onClickNextBtn() {
        if (checkPhoneNumber(phoneNumber) && checkPwd(pwd, confirmPwd)) {
            setState(state + 1);
        }
    }

    return (
        <div>
            <div>
            <Row>
                <Col xs={5}>
                    <Card className={styles.card}>
                        <Card.Header style={headfootStyle}>
                            <div className={styles.header}>
                            {showInfo.name}
                            </div>
                        </Card.Header>
                        <Card.Img className = {styles.cardImg} variant="top" height="500px" src={showInfo.img}/>
                        <Card.Footer style={headfootStyle}>                    
                            <div className={styles.footer}>
                                장소: {showInfo.place}<br/>
                                날짜: 2021.11.17(수)<br/>
                                시간: 20:00<br/>
                                좌석: C1, C2
                            </div>
                        </Card.Footer >
                    </Card>
                </Col>

                <Col xs={5}>
                    <form className={styles.userInfo}>
                        <div className={styles.title}>비회원 로그인</div><br/>
                        
                        <div className={styles.text}>
                        <b>휴대폰&nbsp;&nbsp;&nbsp;</b>
                        <input type='text' placeholder="- 없이 숫자만 입력" onChange={onChangePhoneNumber} value={phoneNumber}/>
                        </div>
                        
                        <div className={styles.text}>
                        <b>비밀번호&nbsp;&nbsp;&nbsp;&nbsp;</b>
                        <input type='password' onChange={onChangePwd} value={pwd}/>
                        </div>

                        <div className={styles.text}>
                        <b>비밀번호 확인&nbsp;&nbsp;&nbsp;</b>
                        <input type='password' onChange={onChangeConfirmPwd} value={confirmPwd}/>
                        </div>
                    </form>
                </Col>
            </Row>
            </div>

            <Button className = {styles.prevBtn} onClick={onClickPrevBtn}>이전</Button>
            <Button className = {styles.nextBtn} onClick={onClickNextBtn}>완료</Button>
        </div>
    );
}

export default ReservationCheck;