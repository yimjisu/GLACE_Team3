import {useEffect, useState} from 'react';
import styles from './selectSeat.module.css';

const InputNumber = ({index, num, setNum, name}) => {
    const max = 10;
    const min = 0;
    const [value, setValue] = useState(num[index]);
    
    const increment = () => {
      if (value >= max) return;
      let tempNum = num;
      tempNum[index] = value + 1;
      
      setNum(tempNum);
      setValue(value + 1);
    }
  
    const decrement = () => {
      if (value <= min) return;
      let tempNum = num;
      tempNum[index] = value - 1;
      
      setNum(tempNum);
      setValue(value - 1);
    }

    return (
        <>
        <p className = {styles.name}>{name[index]}</p>
        <div className={styles.inputNumber}>
          <div
            className = {styles.btn}
            type="button" onClick={decrement}>
              &minus; </div>
          <span>{value}</span>
          <div 
            className = {styles.btn}
            type="button" onClick={increment}>
               &#43;</div>     
        </div>
        </>
      )
  }

  export default InputNumber;