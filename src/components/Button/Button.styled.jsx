import styled from 'styled-components';

export const StyledBtn = styled.button`
  padding: 8px 16px;
  border-radius: 2px;
  /* background-color: #3f51b5; */
  background: radial-gradient(
    circle,
    rgba(196, 218, 220, 1) 19%,
    rgba(63, 81, 181, 1) 100%
  );
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: rgba(63, 81, 181, 0.7);
  text-transform: uppercase;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  :hover,
  :focus {
    color: #303f9f;
  }
`;
