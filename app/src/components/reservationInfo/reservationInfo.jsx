import React, { useState, useEffect } from "react";
import styles from "./reservationInfo.module.css";
import { State } from "../Panel/panel";
import Button from "react-bootstrap/Button";

const ReservationInfo = ({ setState, userReservationInfo }) => {
  const [totalNum, setTotalNum] = useState(userReservationInfo.length);

  useEffect(() => {
    setTotalNum(userReservationInfo.length);
  }, [userReservationInfo]);

  const [num, setNum] = useState(0);

  const changeInfo = () => {
    document.getElementById("head_info").innerHTML = num + 1;
  };

  const onIncrease = () => {
    if (num + 1 < totalNum) {
      setNum(num + 1);
      changeInfo();
    }
  };

  const onDecrease = () => {
    if (num > 0) {
      setNum(num - 1);
      changeInfo();
    }
  };

  const onClickBtn = () => {
    setState(State.SelectShow);
  };

  const [ymd, setYmd] = useState("");
  useEffect(() => {
    const date = userReservationInfo[num].date;
    const month = date.substring(0, 2);
    const day = date.substring(3, 5);
    const year = date.substring(6);

    setYmd(year + "." + month + "." + day);
  }, [userReservationInfo, num]);

  return (
    <div className={styles.body}>
      <div className={styles.text}>
        예약 총 {totalNum}건 (<span id="head_info">{num + 1}</span>/{totalNum})
      </div>

      {num > 0 && (
        <div className={styles.leftTriangle} onClick={onDecrease}></div>
      )}
      <div className={styles.flexBox}>
        <img
          className={styles.img}
          id="img"
          style={{ height: "500px" }}
          src={userReservationInfo[num].img}
        />

        <table className={styles.table}>
          <tr>
            <td align="left">
              <div className={styles.userInfo}>
                <p>
                  <b>공연&nbsp;&nbsp;</b>
                  <span id="name">{userReservationInfo[num].title}</span>
                </p>
                <p>
                  <b>장소&nbsp;&nbsp;</b>
                  <span id="place">{userReservationInfo[num].place}</span>
                </p>
                <p>
                  <b>날짜&nbsp;&nbsp;</b>
                  <span id="date">{ymd}</span>
                </p>
                <p>
                  <b>시간&nbsp;&nbsp;</b>
                  <span id="time">{userReservationInfo[num].time}</span>
                </p>
                <p>
                  <b>좌석&nbsp;&nbsp;</b>
                  <span id="seat">
                    {userReservationInfo[num].seat.join(",")}
                  </span>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      {num < totalNum - 1 && (
        <div className={styles.rightTriangle} onClick={onIncrease}></div>
      )}
      <div>
        <Button onClick={onClickBtn}>처음으로</Button>
      </div>
    </div>
  );
};

export default ReservationInfo;
