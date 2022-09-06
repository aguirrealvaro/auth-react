import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../App";
import { useNavbar } from "@/hooks";

export const Navbar: FunctionComponent = () => {
  const { items } = useNavbar();

  return (
    <Container>
      <Wrapper>
        <List>
          {items.map(({ label, url, onClick, enable = true }) => {
            if (!enable) return;

            return (
              <Item key={label}>
                {url ? (
                  <Link to={url}>{label}</Link>
                ) : (
                  <button onClick={onClick}>Log out</button>
                )}
              </Item>
            );
          })}
        </List>
      </Wrapper>
    </Container>
  );
};

const Container = styled.nav`
  height: 80px;
  box-shadow: rgb(0 0 0 / 12%) 0px 4px 4px;
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  gap: 2rem;
`;

const Item = styled.li`
  list-style: none;
`;
