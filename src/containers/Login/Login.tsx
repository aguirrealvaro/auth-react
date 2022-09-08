import { FunctionComponent } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { loginUser, LoginUserReturn } from "@/client";
import { Button, Input } from "@/components";
import { PageContainer, Wrapper } from "@/components/App";
import { useSession } from "@/contexts";
import { useForm } from "@/hooks";

type Fields = {
  email: string;
  password: string;
};

export const Login: FunctionComponent = () => {
  const { fields, errors, handleInputChange, handleBlur, handleSubmit } = useForm<Fields>({
    intialValues: { email: "", password: "" },
    validations: {
      email: {
        required: {
          value: true,
          message: "Campo requerido",
        },
        custom: {
          isValid: (value) => value.includes("@") && value.includes("."),
          message: "Mail invalido",
        },
      },
      password: {
        required: {
          value: true,
          message: "Campo requerido",
        },
      },
    },
  });

  const { handleLogIn } = useSession();

  const onSuccess = ({ token }: LoginUserReturn) => {
    handleLogIn(token);
  };

  const mutation = useMutation(loginUser, { onSuccess });

  const onSubmit = () => {
    mutation.mutate(fields);
  };

  return (
    <PageContainer>
      <Wrapper>
        <Title>Login</Title>
        <form noValidate onSubmit={(e) => handleSubmit(e, onSubmit)}>
          <InputWrapper>
            <Input
              placeholder="Email"
              value={fields.email}
              error={errors?.email}
              name="email"
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              placeholder="Contraseña"
              value={fields.password}
              error={errors?.password}
              name="password"
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </InputWrapper>
          {!!mutation.error && <Error>{JSON.stringify(mutation.error)}</Error>}
          <ButtonWrapper>
            <Button block type="submit" isLoading={mutation.isLoading}>
              Iniciar sesion
            </Button>
          </ButtonWrapper>
        </form>
      </Wrapper>
    </PageContainer>
  );
};

const Title = styled.h2`
  margin-bottom: 2rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Error = styled.div`
  font-size: 14px;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.red};
`;
