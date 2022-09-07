import { FunctionComponent } from "react";
import styled from "styled-components";
import { PageContainer, Wrapper } from "@/components/App";

export const Home: FunctionComponent = () => {
  return (
    <PageContainer>
      <Wrapper>
        <Title>Home</Title>
      </Wrapper>
    </PageContainer>
  );
};

const Title = styled.h2`
  margin-bottom: 2rem;
`;
