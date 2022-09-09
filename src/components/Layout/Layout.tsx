import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../Navbar";

export const Layout: FunctionComponent = () => {
  return (
    <Container>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Main = styled.main`
  flex: 1;
`;
