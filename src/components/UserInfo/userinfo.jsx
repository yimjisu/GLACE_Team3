import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from './userinfo.module.css';
import Button from 'react-bootstrap/Button';
import {State} from '../Panel/panel';
import axios from 'axios';

const UserInfo = ({
    setState, setUserReservationInfo
    }) => {

    const onClickBtn = () => {
        const pw = document.getElementById('pw').value;
        const phone = document.getElementById('phone').value;
        axios.get('/user/reservation?phone='+phone+'&password='+pw).then(
            (response) => {
                const data = response.data;
                setUserReservationInfo(data);
                setState(State.ReservationInfo);
            }
        ).catch(
            err => {
                console.log(err);
                alert('존재하지 않는 사용자입니다.')
            }
        );

    }

    return (
        <div>
            <form className={styles.userInfo}>
                <div className={styles.title}>비회원 로그인</div><br/>
                
                <table width="500">
                <tr>
                    <td width="50" align="center">*</td>
                    <td width="150" align="left">휴대폰</td>
                    <td align="left"><input className={styles.input} id='phone' type="text" size="26" placeholder="번호만 입력(ex.01012345678)"/></td>
                </tr>
                <tr height="7">
                    <td colspan="3"><hr /></td>
                </tr>
                <tr>
                    <td align="center">*</td>
                    <td align="left">비밀번호</td>
                    <td align="left"><input className={styles.input} id='pw' type="password" size="26"/></td>
                </tr>
                </table>

                <Button className = {styles.btn} onClick={onClickBtn}>예약 확인</Button>
            </form>
        </div>
    );
}

export default UserInfo;