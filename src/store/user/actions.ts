import {AppThunk} from '../thunk';
import {authAPI, mainAPI} from '../../utils/apicalls';
import {
  loginType,
  registerType,
  transactionType,
  updateUserType,
} from '../../utils/types';
import {validateSession} from '../system/actions';

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

function updateUserPending(): UserActionTypes {
  return {
    type: UPDATE_USER_PENDING,
  };
}

function updateUserFulfilled(user: User): UserActionTypes {
  return {
    type: UPDATE_USER_FULFILLED,
    payload: user,
  };
}

function updateUserRejected(msg: string): UserActionTypes {
  return {
    type: UPDATE_USER_REJECTED,
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
        mainAPI.setToken(token);
        const credentials = {id, username, pin, token};
        const details = {image, phoneNumber, balance};
        dispatch(validateSession(true));
        dispatch(registerFulfilled({credentials, details}));
      } else {
        dispatch(validateSession(false));
        dispatch(registerRejected(data.msg));
      }
    })
    .catch((error) => {
      // console.log(error);
      dispatch(validateSession(false));
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
        mainAPI.setToken(token);
        const credentials = {id, username, pin, token};
        const details = {image, phoneNumber, balance};
        dispatch(validateSession(true));
        dispatch(loginFulfilled({credentials, details}));
      } else {
        dispatch(validateSession(false));
        dispatch(loginRejected(data.msg));
      }
    })
    .catch((error) => {
      // console.log(error);
      dispatch(validateSession(false));
      dispatch(loginRejected(error));
    });
};

export const updateUser = (id: number, body: updateUserType): AppThunk => (
  dispatch,
) => {
  dispatch(updateUserPending());
  mainAPI
    .updateUser(id, body)
    .then((res: any) => {
      console.log(res);
      const {isSuccess, isTokenValid, data} = res;
      if (isSuccess && isTokenValid) {
        const {username, pin, image, phone_number: phoneNumber} = data;
        const credentials = {id, username, pin};
        const details = {image, phoneNumber};
        dispatch(validateSession(true));
        dispatch(updateUserFulfilled({credentials, details}));
      } else {
        dispatch(validateSession(false));
        dispatch(updateUserRejected(data.msg));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(updateUserRejected(err));
    });
};
