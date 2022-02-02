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
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: CardItem) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}
export const Context = React.createContext<ContextProps>({
  state: State,
  setState: () => {},
  currentItem: {},
  setCurrentItem: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
});
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState<Card[]>(State);
  const [currentItem, setCurrentItem] = useState<CardItem>({});
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, item: CardItem) => {
      setCurrentItem(item);
    },
    []
  );
  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      let copyState = [...state];
      copyState[1].items.push(currentItem);
      setState(copyState);
    },
    [currentItem, state]
  );
  return (
    <Context.Provider
      value={{
        state,
        setState,
        currentItem,
        setCurrentItem,
        handleDragEnd,
        handleDragStart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
