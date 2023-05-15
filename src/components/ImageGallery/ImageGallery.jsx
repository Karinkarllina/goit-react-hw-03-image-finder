import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getImagesAPI from 'services/getImages-api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';


export class ImageGallery extends Component {

    state = {
        searchQuery: '',
        page: 1,
        error: null,
        status: 'idle',
        images: [],
        totalPages: 0,

    }


    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;

        if (prevQuery !== nextQuery || prevState.page !== page) {
            this.setState({ status: 'pending' });

            getImagesAPI
                .getImages(nextQuery, page)
                .then(images => {
                    this.setState(prevState => ({
                        images: [...prevState.images, ...images.hits],
                        status: 'resolved',
                        
                    }));
                    })
                .catch(error => this.setState({ error, status: 'rejected' }), console.log('CATCH!'));

        } 

    }



    btnLoadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    };


    render() {
        
        if (this.state.status === 'idle') {
            console.log('start')
            return
        }
        if (this.state.status === 'pending') {
            console.log('load')
            return
        }

        if (this.state.status === 'rejected') {
           console.log('error message')
            return 

        }
     
        if (this.state.images.length === 0) {
            console.log('нічого!')
            return 
        }   

        if (this.state.status === 'resolved') {

            return (
                <>
                    <ul className="gallery">
                        {this.state.images.map(image  => (
                            <ImageGalleryItem
                                    key={image.id}
                                    item={image}
                                />
                        ))}
                    </ul>
                    <Button onClick={this.btnLoadMore}>Load More</Button>
                </>
            )
        }
    }
}


ImageGallery.propType = {
  searchQuery: PropTypes.string.isRequired,
};
