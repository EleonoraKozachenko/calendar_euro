import React from "react";
import styles from "./card.module.scss";
import cn from "classnames";

const Card = (props) => {
  const { type, group, children } = props;
  const mainStyle = cn(styles.card, {
    [styles[`card__type_${type}`]]: type,
  });
  return (
    <div className={mainStyle}>
      <p className={styles.card__title}>{group}</p>
      {children}
    </div>
  );
};
export default Card;
