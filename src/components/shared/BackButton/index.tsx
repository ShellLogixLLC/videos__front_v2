import React from 'react';
import {useRouter} from 'next/router';

import Button from '../Button';

import {BackButtonProp} from './types';

const BackButton: React.FC<BackButtonProp> = ({text, LeftIcon, className}) => {
  const router = useRouter();

  return (
    <Button className={className} onClick={() => router.back()}>
      <LeftIcon />
      {text}
    </Button>
  );
};

export default BackButton;
