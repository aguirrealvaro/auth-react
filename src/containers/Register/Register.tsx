import { FunctionComponent } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getEmailAvailability, registerUser } from "@/client";
import { Button, Input } from "@/components";
import { PageContainer, Wrapper } from "@/components/App";
import { EMAIL_REG_EXP } from "@/constants";
import { useForm } from "@/hooks";

type Fields = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register: FunctionComponent = () => {
  const { fields, errors, handleInputChange, handleBlur, handleSubmit } = useForm<Fields>({
    intialValues: { email: "", password: "", confirmPassword: "" },
    validations: {
      email: {
        required: {
          value: true,
          message: "Campo requerido",
        },
        pattern: {
          value: EMAIL_REG_EXP,
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

  const emailAvailabilityQuery = useQuery(
    ["email_availability", fields.email],
    getEmailAvailability,
    { enabled: false }
  );

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    handleBlur(e);

    const isValidEmail = RegExp(EMAIL_REG_EXP).test(e.currentTarget.value);

    if (isValidEmail) {
      emailAvailabilityQuery.refetch();
    }
  };

  const passwordsMatchError = (() => {
    const { password, confirmPassword } = fields;
    const hasContent = password && confirmPassword;
    const match = password === confirmPassword;
    if (hasContent && !match) {
      return "Las contraseñas deben coincidir" as string;
    }
  })();

  const unavailableEmailError = (() => {
    if (emailAvailabilityQuery.isSuccess && !emailAvailabilityQuery.data?.available) {
      return "Mail no disponible";
    }
  })();

  const onSubmit = () => {
    if (passwordsMatchError || unavailableEmailError) return;
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
              error={errors?.email || unavailableEmailError}
              name="email"
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              isLoading={emailAvailabilityQuery.isLoading}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              //type="password"
              placeholder="Contraseña"
              value={fields.password}
              error={errors?.password}
              name="password"
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              //type="password"
              placeholder="Confirmar contraseña"
              value={fields.confirmPassword}
              error={errors?.confirmPassword || passwordsMatchError}
              name="confirmPassword"
              onChange={handleInputChange}
              onBlur={handleBlur}
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
