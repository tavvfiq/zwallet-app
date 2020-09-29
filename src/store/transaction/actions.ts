import {AppThunk} from '../thunk';
import {mainAPI} from '../../utils/apicalls';
import {transactionType} from '../../utils/types';
import {validateSession} from '../system/actions';
import {updateBalanceFulFilled} from '../user/actions';
import {
  transactionDetail,
  PageInfo,
  DO_TRANSACTION_FULFILLED,
  DO_TRANSACTION_PENDING,
  DO_TRANSACTION_REJECTED,
  GET_TRANSACTION_FULFILLED,
  GET_TRANSACTION_PENDING,
  GET_TRANSACTION_REJECTED,
  TransactionActionTypes,
} from './types';

function doTransactionPending(): TransactionActionTypes {
  return {
    type: DO_TRANSACTION_PENDING,
  };
}

function doTransactionFulfilled(msg: string): TransactionActionTypes {
  return {
    type: DO_TRANSACTION_FULFILLED,
    payload: msg,
  };
}

function doTransactionRejected(msg: string): TransactionActionTypes {
  return {
    type: DO_TRANSACTION_REJECTED,
    payload: msg,
  };
}

export const doTransaction = (body: transactionType): AppThunk => (
  dispatch,
) => {
  dispatch(doTransactionPending());
  mainAPI
    .doTransaction(body)
    .then((res: any) => {
      const {isSuccess, isTokenValid} = res;
      if (isSuccess && isTokenValid) {
        const {amount} = res.data;
        dispatch(validateSession(true));
        dispatch(updateBalanceFulFilled(amount));
        dispatch(doTransactionFulfilled('Transaction Success'));
      } else {
        dispatch(validateSession(false));
        dispatch(doTransactionRejected('Transaction failed'));
      }
    })
    .catch((err) => {
      dispatch(doTransactionRejected(err));
    });
};

function getTransactionPending(): TransactionActionTypes {
  return {
    type: GET_TRANSACTION_PENDING,
  };
}

function getTransactionFulfilled(
  transactions: transactionDetail[],
  pageInfo: PageInfo,
): TransactionActionTypes {
  return {
    type: GET_TRANSACTION_FULFILLED,
    payload: {transactions, pageInfo},
  };
}

function getTransactionRejected(msg: string): TransactionActionTypes {
  return {
    type: GET_TRANSACTION_REJECTED,
    payload: msg,
  };
}

export const getTransaction = (endpoint: string): AppThunk => (dispatch) => {
  dispatch(getTransactionPending());
  mainAPI
    .getTransactionHistory(endpoint)
    .then((res: any) => {
      const {isSuccess, isTokenValid} = res;
      if (isSuccess && isTokenValid) {
        const {transactions, pageInfo} = res;
        dispatch(validateSession(true));
        dispatch(getTransactionFulfilled(transactions, pageInfo));
      } else {
        dispatch(validateSession(false));
        dispatch(getTransactionRejected('Error fetching transaction history'));
      }
    })
    .catch((err) => {
      dispatch(getTransactionRejected(err));
    });
};
