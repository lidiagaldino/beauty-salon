export type TInputLogin = {
  login: string;
  password: string;
};

export type TOutputLogin<T> = {
  token: string;
  user: T;
};
