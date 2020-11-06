import styled, { css, keyframes } from 'styled-components';

export const colors = {
  primary: '#e57cd8',
  darkPrimary: '#c863bc',

  pinkLight: '#fce5d8',
  purpleDark: '#2c1338',

  backgroundDarkPrimary: '#564260',
  backgroundMedium: '#412a4c',
};

export const dynamicModalStyles = {
  overlay: {
    zIndex: 101,
    backgroundColor: 'transparent',
  },
  content: {
    boxShadow: '0px 0px 5px 0px #ccc',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontSize: '14px',
  },
};

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const buttonResets = css`
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;

  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const InputStyles = css`
  border: 1px solid #aaa;
  color: #333;
  font-size: 14px;
  border-radius: 6px;
  width: 100%;
  padding-left: 32px;
  height: 30px;
  font-family: Roboto, Helvica, sans-serif;

  &:focus {
    outline: none;
    border: none;
    background-color: #f5f5f5;
  }
`;

export const IconWrapper = styled.div`
  color: ${({ showBox }: { showBox: boolean }) => (showBox ? colors.primary : '#a1a1a1')};
  cursor: pointer;
  line-height: 0;
  margin-right: 15px;

  &:hover {
    color: #555;
  }
`;
