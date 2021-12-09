import React from "react";
import styles from "./cardItem.module.scss";
import iconBin from "../../../images/iconBin.png";
import Button from "../../Button";

const CardItem = (props) => {
  const { item } = props;

  return (
    <div className={styles.cardItem} key={item.value}>
      <p>{item.value}</p>
      <Button
        icon={iconBin}
        uppercase
        color="gray"
        size="sm"
        onClick={props.onDelete}
      />
    </div>
  );
};
export default CardItem;
