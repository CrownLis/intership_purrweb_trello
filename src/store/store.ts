import { cardsActions } from './ducks/cards/actions';
import { cardSelectors } from './ducks/cards/selectors';
import { columnsAction } from './ducks/columns/actions';
import { columnsSelectors } from './ducks/columns/selectors';
import { commentsActions } from './ducks/comments/actions';
import { commentSelectors } from './ducks/comments/selectors';
import { userActions } from './ducks/user/actions';
import { userSelectors } from './ducks/user/selectors';

export const actions = {
  cards: cardsActions,
  comments: commentsActions,
  user: userActions,
  columns: columnsAction
};

export const selectors = {
  cards: cardSelectors,
  comments: commentSelectors,
  user: userSelectors,
  columns: columnsSelectors
};
