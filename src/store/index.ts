import {combineReducers, applyMiddleware, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {systemReducer} from './system/reducers';
import {SystemActionTypes} from './system/types';
import {userReducer} from './user/reducers';
import {UserActionTypes} from './user/types';

const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const enhancers = applyMiddleware(reduxThunk);

export type RootActions = SystemActionTypes | UserActionTypes;

const store = createStore(rootReducer, composeWithDevTools(enhancers));

export {store};
