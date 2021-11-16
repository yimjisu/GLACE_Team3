import React, { useState } from "react";
import styles from "./selectShow.module.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"


const SelectShow = ({ 
    }) => {
    const cards = [
        {
            name : "연극A", place: "교양분관", period: "2021.09.01 ~ 2021.11.01", time: "100분"
        },
        {
            name : "연극B", place: "B", period: "2021.09.01 ~ 2021.11.01", time: "110분"
        },
        {
            name : "연극C", place: "C", period: "2021.09.01 ~ 2021.11.01", time: "120분"
        },
        {
            name : "연극D", place: "D", period: "2021.09.01 ~ 2021.11.01", time: "130분"
        },
        {
            name : "연극E", place: "E", period: "2021.09.01 ~ 2021.11.01", time: "140분"
        },
        {
            name : "연극F", place: "F", period: "2021.09.01 ~ 2021.11.01", time: "150분"
        }
    ];
    const footerStyle = {backgroundColor: "#3a5bff"};

    const [showCard, setShowCard] = useState(-1);
    const onClickNext = (index) => {
        setShowCard(index);
    }
    const onClickPrev = () => {
        setShowCard(-1);
    }

    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
        {
            showCard == -1 ? (
                <div>
                <Row xs={1} md={5}>
                {
                    cards.map((value, index) => {
                    return (
                        <Col>
                            <Card onClick={() => {onClickNext(index);}} style={{cursor:'pointer'}}>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Footer style={footerStyle}className={styles.show} >
                                    {value.name}<br/>장소: {value.place}<br/>기간: {value.period}
                                </Card.Footer >
                            </Card>
                        </Col>);
                    })
                }
                </Row>
                </div>
            ) : (
                <div>
                <Row xs={1} md={3}>
                <Col>
                    <div className={styles.show2}>
                        {cards[showCard].name}
                    </div><br/>
                    <Image variant="top" src="holder.js/500x500" />
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
                <button onClick={onClickPrev}>뒤로</button>
                </div>
            )
        }
        </div>
    );
}

export default SelectShow;