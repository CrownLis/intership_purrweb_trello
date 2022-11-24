import { combineReducers } from 'redux';
import {
  actions as cardsActions,
  reducer as cardsReducer,
  selectors as cardsSelectors
} from './cards';
import {
  actions as columnsActions,
  reducer as columnsReducer,
  selectors as columnsSelectors
} from './columns';
import {
  actions as commentsActions,
  reducer as commentReducer,
  selectors as commentSelector
} from './comments';
import {
  actions as userActions,
  reducer as userReducer,
  selectors as userSelectors
} from './user';

export const rootReducer = combineReducers({
  cards: cardsReducer,
  comments: commentReducer,
  columns: columnsReducer,
  user: userReducer
});

export const rootActions = {
  cards: cardsActions,
  comments: commentsActions,
  columns: columnsActions,
  user: userActions
};

export const rootSelectors = {
  cards: cardsSelectors,
  comments: commentSelector,
  columns: columnsSelectors,
  user: userSelectors
};
