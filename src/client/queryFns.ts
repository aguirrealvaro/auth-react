import { QueryFunctionContext } from "react-query";
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

type LoginUserDto = {
  email: string;
  password: string;
};

export type LoginUserReturn = {
  success: true;
  token: string;
  user: {
    id: number;
  };
};

export const loginUser = (body: LoginUserDto): Promise<LoginUserReturn> => {
  return fetcher("auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export type GetCurrentUserReturn = {
  id: number;
  email: string;
  password: string;
};

export const getCurrentUser = (): Promise<GetCurrentUserReturn> => {
  return fetcher("users/current");
};

type EmailAvailabilityReturn = {
  available: boolean;
};

type GetEmailAvailabilityQueryKeyType = [string, string | undefined];

export const getEmailAvailability = ({
  queryKey,
}: QueryFunctionContext<GetEmailAvailabilityQueryKeyType>): Promise<EmailAvailabilityReturn> => {
  const [, email] = queryKey;
  return fetcher(`users/email_availability/${email}`);
};
