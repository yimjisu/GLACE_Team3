import styles from "./header.module.css";
import { State } from "../Panel/panel";

const Header = ({ setState }) => {
  const onClickLogo = () => {
    setState(State.SelectShow);
  };

  const onClickBtn = () => {
    setState(State.UserInfo);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div
          className={styles.logo2}
          onClick={() => {
            onClickLogo();
          }}
          style={{ cursor: "pointer" }}
        >
          GLACE
        </div>
        <div class={styles.line}>|</div>
        <input
          className={styles.btn}
          type="button"
          value="예약 확인하기"
          onClick={onClickBtn}
        ></input>
      </div>
    </div>
  );
};

export default Header;
