import logo from './logo.svg';
import React, { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";

import Header from './components/Header/header';
import Menu from './components/Menu/menu';
import Panel from './components/Panel/panel';

function App() {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    console.log(state);
  },[state]);


  return (
    <div className={styles.App}>
      <Header/>
      <Menu 
        state={state}
        setState={setState}/>
      <Panel 
        state={state}
        setState={setState}/>
    </div>
  );
}

export default App;
