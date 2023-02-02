import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { dashboard } from './dashboard.reducer';
import { alert } from './alert.reducer';
import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  dashboard,
});

export default rootReducer;
