import {
  SystemState,
  SystemActionTypes,
  CHANGE_STATUSBAR_THEME,
  SET_SYSTEM_SOCKET,
  VALIDATE_TOKEN,
  ENABLE_APP_NOTIFICATION,
} from './types';

const initialState: SystemState = {
  statusbarTheme: {
    backgroundColor: '#6379F4',
    barStyle: 'light-content',
  },
  sessionIsValid: false,
  enableNotification: false,
  socket: null,
};

export function systemReducer(
  state = initialState,
  action: SystemActionTypes,
): SystemState {
  switch (action.type) {
    case CHANGE_STATUSBAR_THEME:
      return {
        ...state,
        statusbarTheme: {
          barStyle: action.payload.barStyle,
          backgroundColor: action.payload.backgroundColor,
        },
      };
    case VALIDATE_TOKEN:
      if (action.payload) {
        return {
          ...state,
          sessionIsValid: action.payload,
        };
      } else {
        state.socket?.close();
        return initialState;
      }
    case ENABLE_APP_NOTIFICATION:
      return {
        ...state,
        enableNotification: action.payload,
      };
    case SET_SYSTEM_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}
