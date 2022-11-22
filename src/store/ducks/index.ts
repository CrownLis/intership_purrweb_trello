import { combineReducers } from "redux";
import { cardsActions, cardsReducer, cardsSelectors } from "./cards";
import { columnsActions, columnsReducer, columnsSelectors } from "./columns";
import {
  commentsActions,
  commentsReducer,
  commentsSelectors
} from "./comments";
import { userActions, userReducer, userSelectors } from "./user";

export const rootReducer = combineReducers({
  cards: cardsReducer,
  comments: commentsReducer,
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
  comments: commentsSelectors,
  columns: columnsSelectors,
  user: userSelectors
};
