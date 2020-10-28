export interface IUser {
  id: number;
  fullName: string;
  email: string;
}

export interface IRegistration {
  fullName: string;
  email: string;
  country: string;
  password: string;
  passwordConfirmation: string;
  username: string;
}

export interface ISession extends IUser {
  authToken: string;
}
