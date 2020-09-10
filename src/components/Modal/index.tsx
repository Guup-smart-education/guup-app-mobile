import React, {ReactChild} from 'react';
import {Text, ModalProps} from 'react-native';
import {ModalContainer, Modal} from './_styled';

interface ICustomProps {
  children: ReactChild;
}

interface IModalProps extends ModalProps, ICustomProps {}

export default ({children, ...props}: IModalProps) => {
  return (
    <Modal
      // transparent
      animated
      animationType="slide"
      {...props}>
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  );
};
