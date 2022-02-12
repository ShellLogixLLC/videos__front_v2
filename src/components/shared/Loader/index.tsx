import React from 'react';

import {LoaderTypes} from './types';
import VerticalLoader from './VerticalLoader';
import HorizontalLoader from './HorizontalLoader';

const FlexLoading: React.FC<LoaderTypes> = ({isSection, isVertical}) =>
  isVertical ? <HorizontalLoader /> : <VerticalLoader isSection={isSection} />;

export default FlexLoading;
