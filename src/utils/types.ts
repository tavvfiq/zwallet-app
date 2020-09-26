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
}
