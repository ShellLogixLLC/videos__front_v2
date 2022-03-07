import React from 'react';
import {NextPage} from 'next';

import {Seo, Video} from '~/components';

// Temporary
const VIDEO_LENGTH = 15.5;
const VIDEO_SRC =
  'https://ext-strm-marrt06.strm.yandex.net/vh-adfox-converted/vod-content/16387348952540192181/b6f8bc26-75461fcb-cf46575d-42dc83a8_169_480p.mp4?noredir=1&lid=1520';

const HomePage: NextPage = () => {
  return (
    <Seo title="Home page" metaDescription="Home page description">
      <Video videoDuration={VIDEO_LENGTH} videoSrc={VIDEO_SRC} />
    </Seo>
  );
};

export default HomePage;
