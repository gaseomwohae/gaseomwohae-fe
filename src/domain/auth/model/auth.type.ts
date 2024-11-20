export type SignUpRequest = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  profile: string;
};
