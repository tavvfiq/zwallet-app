import {AsyncActionStatus} from '../asyncActionStatus';

type UserCredentials = {
  id: number;
  username: string;
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

type ContactDetail = {
  username: string;
  image: string;
  phoneNumber: string;
};

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

export interface User {
  credentials: UserCredentials;
  details: UserDetails;
}

export interface UserState {
  user: User;
  contact?: ContactDetail[];
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
  payload?: User;
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
  payload?: ContactDetail[] | PageInfo;
}

export type UserActionTypes =
  | login
  | register
  | updateUser
  | addContact
  | getContact;
