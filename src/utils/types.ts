import {DateTime} from 'luxon';

export interface loginType {
  email: string;
  password: string;
}

export interface registerType {
  username: string;
  email: string;
  password: string;
}

export interface transactionType {
  sender_id?: number;
  receiver_id: number;
  transaction_name: 'Transfer' | 'Subscription' | 'Top Up';
  transaction_type: 'in' | 'out';
  amount: number;
  notes?: string;
}

export interface updateUserType {
  username?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  pin?: string;
  newPin?: string;
  image?: any;
  phoneNumber?: number;
  numOfContact?: number;
}

export type RootStackParamList = {
  Transfer: {id: number};
  PinConfirmation: {
    pin: string;
    transactionData: transactionType;
    date: DateTime;
  };
  TransactionInfo: {amount: number; date: DateTime; notes: string};
  PersonalInfo: {username: string; email: string; phone: string};
  ChangePassword: {id: number};
};
