import {combineReducers, applyMiddleware, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {systemReducer} from './system/reducers';
import {SystemActionTypes} from './system/types';
import {userReducer} from './user/reducers';
import {UserActionTypes} from './user/types';
import {transactionReducer} from './transaction/reducers';
import {TransactionActionTypes} from './transaction/types';

const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  transaction: transactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const enhancers = applyMiddleware(reduxThunk);

export type RootActions =
  | SystemActionTypes
  | UserActionTypes
  | TransactionActionTypes;

const store = createStore(rootReducer, composeWithDevTools(enhancers));

export {store};
