import storage from '../../../Service/storage';
import { UserType } from '../../../Types/types';
import BaseAction from '../../baseAction';
import { StorageKeys } from '../../storageKeys';

const initialUserState = {
  user: null
};

class UserActions extends BaseAction {
  constructor() {
    super();
    const user = storage.getItem(StorageKeys.USER);

    if (!user) {
      this.user = initialUserState.user;
    }
  }

  changeUser(user: UserType) {
    this.user = user;
  }
}

export const userActions = new UserActions();
