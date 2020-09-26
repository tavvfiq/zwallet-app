export type StatusbarTheme = {
  backgorundColor: string;
};

export interface SystemState {
  statusbarTheme: StatusbarTheme;
  sessionIsValid: boolean;
}

export const CHANGE_STATUSBAR_THEME = 'CHANGE_STATUSBAR_THEME';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';

export interface ChangeStatusbarTheme {
  type: typeof CHANGE_STATUSBAR_THEME;
  payload: StatusbarTheme;
}

export interface validateSession {
  type: typeof VALIDATE_TOKEN;
  payload: boolean;
}

export type SystemActionTypes = validateSession | ChangeStatusbarTheme;
