import {AsyncActionStatus} from '../asyncActionStatus';

export type transactionDetail = {
  transaction_id?: number;
  id: number;
  username: string;
  image: string;
  transaction_name?: string;
  transaction_type?: 'in' | 'out';
  amount?: string;
  date?: string;
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

export type TransactionState = {
  transactions: transactionDetail[];
  status: RequestStatus;
  pageInfo: PageInfo;
};

const GET_TRANSACTION = 'GET_TRANSACTION';
export const GET_TRANSACTION_PENDING =
  GET_TRANSACTION + AsyncActionStatus.PENDING;
export const GET_TRANSACTION_FULFILLED =
  GET_TRANSACTION + AsyncActionStatus.FULFILLED;
export const GET_TRANSACTION_REJECTED =
  GET_TRANSACTION + AsyncActionStatus.REJECTED;
const DO_TRANSACTION = 'DO_TRANSACTION';
export const DO_TRANSACTION_PENDING =
  DO_TRANSACTION + AsyncActionStatus.PENDING;
export const DO_TRANSACTION_FULFILLED =
  DO_TRANSACTION + AsyncActionStatus.FULFILLED;
export const DO_TRANSACTION_REJECTED =
  DO_TRANSACTION + AsyncActionStatus.REJECTED;
export const CLEAR_TRANSACTION = 'CLEAR_TRANSACTION';

export type doTransaction = {
  type:
    | typeof DO_TRANSACTION_PENDING
    | typeof DO_TRANSACTION_FULFILLED
    | typeof DO_TRANSACTION_REJECTED;
  payload?: string;
};

export type clearTransaction = {
  type: typeof CLEAR_TRANSACTION;
  payload?: string;
};

export type getTransactionHistory = {
  type:
    | typeof GET_TRANSACTION_PENDING
    | typeof GET_TRANSACTION_FULFILLED
    | typeof GET_TRANSACTION_REJECTED;
  payload?: {transactions: transactionDetail[]; pageInfo: PageInfo} | string;
};

export type TransactionActionTypes =
  | doTransaction
  | getTransactionHistory
  | clearTransaction;
