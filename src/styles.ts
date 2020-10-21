import styled from 'styled-components';

export const colors = {
  primary: '#e57cd8',

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
