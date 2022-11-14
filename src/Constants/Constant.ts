import { IColumn } from '../Types/types';

export const defaultColumns: IColumn[] = [
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
];
