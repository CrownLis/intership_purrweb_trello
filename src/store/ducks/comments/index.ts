import commentsSlice from "./commentsSlice";
import * as commentsActions from "./commentsSlice";
import * as commentsSelectors from "./selectors";

const commentsReducer = commentsSlice.reducer;

export { commentsActions, commentsReducer, commentsSelectors };
