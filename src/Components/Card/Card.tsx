import styles from "./Card.module.css";
import { CardItem } from "../../types";
import { Card } from "../../types";

import Item from "../CardItem/Item";
interface CardProps {
  header: string;
  items: CardItem[];
  boards: Card;
}
export default function CardWrapper({ header, items, boards }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{header}</div>
      <div>
        {items.map((item) => {
          return <Item item={item} key={item.id} boards={boards} />;
        })}
      </div>
    </div>
  );
}
