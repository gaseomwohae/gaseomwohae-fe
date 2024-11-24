export type SignUpForm = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  profileImage: string;
};

export type SignUpRequest = Omit<SignUpForm, 'passwordConfirm'>;

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
