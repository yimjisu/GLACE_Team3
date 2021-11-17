import { useState } from 'react';
import styles from './userinfo';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const UserInfo = () => {
    // const auth = getAuth();
    return (
        <div>
        <div>예약 확인하기</div>
        <div>휴대폰</div>
        <div>비밀번호</div>
        </div>
    );
}

export default UserInfo;