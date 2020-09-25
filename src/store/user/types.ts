type UserCredentials = {
  id: number;
  username: string;
  email: string;
  token: string;
};

type UserDetails = {
  image: string;
  phoneNumber: string;
  balance: number;
  numOfContact: number;
};

export interface UserState {
  credentials: UserCredentials;
  details: UserDetails;
}
