import React, { useState, useEffect, useContext } from "react";
import styles from "./selectShow.module.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import cards from "../data/showInfo";
import { SocketContext } from "../../service/socket";
import axios from "axios";

const SelectShow = ({ state, setState, setShowInfo, setSelectedShowInfo }) => {
  const socket = useContext(SocketContext);
  const [showCard, setShowCard] = useState(-1);
  const onClickNext = (index) => {
    setShowCard(index);
  };
  const onClickPrevBtn = () => {
    setShowCard(-1);
  };
  function onClickNextBtn() {
    if (selectedIndex == null) {
      alert("시간 및 좌석을 선택해야합니다.");
    } else {
      setState(state + 1);
      setShowInfo(cards[showCard]);
    }
  }
  const [timeList, setTimeList] = useState([]);
  useEffect(() => {
    if (showCard == -1) return;
    axios.get("/show/" + cards[showCard].title).then((response) => {
      const data = response.data;
      setTimeList(data);
    });
  }, [showCard]);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios.get("/shows").then((response) => {
      setCards(response.data);
    });
  }, []);

  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [monthdayyear, setMonthdayyear] = useState(null);

  const date_format = (date) => {
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7));
    const day = parseInt(date.substring(8));
    return new Date(year, month - 1, day);
  };
  useEffect(() => {
    let month = startDate.getMonth() + 1;
    let day = startDate.getDate();
    const year = startDate.getFullYear();

    if (month < 10) {
      month = "0" + month.toString();
    }
    if (day < 10) {
      day = "0" + day.toString();
    }
    setMonthdayyear(month + "-" + day + "-" + year);
  }, [startDate]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const onSelected = (index) => {
    const showInfo = cards[showCard];
    let temp = {
      title: showInfo.title,
      place: showInfo.place,
      img: showInfo.img,
      date: monthdayyear,
      time: timeList[monthdayyear][index],
    };
    setSelectedShowInfo(temp);
    setSelectedIndex(index);
  };

  return (
    <div className={styles.panelWindow}>
      {showCard == -1 ? (
        <div className={styles.cardDiv}>
          {cards.map((value, index) => {
            return (
              <Card
                className={styles.cards}
                onClick={() => onClickNext(index)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img variant="top" height="400px" src={value.img} />
                <Card.Footer className={styles.show}>
                  <b>{value.title}</b>
                  <div className={styles.info}>
                    장소: {value.place}
                    <br />
                    기간: {value.startDate}~{value.endDate}
                  </div>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className={styles.panel2}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Card className={styles.card}>
                <Card.Header>
                  <div className={styles.header}>{cards[showCard].title}</div>
                </Card.Header>
                <Card.Img
                  className={styles.cardImg}
                  variant="top"
                  height="500px"
                  src={cards[showCard].img}
                />
                <Card.Footer>
                  <div className={styles.footer}>
                    장소 : {cards[showCard].place}
                    <br />
                    기간 : {cards[showCard].startDate} ~{" "}
                    {cards[showCard].endDate}
                    <br />
                    관람 시간 : {cards[showCard].runTime}분<br />
                  </div>
                </Card.Footer>
              </Card>
            </div>
            <div className={styles.border}></div>
            <div className={styles.column}>
              <div className={styles.title}>날짜</div>
              <DatePicker
                locale={ko}
                selected={startDate}
                onChange={(date) => {
                  setSelectedIndex(null);
                  setStartDate(date);
                }}
                minDate={new Date(Date.now())}
                maxDate={date_format(cards[showCard].endDate)}
                inline
              />
            </div>
            <div className={styles.border}></div>
            <div className={styles.column}>
              <div className={styles.title}>시간 및 좌석</div>
              <div className={styles.show3}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>공연 시간</th>
                      <th>잔여 좌석/전체 좌석</th>
                    </tr>
                  </thead>
                  {timeList[monthdayyear] &&
                    timeList[monthdayyear].map((value, index) => {
                      return (
                        <tbody
                          className={styles.tablebody}
                          onClick={() => onSelected(index)}
                        >
                          {index == selectedIndex ? (
                            <tr style={{ backgroundColor: "royalblue" }}>
                              <th style={{ color: "white" }}>{value.time}</th>
                              <th style={{ color: "white" }}>
                                {cards[showCard].totalSeatNumber -
                                  value.reservedSeat}
                                /{cards[showCard].totalSeatNumber}
                              </th>
                            </tr>
                          ) : (
                            <tr>
                              <th>{value.time}</th>
                              <th>
                                {cards[showCard].totalSeatNumber -
                                  value.reservedSeat}
                                /{cards[showCard].totalSeatNumber}
                              </th>
                            </tr>
                          )}
                        </tbody>
                      );
                    })}
                </Table>
              </div>
            </div>
          </div>
          <Button className={styles.prevBtn} onClick={onClickPrevBtn}>
            이전
          </Button>
          <Button className={styles.nextBtn} onClick={onClickNextBtn}>
            다음
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectShow;
