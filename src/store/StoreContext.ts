import React from 'react';
import { State } from '../Types/types';

const state: State = {
  cards: [],
  columns: [],
  comments: [],
  user: null
};

const DeskContext = React.createContext(state);

export default DeskContext;
