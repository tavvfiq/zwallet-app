import {
  SystemState,
  SystemActionTypes,
  CHANGE_STATUSBAR_THEME,
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
      return {
        ...state,
        sessionIsValid: action.payload,
      };
    case ENABLE_APP_NOTIFICATION:
      return {
        ...state,
        enableNotification: action.payload,
      };
    default:
      return state;
  }
}
