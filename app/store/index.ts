import {combineReducers, applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {systemReducer} from './system/reducers';
import {SystemActionTypes} from './system/types';
import {sessionReducer} from './user/reducers';
import {UserActionTypes} from './user/types';
import {transactionReducer} from './transaction/reducers';
import {TransactionActionTypes} from './transaction/types';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['system', 'session', 'transaction'],
};

const systemPersistConfig = {
  key: 'system',
  storage: AsyncStorage,
  whitelist: ['sessionIsValid'],
};

const sessionPersistConfig = {
  key: 'session',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  system: persistReducer(systemPersistConfig, systemReducer),
  session: persistReducer(sessionPersistConfig, sessionReducer),
  transaction: transactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const enhancers = applyMiddleware(reduxThunk);

export type RootActions =
  | SystemActionTypes
  | UserActionTypes
  | TransactionActionTypes;

const appStore = createStore(
  persistedRootReducer,
  composeWithDevTools(enhancers),
);
const persistor = persistStore(appStore);

export {appStore, persistor};
