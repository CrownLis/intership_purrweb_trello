import { RootState } from "../../store";

export const getCards = (state:RootState) => {
  return state.cards
}
