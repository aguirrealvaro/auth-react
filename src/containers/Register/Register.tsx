import { FunctionComponent } from "react";
import styled from "styled-components";
import { Button, Input } from "@/components";
import { PageContainer, Wrapper, Title } from "@/components/App";
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
    // eslint-disable-next-line no-console
    console.log(fields);
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
              type="password"
              placeholder="Contraseña"
              value={fields.password}
              error={errors?.password}
              name="password"
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              value={fields.confirmPassword}
              error={errors?.confirmPassword || passwordsMatchError}
              name="confirmPassword"
              onChange={handleInputChange}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button block type="submit">
              Registarse
            </Button>
          </ButtonWrapper>
        </form>
      </Wrapper>
    </PageContainer>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
