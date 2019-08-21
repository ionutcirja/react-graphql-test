import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  a {
    margin-right: 20px;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const NavLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  color: ${({ color }) => color};
  
  &:hover {
    text-decoration: underline;
  }
`;
