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
  TransactionState,
} from './types';

import {IMAGE_URL} from '../../utils/environment';

const initialState: TransactionState = {
  transactions: [],
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

export const transactionReducer = (
  state = initialState,
  action: TransactionActionTypes,
): TransactionState => {
  switch (action.type) {
    case DO_TRANSACTION_PENDING:
      return {...state, status: {...state.status, loading: true}};
    case DO_TRANSACTION_FULFILLED:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: false,
          msg: action.payload as string,
        },
      };
    case DO_TRANSACTION_REJECTED:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: true,
          msg: action.payload as string,
        },
      };
    case GET_TRANSACTION_PENDING:
      return {
        ...state,
        status: {...state.status, loading: true},
      };
    case GET_TRANSACTION_FULFILLED:
      let {transactions, pageInfo} = action.payload as {
        transactions: transactionDetail[];
        pageInfo: PageInfo;
      };
      if (pageInfo.prevPage === '') {
        if (transactions.length !== 0) {
          transactions = transactions.map((transaction) => {
            return {
              ...transaction,
              image: transaction.image
                ? IMAGE_URL + transaction.image
                : transaction.image,
            };
          });
          return {
            ...state,
            transactions: [...transactions],
            status: {...state.status, loading: false, error: false},
            pageInfo: {
              prevPage: pageInfo.prevPage,
              page: Number(pageInfo.page),
              nextPage: pageInfo.nextPage,
            },
          };
        } else {
          return {
            ...state,
            status: {...state.status, loading: false, error: false},
            pageInfo: {
              prevPage: pageInfo.prevPage,
              page: Number(pageInfo.page) + 1,
              nextPage: pageInfo.nextPage,
            },
          };
        }
      }
      if (pageInfo.nextPage !== '') {
        transactions = transactions.map((transaction) => {
          return {
            ...transaction,
            image: transaction.image
              ? IMAGE_URL + transaction.image
              : transaction.image,
          };
        });
        let _transactions = state.transactions || [];
        const newArr = [..._transactions];
        newArr.push(...transactions);
        return {
          ...state,
          transactions: [...newArr],
          status: {...state.status, loading: false, error: false},
          pageInfo: {
            prevPage: pageInfo.prevPage,
            page: Number(pageInfo.page) + 1,
            nextPage: pageInfo.nextPage,
          },
        };
      } else {
        transactions = transactions.map((transaction) => {
          return {
            ...transaction,
            image: transaction.image
              ? IMAGE_URL + transaction.image
              : transaction.image,
          };
        });
        let _contacts = state.transactions || [];
        const newArr = [..._contacts];
        newArr.push(...transactions);
        return {
          ...state,
          transactions: [...newArr],
          status: {...state.status, loading: false, error: false},
          pageInfo: {
            prevPage: pageInfo.prevPage,
            nextPage: pageInfo.nextPage,
            page: 1,
          },
        };
      }
    case GET_TRANSACTION_REJECTED:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: true,
          msg: action.payload as string,
        },
      };
    default:
      return state;
  }
};
