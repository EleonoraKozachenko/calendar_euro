import React from "react";
import styles from "./table.module.scss";
import cn from "classnames";

const Table = (props) => {
  const { group, children, empty } = props;

  const mainStyleTable = cn(styles.table, {
    [styles["table__empty"]]: empty,
  });

  return (
    <div className={mainStyleTable}>
      <div className={styles.table__title}>
        <p>{`Группа ${group.name}`}</p>
      </div>
      <div
        className={styles.table__head}
        style={{
          gridTemplateColumns: `20px 200px repeat(${group.teams.length}, 2fr) repeat(7, 1fr)`,
        }}
      >
        <div className={styles.table__column}></div>
        <div className={styles.table__column}>
          <p>Команда</p>
        </div>
        {group.teams.map((team, index) => (
          <div key={team.id} className={styles.table__column}>
            <p>{index + 1}</p>
          </div>
        ))}
        <div className={styles.table__column}>
          <p>И</p>
        </div>
        <div className={styles.table__column}>
          <p>В</p>
        </div>
        <div className={styles.table__column}>
          <p>Н</p>
        </div>
        <div className={styles.table__column}>
          <p>П</p>
        </div>
        <div className={styles.table__column}>
          <p>ЗБ</p>
        </div>
        <div className={styles.table__column}>
          <p>ПР</p>
        </div>
        <div className={styles.table__column}>
          <p>О</p>
        </div>
      </div>
      <div className={styles.table__body}>{children}</div>
    </div>
  );
};

export default Table;
