export interface IData {
  user: IUser | null;
  columns: IColumn[];
  cards: ICard[];
  comments: IComment[];
}

export interface IColumn {
  id: number;
  name: string;
}

export interface ICard {
  columnId: number;
  id: number;
  name: string;
  description: string;
  author: string;
}

export interface IComment {
  cardId: number;
  id: number;
  text: string;
  author: string;
}

export interface IUser {
  name: string;
}
