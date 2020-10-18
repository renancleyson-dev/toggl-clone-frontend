import React, { useEffect } from 'react';

interface Props {
  handleDeleteToast: (toast: IToast) => void;
}

interface IToast {
  id: string;
}

export default function Toast({ handleDeleteToast }: Props) {
  useEffect(() => {
    setTimeout(handleDeleteToast, 1500);
  }, [handleDeleteToast]);

  return <div />;
}
