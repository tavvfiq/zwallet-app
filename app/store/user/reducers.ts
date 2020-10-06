import {
  User,
  PageInfo,
  ContactDetail,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGOUT_FULFILLED,
  LOGOUT_PENDING,
  LOGOUT_REJECTED,
  REGISTER_FULFILLED,
  REGISTER_PENDING,
  REGISTER_REJECTED,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
  GET_CONTACT_PENDING,
  GET_CONTACT_FULFILLED,
  GET_CONTACT_REJECTED,
  FETCH_CURRENT_USER_FULFILLED,
  FETCH_CURRENT_USER_PENDING,
  FETCH_CURRENT_USER_REJECTED,
  UserActionTypes,
  UserState,
  UPDATE_BALANCE_FULFILLED,
  isUserDataType,
} from './types';

import {IMAGE_URL} from '../../utils/environment';

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

export function sessionReducer(
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
    case LOGOUT_PENDING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          msg: 'please wait',
        },
      };
    case LOGOUT_FULFILLED:
      return initialState;
    case LOGOUT_REJECTED:
      return {
        ...state,
        status: {
          ...state.status,
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
          msg: 'please wait',
        },
      };
    case FETCH_CURRENT_USER_PENDING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          msg: 'please wait',
        },
      };
    case FETCH_CURRENT_USER_REJECTED:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          msg: action.payload as string,
        },
      };
    case FETCH_CURRENT_USER_FULFILLED:
      const {credentials, details} = action.payload as User;
      const newCredentials = {...state.user.credentials, ...credentials};
      const newDetails = {...state.user.details, ...details};
      return {
        ...state,
        user: {
          ...state.user,
          credentials: {...state.user.credentials, ...newCredentials},
          details: {
            ...state.user.details,
            ...newDetails,
          },
        },
        status: {
          loading: false,
          error: false,
          msg: 'Profile fetched',
        },
      };
    case UPDATE_USER_FULFILLED:
      if (isUserDataType(action.payload)) {
        const {credentials, details} = action.payload as User;
        const newCredentials = {...state.user.credentials, ...credentials};
        const newDetails = {...state.user.details, ...details};
        return {
          ...state,
          user: {
            ...state.user,
            credentials: {...state.user.credentials, ...newCredentials},
            details: {
              ...state.user.details,
              ...newDetails,
            },
          },
          status: {
            loading: false,
            error: false,
            msg: 'Profile updated',
          },
        };
      } else {
        return {
          ...state,
          status: {
            loading: false,
            error: false,
            msg: action.payload as string,
          },
        };
      }

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
      let {contacts, pageInfo} = action.payload as {
        contacts: ContactDetail[];
        pageInfo: PageInfo;
      };
      if (contacts.length !== 0) {
        if (pageInfo.prevPage === '') {
          contacts = contacts.map((contact) => {
            return {
              ...contact,
              image: contact.image ? IMAGE_URL + contact.image : contact.image,
            };
          });
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
          let _contacts = state.contacts || [];
          contacts = contacts.map((contact) => {
            return {
              ...contact,
              image: contact.image ? IMAGE_URL + contact.image : contact.image,
            };
          });
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
        }
      } else {
        if (pageInfo.prevPage === '') {
          return {
            ...state,
            contacts: [],
            status: {...state.status, loading: false, error: false},
            pageInfo: {
              prevPage: pageInfo.prevPage,
              page: Number(pageInfo.page) + 1,
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
      const newBalance =
        (state.user.details.balance as number) -
        Number(action.payload as string);
      return {
        ...state,
        user: {
          ...state.user,
          details: {
            ...state.user.details,
            balance: newBalance,
          },
        },
      };
    default:
      return state;
  }
}
