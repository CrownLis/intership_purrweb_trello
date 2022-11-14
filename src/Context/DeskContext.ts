import React from 'react';
import { ICard, IComment, IUser } from '../Types/types';

interface IDeskContext {
  user: IUser | null;
  addComment: (newComment: Omit<IComment, 'id' | 'author'>) => void;
  addCard: (newCard: Omit<ICard, 'id' | 'author'>) => void;
  removeCard: (cardId: ICard['id']) => void;
  removeComment: (commentId: IComment['id']) => void;
  changeComment: (changedComment: IComment) => void;
  changeCard: (changedCard: ICard) => void;
}

const defaultValue: IDeskContext = {
  user: null,
  addComment: (newComment: Omit<IComment, 'id' | 'author'>) => {},
  addCard: (newCard: Omit<ICard, 'id' | 'author'>) => {},
  removeCard: (cardId: ICard['id']) => {},
  removeComment: (commentId: IComment['id']) => {},
  changeComment: (changedComment: IComment) => {},
  changeCard: (changedCard: ICard) => {}
};

const DeskContext = React.createContext(defaultValue);

export default DeskContext;
