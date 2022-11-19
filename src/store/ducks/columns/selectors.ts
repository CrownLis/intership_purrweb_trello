import { RootState } from "../../store";

export const getColumns = (state:RootState) => {
  return state.columns.columns
}