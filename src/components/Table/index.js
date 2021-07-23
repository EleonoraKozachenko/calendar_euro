import React from "react";
import styles from "./table.module.scss";

const Table = (props) => {
  const { group, children } = props;
  return (
    <div className={styles.table}>
      <div className={styles.table__title}>
        <p>{group.name}</p>
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
