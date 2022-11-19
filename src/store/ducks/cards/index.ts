import cardsSlice from "./cardsSlice";
import * as cardsActions from './cardsSlice'
import * as cardsSelectors from './selectors'

const cardsReducer = cardsSlice.reducer

export {cardsActions,cardsReducer,cardsSelectors}