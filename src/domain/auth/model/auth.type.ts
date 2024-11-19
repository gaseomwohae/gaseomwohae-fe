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
