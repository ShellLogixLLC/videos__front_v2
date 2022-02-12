import Modal from '.';

export type ModalAnimation = 'reveal' | 'blow' | 'sketch' | 'bond';

export type ModalProps = {
  contentStyles?: string;
  containerStyles?: string;
  backgroundClasses?: string;
  animation?: ModalAnimation;
};

export type ModalTypeof = typeof Modal;
