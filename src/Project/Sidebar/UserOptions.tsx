import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { clearJsonWebToken } from 'src/axios';
import { JWT_KEY } from 'src/helpers/constants';
import { buttonResets, dynamicModalStyles } from 'src/styles';

const modalStyles = {
  overlay: dynamicModalStyles.overlay,
  content: {
    ...dynamicModalStyles.content,
    left: '185px',
    bottom: '2%',
    top: 'auto',
    height: 'min-content',
    width: '190px',
    padding: '10px',
  },
};

export default function (props: Modal.Props) {
  const history = useHistory();
  const logout = () => {
    clearJsonWebToken();
    localStorage.setItem(JWT_KEY, '');

    history.push('/login');
  };

  return (
    <Modal style={modalStyles} {...props}>
      <OptionButton onClick={logout}>Log Out</OptionButton>
    </Modal>
  );
}

const OptionButton = styled.button`
  ${buttonResets}
  font-size: 15px;
  width: 100%;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;
