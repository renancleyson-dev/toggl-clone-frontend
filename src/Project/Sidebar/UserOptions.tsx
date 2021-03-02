import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { clearJsonWebToken } from 'src/axios';
import { USER_KEY, JWT_KEY } from 'src/helpers/constants';
import { buttonResets, dynamicModalStyles } from 'src/styles';

const modalStyles = {
  overlay: dynamicModalStyles.overlay,
  content: {
    ...dynamicModalStyles.content,
    left: '185px',
    top: '92%',
    height: '35px',
    width: '190px',
    padding: '8px',
  },
};

const OptionButton = styled.button`
  ${buttonResets}
  font-size: 15px;
  width: 100%;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function (props: Modal.Props) {
  const history = useHistory();
  const logout = () => {
    clearJsonWebToken();
    localStorage.setItem(USER_KEY, '');
    localStorage.setItem(JWT_KEY, '');

    history.push('/login');
  };

  return (
    <Modal style={modalStyles} {...props}>
      <OptionButton onClick={logout}>Log Out</OptionButton>
    </Modal>
  );
}
