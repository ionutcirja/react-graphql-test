import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BackLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: ${({ color }) => color};
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Message = styled.span`
  display: block;
  font-size: 1rem;
  margin-top: 40px;
  color: ${({ color }) => color};
`;

export const List = styled.ul`
  margin-top: 40px;
  font-size: 1.2rem;
`;

export const SubList = styled.ul`
  margin-top: 10px;
  font-size: 0.8rem;
  padding-left: 20px;
  list-style-type: disc;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  color: ${({ color }) => color};
`;

export const ListLink = styled(Link)`
  text-decoration: none;
  color: ${({ color }) => color};
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ListTitle = styled.h1`
  font-size: 1.4rem;
  color: ${({ color }) => color};
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const Details = styled.span`
  display: block;
  font-size: 1rem;
  color: ${({ color }) => color};
  margin-bottom: 10px;
`;
