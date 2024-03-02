export type TUser = {
  username?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  token?: string;
  loading?: boolean;
  error?: boolean;
  avatar?: string | null;
};

export type TMessage = {
  username: string;
  password: string;
  avatar?: string;
  file?: string;
};
