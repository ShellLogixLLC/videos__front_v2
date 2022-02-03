import React from 'react';
import {useRouter} from 'next/router';

import {Route} from '~/constants';

import Button from '../Button';

import {BackButtonProps} from './types';

const BackButton: React.FC<BackButtonProps> = ({text, LeftIcon, className}) => {
  const router = useRouter();

  const backHandler = () => {
    if (router.back() === undefined) {
      return Route.Home;
    }
    router.back();
  };

  return (
    <Button className={className} onClick={backHandler}>
      {LeftIcon ? <LeftIcon /> : null}
      {text}
    </Button>
  );
};

export default BackButton;
