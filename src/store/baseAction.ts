import storage from '../Service/storage';
import { CardType, CommentType, UserType } from '../Types/types';
import { StorageKeys } from './storageKeys';

class BaseAction {
  get cards() {
    return storage.getItem(StorageKeys.CARDS) as CardType[];
  }
  set cards(newValue: CardType[]) {
    storage.setItem(StorageKeys.CARDS, newValue);
  }
  get user() {
    return storage.getItem(StorageKeys.USER) as UserType;
  }
  set user(newValue: UserType | null) {
    storage.setItem(StorageKeys.USER, newValue);
  }
  get comments() {
    return storage.getItem(StorageKeys.COMMENTS) as CommentType[];
  }
  set comments(newValue: CommentType[]) {
    console.log(newValue);
    storage.setItem(StorageKeys.COMMENTS, newValue);
  }
}

export default BaseAction;
