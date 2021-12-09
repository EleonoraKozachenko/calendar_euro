import styles from "./input.module.scss";
import React from "react";
import cn from "classnames";

const Input = (props) => {
  const {
    id,
    onChange,
    type,
    size,
    placeholder,
    minValue,
    value,
    align,
    list,
  } = props;
  const mainInputStyle = cn(styles.input, {
    [styles[`input__size_${size}`]]: size,
    [styles[`input__align_${align}`]]: align,
  });
  return (
    <div>
      <input
        list={list}
        className={mainInputStyle}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        min={minValue}
        value={value}
      />
    </div>
  );
};

export default Input;
