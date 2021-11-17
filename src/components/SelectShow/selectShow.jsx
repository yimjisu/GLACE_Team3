import React, { useState } from "react";
import styles from "./selectShow.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";
import poster1 from '../images/poster1.jpg';
import poster2 from '../images/poster2.jpg';
import poster3 from '../images/poster3.jpg';


const SelectShow = ({ 
    state, setState,setShowInfo
    }) => {
    const cards = [
        {
            name : "보통날의 기적", place: "교양분관", period: "2021.09.01 ~ 2021.11.01", time: "100분", img: poster1
        },
        {
            name : "한여름 밤의 꿈", place: "B", period: "2021.09.01 ~ 2021.11.01", time: "110분", img: poster2
        },
        {
            name : "방방콘", place: "C", period: "2021.09.01 ~ 2021.11.01", time: "120분", img: poster3
        },
        {
            name : "연극D", place: "D", period: "2021.09.01 ~ 2021.11.01", time: "130분", img: poster1
        },
        {
            name : "연극E", place: "E", period: "2021.09.01 ~ 2021.11.01", time: "140분", img: poster2
        },
        {
            name : "연극F", place: "F", period: "2021.09.01 ~ 2021.11.01", time: "150분", img: poster3
        }
    ];
    const footerStyle = {backgroundColor: "#758BFF"};
    
    const [showCard, setShowCard] = useState(-1);
    const onClickNext = (index) => {
        setShowCard(index);
    }
    const onClickPrevBtn = () => {
        setShowCard(-1);
    }
    const onClickNextBtn = () => {
        setState(state + 1);
        setShowInfo(cards[showCard]);
    }

    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className = {styles.panelWindow}>
        {
            showCard == -1 ? (
                <div>
                <Row xs={1} md={5}>
                {
                    cards.map((value, index) => {
                    return (
                        <Col>
                            <Card onClick={() => {onClickNext(index);}} style={{cursor:'pointer'}}>
                                <Card.Img variant="top" height="400px" src={value.img} />
                                <Card.Footer style={footerStyle} className={styles.show} >
                                    <b>{value.name}</b> 
                                    <div className={styles.info}>
                                        <br/>장소: {value.place}<br/>기간: {value.period}
                                    </div>
                                </Card.Footer >
                            </Card>
                        </Col>);
                    })
                }
                </Row>
                </div>
            ) : (
                <div className = {styles.panel2}>
                <div>
                <Row xs={1} md={3}>
                <Col>
                    <div className={styles.show2}>
                        {cards[showCard].name}
                    </div><br/>
                    <Image variant="top" src={cards[showCard].img} width="300px" />
                    <br/><br/>
                    <div className={styles.show2}>
                        장소: {cards[showCard].place}
                    </div><br/>
                    <div className={styles.show2}>
                        기간: {cards[showCard].period}
                    </div><br/>
                    <div className={styles.show2}>
                        관람시간: {cards[showCard].time}
                    </div>
                </Col>
                <Col>
                    <header>
                        <div className={styles.show2}>날짜</div>
                    </header><br/>
                    <body>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
                    </body>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>시간</Card.Header>
                        <Card.Body>
                            정리
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
                </div>
                <Button className = {styles.prevBtn} onClick={onClickPrevBtn}>이전</Button>
                <Button className = {styles.nextBtn} onClick={onClickNextBtn}>다음</Button>
                </div>
            )
        }
        </div>
    );
}

export default SelectShow;