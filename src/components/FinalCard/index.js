import React from "react";
import styles from "./finalCard.module.scss";
import FlagIcon from "../FlagIcon";

const FinalCard = (props) => {
  const { match } = props;
  return (
    <div className={styles.card}>
      <div className={styles.card__wrap}>
        <p className={styles.card__team}>
          <FlagIcon code={match.team1.code} className={styles.card__icon} />
          <span>{match.team1.name}</span>
        </p>
        <span>{match.score1}</span>
      </div>
      <div className={styles.card__wrap}>
        <p className={styles.card__team}>
          <FlagIcon code={match.team2.code} className={styles.card__icon} />
          <span>{match.team2.name}</span>
        </p>
        <span>{match.score2}</span>
      </div>
    </div>
  );
};
export default FinalCard;
