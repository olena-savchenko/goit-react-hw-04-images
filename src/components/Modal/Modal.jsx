import { StyledOverlay } from './Modal.styled';
import { StyledModal } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { createPortal } from 'react-dom';
// const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, children }) => {
 
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === `Escape`) {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);


   const onClickOverlay = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <StyledOverlay onClick={onClickOverlay}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  // children: PropTypes.any.isRequired,
};

