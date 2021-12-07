import React, { useState, useRef, useEffect } from "react";
import styles from "./reservationDone.module.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { State } from "../Panel/panel";

const ReservationDone = ({
  setState,
  selectedSeat,
  selectedShowInfo,
  userInfo,
}) => {
  const onClickBtn = () => {
    setState(State.SelectShow);
  };

  const [ymd, setYmd] = useState("");
  useEffect(() => {
    const date = selectedShowInfo.date;
    const month = date.substring(0, 2);
    const day = date.substring(3, 5);
    const year = date.substring(6);
    setYmd(year + "." + month + "." + day);
  }, [selectedShowInfo]);

  const seat = selectedSeat;

  return (
    <div>
      <div className={styles.block}>
        <div>
          <Row>
            <Col>
              <div className={styles.text}>예약이 완료되었습니다.</div>
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  height="600px"
                  src={selectedShowInfo.img}
                />
              </Card>
            </Col>

            <Col>
              <form className={styles.userInfo}>
                <div>
                  <b>공연&nbsp;&nbsp;</b>
                  {selectedShowInfo.title}
                  <br />
                  <b>장소&nbsp;&nbsp;</b>
                  {selectedShowInfo.place}
                  <br />
                  <b>날짜&nbsp;&nbsp;</b>
                  {ymd}
                  <br />
                  <b>시간&nbsp;&nbsp;</b>
                  {selectedShowInfo.time.time}
                  <br />
                  <b>좌석&nbsp;&nbsp;</b>
                  {seat.join(", ")}
                  <br />
                  <b>휴대폰&nbsp;&nbsp;</b>
                  {userInfo.phone}
                </div>
              </form>
            </Col>
          </Row>
        </div>

        <Button onClick={onClickBtn}>처음으로</Button>
      </div>
    </div>
  );
};

export default ReservationDone;
