import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Content } from './Modal-styled';

const modalRoot = document.querySelector('#modal-root'); 

export class Modal extends Component { 
  
  componentDidMount() { 
    document.addEventListener('keydown', this.handleKeyDown); 
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown); 
  }

  handleKeyDown = (e) => { 
    if (e.key === 'Escape') { 
      this.props.onClose(); 
    }
  }

  handleOverlayClick = event => { 
     if (event.currentTarget === event.target) { 
       this.props.onClose(); 
     }
   };

   render() {
    return createPortal( 
      <Overlay onClick={this.handleOverlayClick}>
        <Content>{this.props.children}</Content>
      </Overlay>,
      modalRoot 
    );
  }
}


Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};