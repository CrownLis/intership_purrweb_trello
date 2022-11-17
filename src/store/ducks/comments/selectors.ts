import { CommentType, State } from '../../../Types/types';

const selectComments = (state: State) => {
  return () => {
    return state.comments;
  };
};

const selectCommentById = (id: CommentType['id']) => {
  return (state: State) => {
    return state.comments.find((comment) => comment.id === id);
  };
};

const selectCommentByCardId = (cardId: CommentType['cardId']) => {
  return (state: State) => {
    return state.comments.filter((comment) => comment.cardId === cardId);
  };
};

export const commentSelectors = {
  selectComments,
  selectCommentById,
  selectCommentByCardId
};
