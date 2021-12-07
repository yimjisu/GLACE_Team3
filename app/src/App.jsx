import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";

import Header from "./components/Header/header";
import Menu from "./components/Menu/menu";
import Panel from "./components/Panel/panel";

import { SocketContext, socket } from "./service/socket";

function App() {
  const [state, setState] = useState(0);

  return (
    <SocketContext.Provider value={socket}>
      <div className={styles.App}>
        <Header state={state} setState={setState} />
        <Menu state={state} />
        <Panel state={state} setState={setState} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;