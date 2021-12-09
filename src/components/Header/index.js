import React from "react";
import styles from "./header.module.scss";

const Header = (props) => {
  const { children } = props;
  return <header className={styles.header}>{children}</header>;
};

export default Header;
