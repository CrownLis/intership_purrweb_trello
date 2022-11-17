import { CardType, State } from '../../../Types/types';
import { commentSelectors } from '../comments/selectors';

const selectCards = () => {
  return (state: State) => {
    return state.cards.map((item) => {
      const commentCount = commentSelectors.selectCommentByCardId(item.id)(
        state
      ).length;
      console.log(commentSelectors.selectCommentByCardId(item.id));
      return {
        ...item,
        commentCount
      };
    });
  };
};

const selectCardById = (id: CardType['id']) => {
  return (state: State) => {
    return selectCards()(state).find((card) => card.id === id);
  };
};
const selectCardByColumnId = (columnId: CardType['columnId']) => {
  return (state: State) => {
    return selectCards()(state).filter((card) => card.columnId === columnId);
  };
};

export const cardSelectors = {
  selectCards,
  selectCardById,
  selectCardByColumnId
};
