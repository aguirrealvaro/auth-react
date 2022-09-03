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

export const registerUser = ({
  email,
  password,
  confirmPassword,
}: RegisterUserDto): Promise<RegisterUserReturn> => {
  //console.log({ email, password, confirmPassword });
  return fetcher("auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, confirmPassword }),
  });
};
