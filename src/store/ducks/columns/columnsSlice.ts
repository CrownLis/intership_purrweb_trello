import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnType } from "../../../Types/types";

type ColumnSliceType = {
    columns: ColumnType[] | null
}

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
            state.columns?.map((item) => item.id === action.payload.id ? action.payload : item)
        }
    }
})

export default columnsSlice

export const { changeColumn } = columnsSlice.actions