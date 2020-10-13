import React from 'react';
import { Wrapper, FormBoxWrapper } from '../Auth/Styles';
import Header from '../Auth/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Header />
      <FormBoxWrapper>{children}</FormBoxWrapper>
    </Wrapper>
  );
}
