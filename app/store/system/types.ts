export type StatusbarTheme = {
  backgroundColor: string;
  barStyle: string;
};

export interface SystemState {
  statusbarTheme: StatusbarTheme;
  enableNotification: boolean;
  sessionIsValid: boolean;
  socket?: SocketIOClient.Socket;
}

export const CHANGE_STATUSBAR_THEME = 'CHANGE_STATUSBAR_THEME';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';
export const ENABLE_APP_NOTIFICATION = 'ENABLE_APP_NOTIFICATION';
export const SET_SYSTEM_SOCKET = 'SET_SYSTEM_SOCKET';

export interface ChangeStatusbarTheme {
  type: typeof CHANGE_STATUSBAR_THEME;
  payload: StatusbarTheme;
}

export interface validateSession {
  type: typeof VALIDATE_TOKEN;
  payload: boolean;
}

export interface enableAppNotification {
  type: typeof ENABLE_APP_NOTIFICATION;
  payload: boolean;
}

export interface setSystemSocket {
  type: typeof SET_SYSTEM_SOCKET;
  payload: SocketIOClient.Socket;
}

export type SystemActionTypes =
  | validateSession
  | ChangeStatusbarTheme
  | enableAppNotification
  | setSystemSocket;
