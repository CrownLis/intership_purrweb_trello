import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnType } from '../../../Types/types';

type ColumnSliceType = {
  columns: ColumnType[] | null;
};

const initialState: ColumnSliceType = {
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

const columnsSlice = createSlice({
  name: 'columnsSlice',
  initialState,
  reducers: {
    changeColumn(state, action: PayloadAction<ColumnType>) {
      if (state.columns) {
        state.columns = state.columns?.map((column) =>
        column.id === action.payload.id ? action.payload : column
        );
      }
    }
  }
});

export const { actions, reducer } = columnsSlice;
