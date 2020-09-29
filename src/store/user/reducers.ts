import {
  User,
  PageInfo,
  ContactDetail,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  REGISTER_FULFILLED,
  REGISTER_PENDING,
  REGISTER_REJECTED,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
  GET_CONTACT_PENDING,
  GET_CONTACT_FULFILLED,
  GET_CONTACT_REJECTED,
  UserActionTypes,
  UserState,
  UPDATE_BALANCE_FULFILLED,
} from './types';

const initialState: UserState = {
  user: {
    credentials: {
      id: 0,
      username: 'Unknown',
      token: '',
      pin: '',
    },
    details: {
      numOfContact: 0,
      balance: 0,
    },
  },
  contacts: [],
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
    case UPDATE_USER_PENDING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case UPDATE_USER_FULFILLED:
      const {credentials, details} = action.payload as User;
      return {
        ...state,
        user: {
          ...state.user,
          credentials: {
            ...state.user.credentials,
            username: credentials.username,
            pin: credentials.pin,
          },
          details: {
            ...state.user.details,
            image: details.image,
            phoneNumber: details.phoneNumber,
          },
        },
        status: {
          loading: false,
          error: false,
          msg: 'Profile updated',
        },
      };
    case UPDATE_USER_REJECTED:
      return {
        ...state,
        status: {
          loading: false,
          error: true,
          msg: action.payload as string,
        },
      };
    case GET_CONTACT_PENDING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case GET_CONTACT_FULFILLED:
      const {contacts, pageInfo} = action.payload as {
        contacts: ContactDetail[];
        pageInfo: PageInfo;
      };
      if (pageInfo.prevPage === '') {
        if (contacts.length !== 0) {
          return {
            ...state,
            contacts: [...contacts],
            status: {...state.status, loading: false, error: false},
            pageInfo: {
              prevPage: pageInfo.prevPage,
              page: Number(pageInfo.page),
              nextPage: pageInfo.nextPage,
            },
          };
        } else {
          // if (pageInfo.nextPage !== '') {
          return {
            ...state,
            status: {...state.status, loading: false, error: false},
            pageInfo: {
              prevPage: pageInfo.prevPage,
              page: Number(pageInfo.page) + 1,
              nextPage: pageInfo.nextPage,
            },
          };
          // } else {
          //   return {
          //     ...state,
          //     contacts: [],
          //     status: {...state.status, loading: false, error: false},
          //     pageInfo: {
          //       prevPage: pageInfo.prevPage,
          //       page: Number(pageInfo.page) + 1,
          //       nextPage: pageInfo.nextPage,
          //     },
          //   };
          // }
        }
      }
      if (pageInfo.nextPage !== '') {
        let _contacts = state.contacts || [];
        const newArr = [..._contacts];
        newArr.push(...contacts);
        return {
          ...state,
          contacts: [...newArr],
          status: {...state.status, loading: false, error: false},
          pageInfo: {
            prevPage: pageInfo.prevPage,
            page: Number(pageInfo.page) + 1,
            nextPage: pageInfo.nextPage,
          },
        };
      } else {
        let _contacts = state.contacts || [];
        const newArr = [..._contacts];
        newArr.push(...contacts);
        return {
          ...state,
          contacts: [...newArr],
          status: {...state.status, loading: false, error: false},
          pageInfo: {
            prevPage: pageInfo.prevPage,
            nextPage: pageInfo.nextPage,
            page: 1,
          },
        };
      }
    case GET_CONTACT_REJECTED:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: true,
          msg: action.payload as string,
        },
      };
    case UPDATE_BALANCE_FULFILLED:
      return {
        ...state,
        user: {
          ...state.user,
          details: {
            ...state.user.details,
            balance:
              state.user.details.balance - Number(action.payload as string),
          },
        },
      };
    default:
      return state;
  }
}
