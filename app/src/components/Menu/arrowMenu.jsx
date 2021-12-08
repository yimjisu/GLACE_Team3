import styles from "./menu.module.css";

const ArrowMenu = ({ name, state, index }) => {
  return (
    <>
      {index < state ? (
        <div className={`${styles.progress} ${styles.previous}`}>{name}</div>
      ) : index == state ? (
        <div className={`${styles.progress} ${styles.current}`}>{name}</div>
      ) : (
        <div className={`${styles.progress}`}>{name}</div>
      )}
    </>
  );
};

export default ArrowMenu;
