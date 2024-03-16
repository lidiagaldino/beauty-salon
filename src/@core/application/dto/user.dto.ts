export type TInputUserDTO = {
  name: string;
  login: string;
  password?: string;
};

export type TInputUpdateUserDTO = Pick<TInputUserDTO, 'name'>;

export type TOutputUserDTO = {
  id: number;
  name: string;
  login: string;
};
