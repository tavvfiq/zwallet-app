import {RootState} from './';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action
>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;
