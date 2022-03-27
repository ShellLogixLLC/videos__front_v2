import React from 'react';
import {useTranslation} from 'next-i18next';

import {Category} from '~/containers';
import {Pagination, Typography} from '~/components';
import {INITIAL_PAGINATION_DATA_LENGTH} from '~/constants';

const Horizontalslider: React.FC = () => {
  const {t} = useTranslation();

  return (
    <>
      <Typography variant="Heading" type="Extra">
        {t('common.newVideos')}
      </Typography>
      <div style={{position: 'relative'}}>
        <Category />
        <Pagination isRight dataLength={INITIAL_PAGINATION_DATA_LENGTH} />
      </div>
    </>
  );
};

export default Horizontalslider;
