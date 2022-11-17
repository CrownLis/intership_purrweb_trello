import storage from '../../../Service/storage';
import { CommentType } from '../../../Types/types';
import BaseAction from '../../baseAction';
import { StorageKeys } from '../../storageKeys';

const initialCommentState = {
  comments: []
};

type AddCommentDto = Omit<CommentType, 'id' | 'author'>;

class CommentActions extends BaseAction {
  constructor() {
    super();
    const comments = storage.getItem(StorageKeys.COMMENTS);

    if (!comments) {
      storage.setItem(StorageKeys.COMMENTS, initialCommentState.comments);
    }
  }

  addComment(comment: AddCommentDto) {
    const comments = [
      { id: Number(new Date()), author: this.user!.name, ...comment },
      ...this.comments
    ];
    this.comments = comments;
  }
  removeComment(id: CommentType['id']) {
    const comment = this.comments.filter((comment) => comment.id !== id);
    this.comments = comment;
  }

  changeComment = (changedComment: CommentType) => {
    storage.setItem(
      StorageKeys.COMMENTS,
      this.comments.map((item) => {
        return item.id === changedComment.id ? changedComment : item;
      })
    );
  };
}

export const commentsActions = new CommentActions();
