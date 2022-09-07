import { FunctionComponent } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "@/client";
import { Button, Input } from "@/components";
import { PageContainer, Wrapper } from "@/components/App";
import { useForm } from "@/hooks";

type Fields = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register: FunctionComponent = () => {
  const { fields, errors, handleInputChange, handleSubmit } = useForm<Fields>({
    intialValues: { email: "", password: "", confirmPassword: "" },
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
      confirmPassword: {
        required: {
          value: true,
          message: "Campo requerido",
        },
      },
    },
  });

  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/login");
  };

  const mutation = useMutation(registerUser, { onSuccess });

  const passwordsMatchError = (() => {
    const { password, confirmPassword } = fields;
    const hasContent = password && confirmPassword;
    const match = password === confirmPassword;
    if (hasContent && !match) {
      return "Las contraseñas deben coincidir" as string;
    }
  })();

  const onSubmit = () => {
    if (passwordsMatchError) return;
    mutation.mutate(fields);
  };

  return (
    <PageContainer>
      <Wrapper>
        <Title>Register</Title>
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
          <InputWrapper>
            <Input
              placeholder="Confirmar contraseña"
              value={fields.confirmPassword}
              error={errors?.confirmPassword || passwordsMatchError}
              name="confirmPassword"
              onChange={handleInputChange}
            />
          </InputWrapper>
          {!!mutation.error && <Error>{JSON.stringify(mutation.error)}</Error>}
          <ButtonWrapper>
            <Button block type="submit" isLoading={mutation.isLoading}>
              Registarse
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
