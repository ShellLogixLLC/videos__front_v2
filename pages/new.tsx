import React from 'react';
import {NextPage} from 'next';

import {Seo, Typography} from '~/components';

const NewPage: NextPage = () => (
  <Seo title="New page" metaDescription="New page description">
    <Typography tagName="div" align="right" variant="Text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus
      accusantium quibusdam consequuntur recusandae soluta amet nostrum non,
      incidunt accusamus commodi tenetur in animi dolorum dolores. Deserunt esse
      nulla unde!
    </Typography>
  </Seo>
);

export default NewPage;
