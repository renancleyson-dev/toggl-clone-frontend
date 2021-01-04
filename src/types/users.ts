export interface IUser {
  id: number;
  email: string;
}

export interface IRegistration {
  email: string;
  country: string;
  password: string;
}

export interface ISession extends IUser {
  authToken: string;
}
