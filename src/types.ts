export interface Card {
  id: number;
  header: "Правый столбец" | "Левый столбец";
  items: CardItem[];
}

export interface CardItem {
  id?: number;
  name?: string;
  quque?: number;
}
