import {createContext} from 'react';

import {useModal} from '~/hooks';
import {Modal} from '~/components';

import {IModalContext, ModalContextProviderProps} from './types';

export const ModalContext = createContext<IModalContext>({
  modal: false,
  modalContent: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  render,
  children,
  ...rest
}) => {
  const useModalReturn = useModal();

  return (
    <ModalContext.Provider value={useModalReturn}>
      <div className="modal-back-content">
        <Modal {...rest} />
        {typeof render === 'function' ? render(useModalReturn) : children}
      </div>

      <div id="modal-root" />
    </ModalContext.Provider>
  );
};
