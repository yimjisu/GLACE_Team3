import React, { useState, useRef, useEffect } from "react";
import styles from './reservationCheck.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {phoneCheck, pwCheck, pwSame} from '../../util/util'


const ReservationCheck = ({ 
    state, setState, showInfo
    }) => {
    
    const headfootStyle = {backgroundColor: "#FFFFFF"};//"#758BFF"};

    const onClickPrevBtn = () => {
        setState(state - 1);
    }
    
    function onClickNextBtn() {
        if (phoneCheck() && pwCheck() && pwSame()) {
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
                        
                        <table width="750">
                        <tr>
                            <td width="50" align="center">*</td>
                            <td width="150" align="left">휴대폰</td>
                            <td align="left"><input class={styles.input} id='phone' type="text" size="26" placeholder="번호만 입력(ex.01012345678)"
                                onKeyUp={phoneCheck}/>
                                &nbsp;&nbsp;&nbsp;<span class={styles.explain} id="phoneCheck"></span></td>
                        </tr>
                        <tr height="7">
                            <td colspan="3"><hr /></td>
                        </tr>
                        <tr>
                            <td align="center">*</td>
                            <td align="left">비밀번호</td>
                            <td align="left"><input class={styles.input} id='pw' type="password" size="26" onKeyUp={pwCheck}/>
                            &nbsp;&nbsp;&nbsp;<span class={styles.explain} id="pwCheck"></span></td>
                        </tr>
                        <tr height="7">
                            <td colspan="3"><hr /></td>
                        </tr>
                        <tr>
                            <td align="center">*</td>
                            <td align="left">비밀번호 확인</td>
                            <td align="left"><input class={styles.input} id='confirmPw' type="password" size="26" onKeyUp={pwSame}/>
                            &nbsp;&nbsp;&nbsp;<span class={styles.explain} id="pwSame"></span></td>
                        </tr>
                        </table>
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