import { fetcher } from "./fetcher";

type RegisterUserDto = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterUserReturn = {
  id: number;
  email: string;
  password: string;
};

export const registerUser = (body: RegisterUserDto): Promise<RegisterUserReturn> => {
  return fetcher("auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
