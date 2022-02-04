import React, { useCallback, useState } from "react";
import { State } from "./State";
import { Card, CardItem } from "./types";
interface ContextProviderProps {
  children: React.ReactNode;
}
interface ContextProps {
  state: Card[];
  setState: React.Dispatch<React.SetStateAction<Card[]>>;
  currentItem: CardItem;
  setCurrentItem: React.Dispatch<React.SetStateAction<CardItem>>;
  currentBoard: Card | null | undefined;
  setCurrentBoard: React.Dispatch<
    React.SetStateAction<Card | null | undefined>
  >;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    item: CardItem,
    boards: Card
  ) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}
export const Context = React.createContext<ContextProps>({
  state: State,
  setState: () => {},
  currentItem: {},
  setCurrentItem: () => {},
  currentBoard: null,
  setCurrentBoard: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
});
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState<Card[]>(State);
  const [currentItem, setCurrentItem] = useState<CardItem>({});
  const [currentBoard, setCurrentBoard] = useState<Card | null | undefined>();

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, item: CardItem, boards: Card) => {
      setCurrentItem(item);
      setCurrentBoard(boards);
    },
    [currentBoard]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      let copyState = [...state];
      if (currentBoard!.header === "Правый столбец") {
        let currentIndexitem = currentBoard!.items.indexOf(currentItem);
        let currentIndexBoard = state.indexOf(currentBoard!);
        copyState[currentIndexBoard].items.splice(currentIndexitem, 1);
        copyState[currentIndexBoard + 1].items.push(currentItem);
        setState(copyState);
      }
      if (currentBoard!.header === "Левый столбец") {
        let currentIndex = currentBoard!.items.indexOf(currentItem);
        let currentIndexBoard = state.indexOf(currentBoard!);
        copyState[currentIndexBoard].items.splice(currentIndex, 1);
        copyState[currentIndexBoard - 1].items.push(currentItem);
        setState(copyState);
      }
    },
    [currentBoard, currentItem, state]
  );
  return (
    <Context.Provider
      value={{
        state,
        setState,
        currentItem,
        currentBoard,
        setCurrentBoard,
        setCurrentItem,
        handleDragEnd,
        handleDragStart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
