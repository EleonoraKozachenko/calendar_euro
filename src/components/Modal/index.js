import React from "react";
import styles from "./modal.module.scss";

const Modal = (props) => {
  const { onModalClose, children } = props;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.modal__close} onClick={onModalClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="18px"
            height="18px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
