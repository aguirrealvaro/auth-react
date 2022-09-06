import { FunctionComponent } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser, LoginUserReturn } from "@/client";
import { Button, Input } from "@/components";
import { PageContainer, Title, Wrapper } from "@/components/App";
import { useSession } from "@/contexts";
import { useForm } from "@/hooks";

type Fields = {
  email: string;
  password: string;
};

export const Login: FunctionComponent = () => {
  const { fields, errors, handleInputChange, handleSubmit } = useForm<Fields>({
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

  const navigate = useNavigate();

  const { setIsAuth } = useSession();

  const onSuccess = ({ token }: LoginUserReturn) => {
    localStorage.setItem(process.env.AUTH_TOKEN || "auth-token", token);
    setIsAuth(true);
    navigate("/");
  };

  const mutation = useMutation(loginUser, { onSuccess });

  const onSubmit = () => {
    mutation.mutate(fields);
  };

  return (
    <PageContainer>
      <Wrapper>
        <Title>Login</Title>
        <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
          <InputWrapper>
            <Input
              placeholder="Email"
              value={fields.email}
              error={errors?.email}
              name="email"
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Contraseña"
              value={fields.password}
              error={errors?.password}
              name="password"
              onChange={handleInputChange}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button block type="submit" isLoading={false}>
              Iniciar sesion
            </Button>
          </ButtonWrapper>
        </form>
      </Wrapper>
    </PageContainer>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
