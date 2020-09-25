import {
  StatusbarTheme,
  CHANGE_STATUSBAR_THEME,
  SystemActionTypes,
} from './types';

export function changeStatusbarTheme(
  statusbarTheme: StatusbarTheme,
): SystemActionTypes {
  return {
    type: CHANGE_STATUSBAR_THEME,
    payload: statusbarTheme,
  };
}
