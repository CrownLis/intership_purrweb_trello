import { RootState } from "../../store"

export const getComments = (state:RootState) => {
return state.comments.comments
}
