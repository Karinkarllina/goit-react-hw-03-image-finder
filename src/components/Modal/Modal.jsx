import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component { 

    componentDidMount() {
        window.addEventListener('keydown', this.hendleEscClose)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown',  this.hendleEscClose )  
    }

    hendleEscClose = event => {
        if (event.code === 'Escape') {
            this.props.modalClose()
        }
    }

    hendleBackdropClose = event => {
         if (event.target === event.currentTarget) {
            this.props.modalClose()
        }
    }

    render() {
        const { largeImageURL, tags } = this.props.modalOpen;

        return createPortal (
            <div className={css.modalBackdrop} onClick={this.hendleBackdropClose}>
                <div className={css.modalContent}>
                    <img src={largeImageURL} alt={tags} loading="lazy" />
                </div>
            </div>, 
            modalRoot
        );
    }
}

Modal.propTypes = {
    modalOpen: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
    modalClose: PropTypes.func.isRequired,
}