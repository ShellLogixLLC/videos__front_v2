import React from 'react';
import {useRouter} from 'next/router';

import {Route} from '~/constants';

import Button from '../Button';

import {BackButtonProp} from './types';

const BackButton: React.FC<BackButtonProp> = ({text, LeftIcon, className}) => {
  const router = useRouter();

  const backHandler = () => {
    if (router.back() === undefined) {
      return Route.Home;
    }
    router.back();
  };

  return (
    <Button className={className} onClick={backHandler}>
      <LeftIcon />
      {text}
    </Button>
  );
};

export default BackButton;
