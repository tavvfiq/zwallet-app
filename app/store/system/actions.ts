import {
  StatusbarTheme,
  CHANGE_STATUSBAR_THEME,
  VALIDATE_TOKEN,
  SET_SYSTEM_SOCKET,
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

export function setSystemSocket(
  socket: SocketIOClient.Socket,
): SystemActionTypes {
  return {
    type: SET_SYSTEM_SOCKET,
    payload: socket,
  };
}
