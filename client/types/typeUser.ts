export type TAuth = {
  email: string;
  password: string;
};

export type TUser = TAuth & {
  name: string;
};
