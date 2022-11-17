import storage from '../../../Service/storage';
import BaseAction from '../../baseAction';
import { StorageKeys } from '../../storageKeys';

const initialColumnState = {
  columns: [
    {
      id: Number(new Date()) + 1,
      name: 'TODO'
    },
    {
      id: Number(new Date()) + 2,
      name: 'In Progress'
    },
    {
      id: Number(new Date()) + 3,
      name: 'Testing'
    },
    {
      id: Number(new Date()) + 4,
      name: 'Done'
    }
  ]
};

class ColumnActions extends BaseAction {
  constructor() {
    super();
    const columns = storage.getItem(StorageKeys.COLUMNS);

    if (!columns) {
      storage.setItem(StorageKeys.COLUMNS, initialColumnState.columns);
    }
  }
}

export const columnsAction = new ColumnActions();
