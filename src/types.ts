export interface Card {
  [x: string]: any;
  id: number;
  header: string;
  items: CardItem[];
}

export interface CardItem {
  id?: number;
  name?: string;
  quque?: number;
}
