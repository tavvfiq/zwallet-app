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
  transactionData: FormData;
}

export interface updateUserType {
  userdata?: FormData;
}

export type RootStackParamList = {
  Transfer: {id: number};
  PinConfirmation: {
    pin: string;
    data: FormData;
    date: DateTime;
  };
  TransactionInfo: {
    sender_id: number;
    receiver_id: number;
    amount: number;
    date: DateTime;
    notes: string;
    success: boolean;
  };
  PersonalInfo: {id: number; username: string; email: string; phone: string};
  ChangePassword: {id: number};
  ChangePin: {id: number; pin: string};
  AddPhoneNumber: {id: number};
  ManagePhoneNumber: {phoneNumber: string};
};
