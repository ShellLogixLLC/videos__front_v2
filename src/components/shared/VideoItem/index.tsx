import React, {useRef} from 'react';

const VideItem: React.FC = () => {
  const videoElement = useRef(null);

  return (
    <video
      width="660"
      height="500"
      controls
      src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      //   type="video/mp4"
      ref={videoElement}
    />
  );
};

export default VideItem;
