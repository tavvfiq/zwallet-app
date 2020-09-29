import {AppThunk} from '../thunk';
import {authAPI, mainAPI} from '../../utils/apicalls';
import {loginType, registerType, updateUserType} from '../../utils/types';
import {validateSession} from '../system/actions';

import {
  UserCredentials,
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
  UPDATE_BALANCE_PENDING,
  UPDATE_BALANCE_FULFILLED,
  UPDATE_BALANCE_REJECTED,
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

// function getUserFulfilled(credentials: UserCredentials): UserActionTypes {
//   return {
//     type: UPDATE_BALANCE_FULFILLED,
//     payload: credentials,
//   };
// }

// function getUserRejected(): UserActionTypes {
//   return {
//     type: UPDATE_BALANCE_REJECTED,
//   };
// }

// export const getUser = (id: number): AppThunk => (dispatch) => {
//   dispatch(getUserPending());
//   mainAPI.getUserByid(id).then((res)=>{
//     const {isSuccess} = res;
//     if(isSuccess){
//       const {balan}
//     }
//   })
// };

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
          num_of_contact: numOfContact,
          balance,
          token,
        } = data;
        mainAPI.setToken(token);
        const credentials = {id, username, pin, token};
        const details = {image, phoneNumber, numOfContact, balance};
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
          num_of_contact: numOfContact,
          balance,
          token,
        } = data;
        mainAPI.setToken(token);
        const credentials = {id, username, pin, token};
        const details = {image, phoneNumber, numOfContact, balance};
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
        dispatch(validateSession(false));
        dispatch(getContactRejected('Failed to get contact list.'));
      }
    })
    .catch((err) => {
      dispatch(getContactRejected(err));
    });
};
