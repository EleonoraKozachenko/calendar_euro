import styles from "./input.module.scss";
import React from "react";

const Input = (props) => {
  return (
    <div>
      <input
        type={props.type}
        min={props.min}
        className={styles.input}
        placeholder={props.placeholder}
        id={props.id}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
    </div>
  );
};

export default Input;
