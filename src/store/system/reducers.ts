import {
  SystemState,
  SystemActionTypes,
  CHANGE_STATUSBAR_THEME,
  VALIDATE_TOKEN,
} from './types';

const initialState: SystemState = {
  statusbarTheme: {backgorundColor: ''},
  sessionIsValid: false,
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
          ...state.statusbarTheme,
          backgorundColor: action.payload.backgorundColor,
        },
      };
    case VALIDATE_TOKEN:
      return {
        ...state,
        sessionIsValid: action.payload,
      };
    default:
      return state;
  }
}
