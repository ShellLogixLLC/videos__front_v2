import {toast} from 'react-toastify';

import {ErrorToast} from './types';

const errorToast = (data: ErrorToast[]) => {
  data.map((el: ErrorToast, idx: number) => {
    const errMassage = Object.values(el);

    toast.error(
      <p key={idx} className="toast_error_style">
        {errMassage}
      </p>,
    );
  });
};

export default errorToast;
