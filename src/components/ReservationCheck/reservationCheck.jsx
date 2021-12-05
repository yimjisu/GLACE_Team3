import React, { useState, useRef, useEffect, useContext } from "react";
import styles from './reservationCheck.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { SocketContext } from '../../service/socket';
import { phoneCheck, pwCheck, pwSame } from '../../util/util'
import axios from 'axios';

const ReservationCheck = ({
    state, setState, selectedSeat, selectedShowInfo, setUserInfo
}) => {
    const socket = useContext(SocketContext);
    const onClickPrevBtn = () => {
        setState(state - 1);
    }

    function onClickNextBtn() {
        if (!phoneCheck()) {
            alert("유효하지 않은 휴대폰 번호입니다.")
        }
        else if (!pwCheck()) {
            alert("유효하지 않은 비밀번호입니다.")
        }
        else if (!pwSame()) {
            alert("비밀번호가 일치하지 않습니다.")
        }
        else {
            const pw = document.getElementById('pw').value;
            const phone = document.getElementById('phone').value;
            var data = { phone: phone, password: pw };
            setState(state + 1);
            setUserInfo({
                pw: pw,
                phone: phone
            })

            axios.post('/reservation', {
                title: selectedShowInfo.title,
                date: selectedShowInfo.date,
                time: selectedShowInfo.time.time,
                place: selectedShowInfo.place,
                img: selectedShowInfo.img,
                seat: selectedSeat,
                phone: phone,
                password: pw
            })

            
            for (let i=0; i<selectedSeat; i++) {
                const seat = selectedSeat[i];
                axios.post('/seat/'+seat, {
                    title : selectedShowInfo.title,
                    date: selectedShowInfo.date,
                    time: selectedShowInfo.time.time,
                    seat: seat,
                    type: "Reserved"
                })
            }

        }
    }

    const [ymd, setYmd] = useState('');
    useEffect(() => {
        const date = selectedShowInfo.date;
        const month = date.substring(0, 2);
        const day = date.substring(3, 5);
        const year = date.substring(6);

        setYmd(year+'.'+month+'.'+day);

    }, [selectedShowInfo])


    return (
        <div>
            <div className={styles.flex}>
                <div className={styles.card}>
                    <Card>
                        <Card.Header>
                            <div className={styles.header}>
                                {selectedShowInfo.title}
                            </div>
                        </Card.Header>
                        <Card.Img variant="top" height="500px" src={selectedShowInfo.img} />
                        <Card.Footer>
                            <div className={styles.footer}>
                                장소: {selectedShowInfo.place}<br />
                                날짜: {ymd}<br />
                                시간:{selectedShowInfo.time.time}<br />
                                좌석: {selectedSeat.join(", ")}
                            </div>
                        </Card.Footer >
                    </Card>
                </div>
                <div className={styles.login}>
                    <form className={styles.userInfo}>
                        <div className={styles.title}>비회원 로그인</div><br />

                        <table>
                            <tr>
                                <td width="50" align="center">*</td>
                                <td width="150" align="left">휴대폰</td>
                                <td align="left"><input className={styles.input} id='phone' type="text" size="26" placeholder="번호만 입력(ex.01012345678)"
                                    onKeyUp={phoneCheck} />
                                    &nbsp;&nbsp;&nbsp;<span className={styles.explain} id="phoneCheck"></span></td>
                            </tr>
                            <tr height="7">
                                <td colspan="3"><hr /></td>
                            </tr>
                            <tr>
                                <td align="center">*</td>
                                <td align="left">비밀번호</td>
                                <td align="left"><input className={styles.input} id='pw' type="password" size="26" onKeyUp={pwCheck} />
                                    &nbsp;&nbsp;&nbsp;<span className={styles.explain} id="pwCheck"></span></td>
                            </tr>
                            <tr height="7">
                                <td colspan="3"><hr /></td>
                            </tr>
                            <tr>
                                <td align="center">*</td>
                                <td align="left">비밀번호 확인</td>
                                <td align="left"><input className={styles.input} id='confirmPw' type="password" size="26" onKeyUp={pwSame} />
                                    &nbsp;&nbsp;&nbsp;<span className={styles.explain} id="pwSame"></span></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <div>
                <Button className={styles.prevBtn} onClick={onClickPrevBtn}>이전</Button>
                <Button className={styles.nextBtn} onClick={onClickNextBtn}>완료</Button>
            </div>
        </div>
    );
}

export default ReservationCheck;