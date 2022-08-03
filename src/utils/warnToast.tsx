import {toast} from 'react-toastify';

import {Button, Typography} from '~/components';

const WarnToast = (id: string, handler: () => void): void => {
  toast.warn(
    <div className="warn_toast">
      <Typography className="warn_toast_description">areYouSure</Typography>
      <Button onClick={handler} className="warn_toast_button">
        <Typography className="warn_toast_button_title">undo</Typography>
      </Button>
    </div>,
    {
      position: 'top-right',
      autoClose: 15000,
    },
  );
};

export default WarnToast;
