import styled from "@emotion/styled";
import { Link } from "gatsby";
import React, { useContext } from "react";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider";
import ButtonCollapse from "../ButtonCollapse";

const NavItem = ({ item }) => {
  const state = useContext(GlobalStateContext) || { state: 0 };
  const dispatch = useContext(GlobalDispatchContext) || { dispatch: 0 };
  const hasChildren = item.items && item.items.length > 0;
  var isCollapsed = state.collapsed[item.url];

  return (
    <StyledNavItem>
      <NavItemLink to={item.url} activeClassName="is-active">
        {item.myText}
      </NavItemLink>
      {hasChildren && (
        <ButtonCollapse
          onClick={() => {
            dispatch({ type: "TOGGLE_NAV_COLLAPSED", url: item.url });
          }}
          isCollapsed={!isCollapsed}
        />
      )}
      {hasChildren && isCollapsed && (
        <NavItemChild>
          {item.items.map((subItem) => (
            <NavItem key={"/" + item.url} item={subItem} />
          ))}
        </NavItemChild>
      )}
    </StyledNavItem>
  );
};

const StyledNavItem = styled.li`
  margin: 0rem 0rem 0.5rem 0.5rem;
  position: relative;
  display: block;
  padding: 0;
  width: 100%;
  list-style: none;
`;

const NavItemLink = styled(Link)`
  display: inline-block;
  overflow-wrap: break-word;
  padding: 0.5rem 1.8rem 0.5rem 1.2rem;
  width: 90%;
  color: ${(p) => p.theme.colors.text};
  font-weight: normal;
  border-left: 1px solid ${(p) => p.theme.colors.borderColor};
  text-decoration: none;
  transition: color ${(p) => p.theme.transition};
  &:focus,
  &:hover,
  &.is-active {
    border-left: 1px solid #01447e;
    color: #01447e;
  }
`;

const NavItemChild = styled.ul`
  margin: 0.5rem 0 0.5rem 0.5rem;
  padding: 0;
  list-style: none;
  & > li {
    margin: 0rem 0rem 0.3rem 0rem;
  }
`;

export default React.memo(NavItem);

/*
per cambiare il peso dei font figlio si può usare
const NavItemChild = styled.ul`
  margin: 0.5rem 0 0.5rem 0.5rem;
  padding: 0;
  list-style: none;
  & > li > a {
    margin: 0rem 0rem 0.3rem 0rem;
    font-weight: normal;
  }
`;
*/
