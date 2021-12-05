import { useRef, useEffect, useState } from 'react';
import {Point} from './point';
import {Seat} from './seat';
import axios from 'axios';

const useCanvas = ({selectedShowInfo, seatInfo, seatReservationInfo, setSeatReservationInfo, peopleNum, selectedSeat, setSelectedSeat}) => {
  const canvasRef = useRef(null);
  const width = seatInfo.map.size.width;
  const height = seatInfo.map.size.height;
  const backgroundColor = seatInfo.map.background;
  
  const [allSeats, setAllSeats] = useState([]);
  
  let offsetY = 180;
  var offsetX;

function resize(canvas, ctx) {
    offsetY = canvas.offsetTop;
    offsetX = canvas.offsetLeft;

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio:ratio=1 } = window;
      const context = canvas.getContext('2d');
      canvas.width = width*ratio;
      canvas.height = height*ratio;
      context.scale(ratio, ratio);
      return true;
    }
    return false;
}

let scale = 1;

function animate(ctx) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.scale(scale, scale);

  let tempSeatReservationInfo = seatReservationInfo;
    for(let i=0; i<allSeats.length; i++) {
      let reserved = false;
      for(let j=0; j< tempSeatReservationInfo.length; j++) {
        const name = tempSeatReservationInfo[j];
        if (name == allSeats[i].seatName) {
          allSeats[i].reserved(true);
          tempSeatReservationInfo = tempSeatReservationInfo.filter((item) => item != name)
          reserved = true;
          break;
        }
      }
      if (!reserved) {
        allSeats[i].reserved(false);
      }
    }


  for(let i=0; i<allSeats.length; i++) {
    allSeats[i].animate(ctx);
  }
  setAllSeats(allSeats);
}

  function onDown(e) {
    let mousePos = new Point();
    mousePos.x = e.clientX - offsetX;
    mousePos.y = e.clientY - offsetY;

    for(let i=0; i<allSeats.length; i++) {
      allSeats[i].down(mousePos.clone());
    }
    setAllSeats(allSeats);
  }

  function onMove(e) {
    let mousePos = new Point();
    mousePos.x = e.clientX - offsetX;
    mousePos.y = e.clientY - offsetY;

    for(let i=0; i<allSeats.length; i++) {
      allSeats[i].move(mousePos.clone());
    }
    setAllSeats(allSeats);
  }

  const onUp = async (e) => {
    let mousePos = new Point();
    mousePos.x = e.clientX - offsetX;
    mousePos.y = e.clientY - offsetY;
    let newSelectedSeat = selectedSeat;

    for(let i=0; i<allSeats.length; i++) {
      let seat = allSeats[i].up(mousePos.clone());
      if(seat != null) {
        if (seat.isSelected) {
          try {
            const response = await axios.post('/seat/'+seat.seatName, {
              title : selectedShowInfo.title,
              date : selectedShowInfo.date,
              time : selectedShowInfo.time.time,
              type : "Cancel"
            });
            const data = response.data;
            seat.reserved(false);
            seat.select(false);

            let newSeatReservationInfo = seatReservationInfo.filter((item) => item != seat.seatName);
            setSeatReservationInfo(newSeatReservationInfo);
            newSelectedSeat = newSelectedSeat.filter((item) => item != seat.seatName);
            setSelectedSeat(newSelectedSeat);
          } catch(err) {
            seat.reserved(true);
            seat.select(false);
            alert("이미 선점된 좌석입니다")
          }
        } else {
          if (selectedSeat.length >= peopleNum) {
            seat.select(false);
            alert("선택한 좌석수가 인원수보다 많습니다");
          } else {
            try {
              const response = await axios.post('/seat/'+seat.seatName, {
                title : selectedShowInfo.title,
                date : selectedShowInfo.date,
                time : selectedShowInfo.time.time,
                type : "Progress"
              });
                seat.select(true);
                newSelectedSeat.push(seat.seatName);
                setSelectedSeat(newSelectedSeat);
            } catch(err) {
              seat.select(false);
              seat.reserved(true);
              let temp = seatReservationInfo;
              if (! temp.includes(seat.seatName)) {
                temp.push(seat.seatName);
              }
              setSeatReservationInfo(temp);
              alert("이미 선점된 좌석입니다");
            }
          }
        }
      }
    }
  }

  
  useEffect(() => {
    console.log(selectedSeat);
  }, [selectedSeat, peopleNum]);

  function onWheel(e) {
    const deltaPos = new Point(e.deltaX, e.deltaY);
    for(let i=0; i<allSeats.length; i++) {
      allSeats[i].zoom(deltaPos);
    }
    setAllSeats(allSeats);
  }

  const [canvas, setCanvas] = useState(canvasRef.current);
  const [context, setContext] = useState(null);

  useEffect(() => {
    let canvasTemp = canvasRef.current;
    setCanvas(canvasTemp);
    setContext(canvasTemp.getContext('2d'));
    const seats = Object.values(seatInfo.seats);
    seats.sort(function(a, b) {
      if (a.rectangles[0].lefttop.y < b.rectangles[0].lefttop.y) {
        return -1;
      } else if (a.rectangles[0].lefttop.y > b.rectangles[0].lefttop.y) {
        return 1;
      }
      if (a.rectangles[0].lefttop.x < b.rectangles[0].lefttop.x) {
        return -1;
      } else if (a.rectangles[0].lefttop.x > b.rectangles[0].lefttop.x) {
        return 1;
      } 
      return 0;
    })
    
    for (var i=0; i<seats.length; i++){
        const rectangles = Object.values(seats[i].rectangles);
        rectangles.sort(function(a, b) {
          if (a.lefttop.y < b.lefttop.y) {
            return -1;
          } else if (a.lefttop.y > b.lefttop.y) {
            return 1;
          }
          if (a.lefttop.x < b.lefttop.x) {
            return -1;
          } else if (a.lefttop.x > b.lefttop.x) {
            return 1;
          } 
          return 0;
        })
        for (var x = 0; x < rectangles.length; x++){
          let s = rectangles[x];
          let charName = String.fromCharCode(i+65) + String(x);
          let singleSeat = new Seat(s.lefttop, s.size, seats[i].color, charName);
          allSeats.push(singleSeat);
        }
    }

    for(let i=0; i<allSeats.length; i++) {
        allSeats[i].reserved(false);
    }

    setAllSeats(allSeats);
  }, [seatInfo])

  useEffect(() => {
    if (canvas == null || context == null) return;

    let animationFrameId;
    resize(canvas, context);
    const render = () => {
      offsetX = canvas.offsetLeft;
      offsetY = canvas.offsetTop;
      animationFrameId = window.requestAnimationFrame(render);
      animate(context);
      
      canvas.addEventListener("resize", () => resize(canvas, context));
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("wheel", onWheel);
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener("resize", () => resize(canvas, context));
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("wheel", onWheel);
    }

  }, [peopleNum, allSeats, canvas, context, selectedSeat, seatReservationInfo, seatInfo]);
  
  return canvasRef
}

export default useCanvas