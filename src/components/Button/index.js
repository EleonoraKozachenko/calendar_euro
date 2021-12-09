import cn from "classnames";
import React from "react";
import styles from "./button.module.scss";

const Button = (props) => {
  const { text, color, size, icon, onClick, uppercase, bold, disabled } = props;
  const mainButtonStyle = cn(styles.button, {
    [styles[`button__color_${color}`]]: color,
    [styles[`button__size_${size}`]]: size,
    [styles["button__uppercase"]]: uppercase,
    [styles["button__bold"]]: bold,
    [styles["button__disabled"]]: disabled,
  });
  return (
    <button className={mainButtonStyle} onClick={onClick}>
      <img className={styles.icon} src={icon} alt="" />
      <span>{text}</span>
    </button>
  );
};

export default Button;
