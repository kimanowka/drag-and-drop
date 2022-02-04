import React, { useContext } from "react";
import { Card, CardItem } from "../../types";
import { Context } from "../../Context";
import "./Item.css";
interface ItemProps {
  item: CardItem;
  boards: Card;
}
export default function Item({ item, boards }: ItemProps): JSX.Element {
  const { handleDragStart, handleDragEnd } = useContext(Context);

  return (
    <div
      className={item.name}
      draggable={true}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        handleDragStart(e, item, boards)
      }
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => handleDragEnd(e)}
    ></div>
  );
}
