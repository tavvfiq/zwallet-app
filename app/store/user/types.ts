import {AsyncActionStatus} from '../asyncActionStatus';

export type UserCredentials = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  pin?: string;
  token?: string;
};

type UserDetails = {
  image?: string;
  phoneNumber?: string;
  balance?: number;
  numOfContact?: number;
};

export type ContactDetail = {
  id: number;
  username: string;
  image: string;
  phoneNumber?: string;
};

export type ContactList = ContactDetail[];

//for pagination
export type PageInfo = {
  prevPage: string;
  page: number;
  nextPage: string;
};

export type RequestStatus = {
  loading: boolean;
  error: boolean;
  msg: string;
};

const LOGIN = 'LOGIN';
export const LOGIN_PENDING = LOGIN + AsyncActionStatus.PENDING;
export const LOGIN_FULFILLED = LOGIN + AsyncActionStatus.FULFILLED;
export const LOGIN_REJECTED = LOGIN + AsyncActionStatus.REJECTED;
const REGISTER = 'REGISTER';
export const REGISTER_PENDING = REGISTER + AsyncActionStatus.PENDING;
export const REGISTER_FULFILLED = REGISTER + AsyncActionStatus.FULFILLED;
export const REGISTER_REJECTED = REGISTER + AsyncActionStatus.REJECTED;
const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const UPDATE_BALANCE_PENDING =
  UPDATE_BALANCE + AsyncActionStatus.PENDING;
export const UPDATE_BALANCE_FULFILLED =
  UPDATE_BALANCE + AsyncActionStatus.FULFILLED;
export const UPDATE_BALANCE_REJECTED =
  UPDATE_BALANCE + AsyncActionStatus.REJECTED;
const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_PENDING = UPDATE_USER + AsyncActionStatus.PENDING;
export const UPDATE_USER_FULFILLED = UPDATE_USER + AsyncActionStatus.FULFILLED;
export const UPDATE_USER_REJECTED = UPDATE_USER + AsyncActionStatus.REJECTED;
const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACT_PENDING = ADD_CONTACT + AsyncActionStatus.PENDING;
export const ADD_CONTACT_FULFILLED = ADD_CONTACT + AsyncActionStatus.FULFILLED;
export const ADD_CONTACT_REJECTED = ADD_CONTACT + AsyncActionStatus.REJECTED;
const GET_CONTACT = 'GET_CONTACT';
export const GET_CONTACT_PENDING = GET_CONTACT + AsyncActionStatus.PENDING;
export const GET_CONTACT_FULFILLED = GET_CONTACT + AsyncActionStatus.FULFILLED;
export const GET_CONTACT_REJECTED = GET_CONTACT + AsyncActionStatus.REJECTED;
const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_CURRENT_USER_PENDING =
  FETCH_CURRENT_USER + AsyncActionStatus.PENDING;
export const FETCH_CURRENT_USER_FULFILLED =
  FETCH_CURRENT_USER + AsyncActionStatus.FULFILLED;
export const FETCH_CURRENT_USER_REJECTED =
  FETCH_CURRENT_USER + AsyncActionStatus.REJECTED;

export interface User {
  credentials: UserCredentials;
  details: UserDetails;
}

export const isUserDataType = (data: any) => {
  if ((data as User).credentials) {
    return true;
  } else {
    false;
  }
};

export interface UserState {
  user: User;
  contacts?: ContactList;
  status: RequestStatus;
  pageInfo: PageInfo;
}

export interface login {
  type: typeof LOGIN_PENDING | typeof LOGIN_FULFILLED | typeof LOGIN_REJECTED;
  payload?: User;
}

export interface register {
  type:
    | typeof REGISTER_PENDING
    | typeof REGISTER_FULFILLED
    | typeof REGISTER_REJECTED;
  payload?: User;
}

export interface updateUser {
  type:
    | typeof UPDATE_USER_PENDING
    | typeof UPDATE_USER_FULFILLED
    | typeof UPDATE_USER_REJECTED;
  payload?: User | string;
}

export interface addContact {
  type:
    | typeof ADD_CONTACT_PENDING
    | typeof ADD_CONTACT_FULFILLED
    | typeof ADD_CONTACT_REJECTED;
  payload?: string;
}

export interface getContact {
  type:
    | typeof GET_CONTACT_PENDING
    | typeof GET_CONTACT_FULFILLED
    | typeof GET_CONTACT_REJECTED;
  payload?: {contacts: ContactDetail[]; pageInfo: PageInfo} | string;
}

export interface updateBalance {
  type:
    | typeof UPDATE_BALANCE_PENDING
    | typeof UPDATE_BALANCE_FULFILLED
    | typeof UPDATE_BALANCE_REJECTED;
  payload: string;
}

export interface fetchCurrentUser {
  type:
    | typeof FETCH_CURRENT_USER_FULFILLED
    | typeof FETCH_CURRENT_USER_PENDING
    | typeof FETCH_CURRENT_USER_REJECTED;
  payload: User | string;
}

export type UserActionTypes =
  | login
  | register
  | updateUser
  | addContact
  | getContact
  | updateBalance
  | fetchCurrentUser;
