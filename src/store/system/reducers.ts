import {SystemState, SystemActionTypes, CHANGE_STATUSBAR_THEME} from './types';

const initialState: SystemState = {
  statusbarTheme: {backgorundColor: ''},
};

export function systemReducer(
  state = initialState,
  action: SystemActionTypes,
): SystemState {
  switch (action.type) {
    case CHANGE_STATUSBAR_THEME:
      return {
        statusbarTheme: {
          ...state.statusbarTheme,
          backgorundColor: action.payload.backgorundColor,
        },
      };
    default:
      return state;
  }
}
