import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getImagesAPI from 'services/getImages-api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ImageGallery.module.css'


export class ImageGallery extends Component {

    state = {
        searchQuery: '',
        page: 1,
        error: null,
        status: 'idle',
        images: [],
        showModal: false,
        totalPages: 0,

    }
  
    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;

        if (prevQuery !== nextQuery || prevState.page !== page) {
            this.setState({ status: 'pending' });
            
             if (prevQuery !== nextQuery)  {
            this.setState({page: 1})
          }

                getImagesAPI
                    .getImages(nextQuery, page)
                    .then(images => {
                        this.setState(prevState => ({
                            images: page === 1 ? images.hits : [...prevState.images, ...images.hits],
                            status: 'resolved',
                            totalPages: Math.floor(images.totalHits / 12),
                        }));
                    })
                    .catch(error => this.setState({ error, status: 'rejected' }));
            
        } 

    }


    btnLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    };

    modalOpen = modalOpen => {
    this.setState({ modalOpen, showModal: true });
  };

    modalClose = () => {
    this.setState({ showModal: false });
  };


    render() {
        
        if (this.state.status === 'idle') {
            console.log('start')
            return
        }
        if (this.state.status === 'pending') {
            console.log('load')
            return <Loader />     
        }

        if (this.state.status === 'rejected') {
            Notify.failure("Error!");
            return

        }
     
        if (this.state.images.length === 0) {
            return (
                <div className={css.notifySorry}>
                    <h1>Sorry, there are no images matching your search query. Please try again.</h1>
                </div>
            )
        }   

        if (this.state.status === 'resolved') {
            return (
                <>
                    <ul className={css.gallery}>
                        {this.state.images.map(image  => (
                            <ImageGalleryItem
                                    key={image.id}
                                    item={image}
                                    imageOpen={this.modalOpen}
                                />
                        ))}
                    </ul>

                    { this.state.page <= this.state.totalPages && (<Button onClick={this.btnLoadMore}/>)}
                    
                    {this.state.showModal && (
                        <Modal modalOpen={this.state.modalOpen} modalClose={this.modalClose}/>
                    )}
                </>
            )
        }
    }
}


ImageGallery.propType = {
  searchQuery: PropTypes.string.isRequired,
};
