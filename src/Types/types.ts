export type DataType = {
  user: UserType | null;
  columns: ColumnType[];
  cards: CardType[];
  comments: CommentType[];
};

export type ColumnType = {
  id: number;
  name: string;
};

export type CardType = {
  columnId: number;
  id: number;
  name: string;
  description: string;
  author: string;
};

export type CommentType = {
  cardId: number;
  id: number;
  text: string;
  author: string;
};

export type UserType = {
  name: string;
};

export type State = DataType;
