import styled from 'styled-components';

export const Button = styled.input`
  display: inline-block;
  border-radius: 5px;
  padding: 0.5rem 0;
  margin: 1rem 1rem;
  width: 11rem;
  background: #222831;
  color: white;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 20px;

  :active {
    transform: translateY(2px);
    transition: transform 0.2s ease;
  }

  :hover {
    transform: scale(1.1);
  }
`;
