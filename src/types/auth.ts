export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
};

export type TokenType = {
  access_token: string;
  refresh_token: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
};
