import {
  StatusbarTheme,
  CHANGE_STATUSBAR_THEME,
  VALIDATE_TOKEN,
  SystemActionTypes,
  ENABLE_APP_NOTIFICATION,
} from './types';

export function changeStatusbarTheme(
  statusbarTheme: StatusbarTheme,
): SystemActionTypes {
  return {
    type: CHANGE_STATUSBAR_THEME,
    payload: statusbarTheme,
  };
}

export function validateSession(sessionIsValid: boolean): SystemActionTypes {
  return {
    type: VALIDATE_TOKEN,
    payload: sessionIsValid,
  };
}

export function enableAppNotification(enableNotif: boolean): SystemActionTypes {
  return {
    type: ENABLE_APP_NOTIFICATION,
    payload: enableNotif,
  };
}
