import {AppThunk} from '../thunk';
import {authAPI, mainAPI} from '../../utils/apicalls';
import {loginType, registerType, updateUserType} from '../../utils/types';
import AsyncStorage from '@react-native-community/async-storage';
import {validateSession} from '../system/actions';
import {clearTransaction} from '../transaction/actions';
import {IMAGE_URL} from '../../utils/environment';

import {
  User,
  PageInfo,
  ContactDetail,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
  REGISTER_FULFILLED,
  REGISTER_PENDING,
  REGISTER_REJECTED,
  GET_CONTACT_PENDING,
  GET_CONTACT_FULFILLED,
  GET_CONTACT_REJECTED,
  UPDATE_BALANCE_FULFILLED,
  FETCH_CURRENT_USER_FULFILLED,
  FETCH_CURRENT_USER_PENDING,
  FETCH_CURRENT_USER_REJECTED,
  UserActionTypes,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
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

function getContactPending(): UserActionTypes {
  return {
    type: GET_CONTACT_PENDING,
  };
}

function getContactFulfilled(
  contacts: ContactDetail[],
  pageInfo: PageInfo,
): UserActionTypes {
  return {
    type: GET_CONTACT_FULFILLED,
    payload: {contacts, pageInfo},
  };
}

function getContactRejected(msg: string): UserActionTypes {
  return {
    type: GET_CONTACT_REJECTED,
    payload: msg,
  };
}

export function updateBalanceFulFilled(balance: string): UserActionTypes {
  return {
    type: UPDATE_BALANCE_FULFILLED,
    payload: balance,
  };
}

function getUserPending(): UserActionTypes {
  return {
    type: FETCH_CURRENT_USER_PENDING,
  };
}

function getUserFulfilled(user: User): UserActionTypes {
  return {
    type: FETCH_CURRENT_USER_FULFILLED,
    payload: user,
  };
}

function getUserRejected(msg: string): UserActionTypes {
  return {
    type: FETCH_CURRENT_USER_REJECTED,
    payload: msg,
  };
}

export const getUser = (id: number): AppThunk => (dispatch) => {
  dispatch(getUserPending());
  mainAPI
    .getUserByid(id)
    .then((res: any) => {
      const {isSuccess, isTokenValid, data} = res;
      if (isSuccess && isTokenValid) {
        const {
          username,
          email,
          pin,
          image,
          phone_number: phoneNumber,
          num_of_contact: numOfContact,
          balance,
        } = data;
        const credentials = {id, username, email, pin};
        const details = {
          image: image ? IMAGE_URL + image : image,
          phoneNumber,
          numOfContact,
          balance,
        };
        dispatch(validateSession(true));
        dispatch(getUserFulfilled({credentials, details}));
      } else {
        dispatch(logout());
        dispatch(getUserRejected(data.msg));
      }
    })
    .catch(() => {
      dispatch(validateSession(false));
      dispatch(getUserRejected('Connection error'));
    });
};

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
          email,
          pin,
          image,
          phone_number: phoneNumber,
          num_of_contact: numOfContact,
          balance,
          token,
        } = data;
        mainAPI.setToken(token);
        const credentials = {id, username, email, pin, token};
        const details = {
          image: image ? IMAGE_URL + image : image,
          phoneNumber,
          numOfContact,
          balance,
        };
        dispatch(validateSession(true));
        dispatch(registerFulfilled({credentials, details}));
      } else {
        dispatch(validateSession(false));
        dispatch(registerRejected(data.msg));
      }
    })
    .catch(() => {
      dispatch(validateSession(false));
      dispatch(registerRejected('Connection error'));
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
          email,
          pin,
          image,
          phone_number: phoneNumber,
          num_of_contact: numOfContact,
          balance,
          token,
        } = data;
        mainAPI.setToken(token);
        const credentials = {id, username, email, pin, token};
        const details = {
          image: image ? IMAGE_URL + image : image,
          phoneNumber,
          numOfContact,
          balance,
        };
        dispatch(validateSession(true));
        dispatch(loginFulfilled({credentials, details}));
      } else {
        dispatch(validateSession(false));
        dispatch(loginRejected(data.msg));
      }
    })
    .catch(() => {
      dispatch(validateSession(false));
      dispatch(loginRejected('Connection error'));
    });
};

export const logout = (): AppThunk => (dispatch) => {
  dispatch({type: LOGOUT_PENDING});
  AsyncStorage.removeItem('persist:root', (error) => {
    if (!error) {
      mainAPI.setToken('');
      dispatch(validateSession(false));
      dispatch(clearTransaction());
      dispatch({type: LOGOUT_FULFILLED});
    } else {
      dispatch({type: LOGOUT_REJECTED, payload: error.message});
    }
  });
};

export const updateUser = (id: number, body: updateUserType): AppThunk => (
  dispatch,
) => {
  dispatch(updateUserPending());
  mainAPI
    .updateUser(id, body)
    .then((res: any) => {
      const {isSuccess, isTokenValid, data} = res;
      if (isSuccess && isTokenValid) {
        const {
          username,
          email,
          pin,
          image,
          phone_number: phoneNumber,
          msg,
        } = data;
        const credentials = {id, username, email, pin};
        const details = {image: image ? IMAGE_URL + image : image, phoneNumber};
        if (username !== undefined) {
          dispatch(validateSession(true));
          dispatch(updateUserFulfilled({credentials, details}));
        } else if (pin !== undefined) {
          dispatch({
            type: UPDATE_USER_FULFILLED,
            payload: {credentials: {pin}, details: {}},
          });
        } else {
          dispatch(validateSession(true));
          dispatch({type: UPDATE_USER_FULFILLED, payload: msg});
        }
      } else {
        dispatch(logout());
        dispatch(updateUserRejected(data.msg));
      }
    })
    .catch(() => {
      const msg = 'Connection Error';
      dispatch(updateUserRejected(msg));
    });
};

export const getContact = (endpoint: string): AppThunk => (dispatch) => {
  dispatch(getContactPending());
  mainAPI
    .getContact(endpoint)
    .then((res: any) => {
      const {isSuccess, isTokenValid} = res;
      if (isSuccess && isTokenValid) {
        const {contacts, pageInfo} = res;
        dispatch(validateSession(true));
        dispatch(getContactFulfilled(contacts, pageInfo));
      } else {
        dispatch(logout());
        dispatch(getContactRejected('Failed to get contact list.'));
      }
    })
    .catch(() => {
      const msg = 'Connection Error';
      dispatch(getContactRejected(msg));
    });
};
