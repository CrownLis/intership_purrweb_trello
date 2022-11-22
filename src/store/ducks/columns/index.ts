import columnsSlice from "./columnsSlice";
import * as columnsActions from "./columnsSlice";
import * as columnsSelectors from "./selectors";

const columnsReducer = columnsSlice.reducer;

export { columnsActions, columnsReducer, columnsSelectors };
