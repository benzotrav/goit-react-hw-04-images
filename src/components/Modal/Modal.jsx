import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect} from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImg, onClose, alt }) => { 
    useEffect(() => {
        const handleKeyDown = e => {
          if (e.code === 'Escape') {
            onClose();
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [onClose]);

     const handleOverlayClick = event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }
      console.log(largeImg);
      
      return createPortal(
        <Overlay onClick={handleOverlayClick}>
            <ModalContent>
              <img src={largeImg} alt={alt} />
            </ModalContent>
        </Overlay>,
        modalRoot
        );
       
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
 
