import React from 'react';

export type LogOutModalProps = {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  close?: boolean;
  setClose?: React.Dispatch<React.SetStateAction<boolean>>;
};
