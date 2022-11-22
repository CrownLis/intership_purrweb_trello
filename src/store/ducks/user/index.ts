import userSlice from "./userSlice";
import * as userActions from "./userSlice";
import * as userSelectors from "./selectors";

const userReducer = userSlice.reducer;

export { userActions, userReducer, userSelectors };
