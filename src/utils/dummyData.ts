import {CardProps} from '../components/UserCard/propsType';

type CardPropsList = CardProps[];

type User = {
  id: number;
  name: string;
  image_path: string;
  phone_number: number;
  balance: number;
};

export const UserTransactionData: CardPropsList = [
  {
    id: 12345,
    name: 'Taufiq Widi',
    image_path: '',
    transaction_name: 'Transfer',
    transaction_type: 'in',
    amount: 1500000,
  },
  {
    id: 18972,
    name: 'Netflix',
    image_path: '',
    transaction_name: 'Subscription',
    transaction_type: 'out',
    amount: 50000,
  },
  {
    id: 13542,
    name: 'Spotify',
    image_path: '',
    transaction_name: 'Subscription',
    transaction_type: 'out',
    amount: 49000,
  },
  {
    id: 19982,
    name: 'Samuel Suhi',
    image_path: '',
    transaction_name: 'Transfer',
    transaction_type: 'in',
    amount: 100000,
  },
];
