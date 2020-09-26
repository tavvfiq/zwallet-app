import {AppThunk} from '../thunk';
import {authAPI, mainAPI} from '../../utils/apicalls';
import {loginType, registerType, transactionType} from '../../utils/types';

import {
  User,
  RequestStatus,
  PageInfo,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
  REGISTER_FULFILLED,
  REGISTER_PENDING,
  REGISTER_REJECTED,
  UserActionTypes,
} from './types';

function loginPending(): UserActionTypes {
  return {
    type: LOGIN_PENDING,
  };
}

function loginFulfilled(user: User): UserActionTypes {
  return {
    type: LOGIN_FULFILLED,
    payload: user,
  };
}

function loginRejected(msg: string): UserActionTypes {
  return {
    type: LOGIN_REJECTED,
    payload: msg,
  };
}

function registerPending(): UserActionTypes {
  return {
    type: REGISTER_PENDING,
  };
}

function registerFulfilled(user: User): UserActionTypes {
  return {
    type: REGISTER_FULFILLED,
    payload: user,
  };
}

function registerRejected(msg: string): UserActionTypes {
  return {
    type: REGISTER_REJECTED,
    payload: msg,
  };
}

export const register = (body: registerType): AppThunk => (dispatch) => {
  dispatch(registerPending());
  authAPI
    .register(body)
    .then((res: any) => {
      const {isSuccess, data} = res;
      if (isSuccess) {
        const {
          id,
          username,
          pin,
          image,
          phone_number: phoneNumber,
          balance,
          token,
        } = data;
        const credentials = {id, username, pin, token};
        const details = {image, phoneNumber, balance};
        dispatch(registerFulfilled({credentials, details}));
      } else {
        dispatch(registerRejected(data.msg));
      }
    })
    .catch((error) => {
      // console.log(error);
      dispatch(registerRejected(error));
    });
};

export const login = (body: loginType): AppThunk => (dispatch) => {
  dispatch(loginPending());
  authAPI
    .login(body)
    .then((res: any) => {
      const {isSuccess, data} = res;
      if (isSuccess) {
        const {
          id,
          username,
          pin,
          image,
          phone_number: phoneNumber,
          balance,
          token,
        } = data;
        const credentials = {id, username, pin, token};
        const details = {image, phoneNumber, balance};
        dispatch(loginFulfilled({credentials, details}));
      } else {
        dispatch(loginRejected(data.msg));
      }
    })
    .catch((error) => {
      // console.log(error);
      dispatch(loginRejected(error));
    });
};
