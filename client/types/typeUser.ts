export type TAuth = {
  email: string;
  password: string;
};

export type TUser = TAuth & {
  uuid?: string;
  name: string;
};

export type TToken = {
  status: number;
  message: string;
  data: {
    name: string;
    email: string;
    token: string;
  };
};
