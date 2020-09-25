export type StatusbarTheme = {
  backgorundColor: string;
};

export interface SystemState {
  statusbarTheme: StatusbarTheme;
}

export const CHANGE_STATUSBAR_THEME = 'CHANGE_STATUSBAR_THEME';

interface ChangeStatusbarTheme {
  type: typeof CHANGE_STATUSBAR_THEME;
  payload: StatusbarTheme;
}

export type SystemActionTypes = ChangeStatusbarTheme;
