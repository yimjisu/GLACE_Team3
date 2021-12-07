import React, { useState, useContext, useEffect } from "react";
import Canvas from "./SeatLayout/canvas";
import styles from "./selectSeat.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { SocketContext } from "../../service/socket";

const SelectSeat = ({
  state,
  setState,
  selectedSeat,
  setSelectedSeat,
  selectedShowInfo,
}) => {
  const socket = useContext(SocketContext);
  const [peopleNum, setPeopleNum] = useState(0);

  const onClickPrevBtn = () => {
    setState(state - 1);
  };
  const onClickNextBtn = () => {
    if (selectedSeat.length == 0) {
      alert("좌석을 선택해주세요");
    } else if (selectedSeat.length == peopleNum) {
      setState(state + 1);
    } else {
      alert("선택한 인원수보다 좌석수가 적습니다");
    }
  };

  const increment = async () => {
    setPeopleNum(peopleNum + 1);
  };

  const decrement = async () => {
    if (selectedSeat.length > 0 && peopleNum <= selectedSeat.length) {
      alert("선택한 좌석수가 인원수보다 많습니다");
    } else if (peopleNum > 0) {
      setPeopleNum(peopleNum - 1);
    }
  };

  const [seatReservationInfo, setSeatReservationInfo] = useState([]);
  const [seatInfo, setSeatInfo] = useState(null);

  useEffect(() => {
    axios
      .get("/seatInfo", {
        params: {
          title: selectedShowInfo.title,
          date: selectedShowInfo.date,
          time: selectedShowInfo.time.time,
        },
      })
      .then((response) => {
        const data = response.data;
        setSeatInfo(data.jsonFile);
        setSeatReservationInfo(data.progress.concat(data.reserved));
      });
  }, [selectedShowInfo]);

  useEffect(() => {
    setSelectedSeat([]);
    socket.emit("seatChange", selectedShowInfo);
    socket.on("seatChanged", function (data) {
      setSeatReservationInfo(Object.keys(data));
    });
  }, []);

  useEffect(() => {
    let eraseSeats = [];
    for (let i = 0; i < selectedSeat.length; i++) {
      const seat = selectedSeat[i];
      if (!seatReservationInfo.includes(seat)) {
        eraseSeats.push(seat);
      }
    }
    if (eraseSeats.length > 0) {
      setSelectedSeat(
        selectedSeat.filter((item) => !eraseSeats.includes(item))
      );
    }
  }, [seatReservationInfo, selectedSeat]);

  return (
    <div>
      <div className={styles.seat}>
        <div className={styles.panelWindow}>
          {selectedShowInfo && (
            <div className={styles.seatInfo}>
              <img src={selectedShowInfo.img} />
              <div className={styles.text}>
                <b>{selectedShowInfo.title}</b>
                <div className={styles.info}>
                  <p>장소: {selectedShowInfo.place}</p>
                  <p>날짜: {selectedShowInfo.date}</p>
                  <p>시간: {selectedShowInfo.time.time}</p>
                </div>
              </div>
            </div>
          )}
          <div className={styles.peopleNum}>
            <p className={styles.name}>인원수</p>
            <div className={styles.inputNumber}>
              <div className={styles.btn} type="button" onClick={decrement}>
                &minus;{" "}
              </div>
              <span>{peopleNum}</span>
              <div className={styles.btn} type="button" onClick={increment}>
                &#43;
              </div>
            </div>
          </div>
        </div>
        {seatInfo && (
          <Canvas
            className={styles.seatLayout}
            selectedShowInfo={selectedShowInfo}
            seatInfo={seatInfo}
            seatReservationInfo={seatReservationInfo}
            setSeatReservationInfo={setSeatReservationInfo}
            peopleNum={peopleNum}
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
          />
        )}
      </div>
      <Button className={styles.prevBtn} onClick={onClickPrevBtn}>
        이전
      </Button>
      <Button className={styles.nextBtn} onClick={onClickNextBtn}>
        다음
      </Button>
    </div>
  );
};

export default SelectSeat;
