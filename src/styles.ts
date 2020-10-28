import styled, { css } from 'styled-components';

export const colors = {
  primary: '#e57cd8',
  darkPrimary: '#c863bc',

  pinkLight: '#fce5d8',
  purpleDark: '#2c1338',

  backgroundDarkPrimary: '#564260',
  backgroundMedium: '#412a4c',
};

export const AddButtonWrapper = styled.div`
  min-width: 100%;
  padding: 10px 0;
  border-top: 1px solid rgb(251, 229, 247);
  text-align: center;
  cursor: pointer;
`;

export const StackedBox = styled.div`
  position: absolute;
  top: 35px;
  right: -130px;
  padding-top: 15px;
  box-shadow: 0px 0px 7px 1px #ccc;
  border-radius: 8px;
  background-color: #fff;
  z-index: 100;
`;

export const CreateButton = styled.div`
  min-width: 100%;
  margin-top: 30px;
  padding: 7px 0;
  text-align: center;
  border-radius: 8px;
  background-color: ${colors.primary};
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkPrimary};
  }
`;

export const InputStyles = css`
  border: 1px solid #aaa;
  color: #333;
  font-size: 14px;
  border-radius: 6px;
  width: 93%;
  padding-left: 32px;
  height: 30px;
  font-family: Roboto, Helvica, sans-serif;

  &:focus {
    outline: none;
    border: none;
    background-color: #f5f5f5;
  }
`;
