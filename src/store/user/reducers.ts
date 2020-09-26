import {
  User,
  RequestStatus,
  PageInfo,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  REGISTER_FULFILLED,
  REGISTER_PENDING,
  REGISTER_REJECTED,
  UserActionTypes,
  UserState,
} from './types';

const initialState: UserState = {
  user: {
    credentials: {
      username: 'Unknown',
      token: '',
      pin: 0,
    },
    details: {
      balance: 0,
    },
  },
  status: {
    loading: false,
    error: false,
    msg: '',
  },
  pageInfo: {
    prevPage: '',
    page: 1,
    nextPage: '',
  },
};

export function userReducer(
  state = initialState,
  action: UserActionTypes,
): UserState {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        user: action.payload as User,
        status: {
          loading: false,
          error: false,
          msg: 'Login successful',
        },
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        status: {
          loading: false,
          error: true,
          msg: action.payload as string,
        },
      };
    case REGISTER_PENDING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        user: action.payload as User,
        status: {
          loading: false,
          error: false,
          msg: 'Register successful',
        },
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        status: {
          loading: false,
          error: true,
          msg: action.payload as string,
        },
      };
    default:
      return state;
  }
}
