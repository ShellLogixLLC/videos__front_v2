import {ModalProps} from '~/components/views/Modal/types';

export interface IModalContext {
  modal: boolean;
  closeModal: () => void;
  modalContent?: JSX.Element | null;
  openModal: (content?: JSX.Element) => void;
}

export type ModalContextProviderProps = ModalProps & {
  render?(props: IModalContext): JSX.Element;
};
