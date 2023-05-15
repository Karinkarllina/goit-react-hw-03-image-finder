import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  getImagesAPI  from 'services/getImages-api';


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
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
        // console.log(prevQuery)
        // console.log(nextQuery)


        if (prevQuery !== nextQuery) {
            this.setState({ status: 'pending'});
            // console.log('Изменилось имя')
            // console.log(prevQuery)
            // console.log(nextQuery)
            getImagesAPI
            .getImages(nextQuery)
                .then(images => this.setState({
                    images,
                    status: 'resolved'
                }))
                .catch(error => this.setState({ error, status: 'rejected'}), console.log('CATCH!'));

        } 

    }

           
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
        // if (this.state.images.length === 0) {
        //     alert('Sorry, there are no images matching your search query. Please try again.')
        //     return
        // }
    
        if (this.state.status === 'resolved') {
            return (
                <>
                    <ul className="gallery">

                        {this.state.images.hits.map(({ id, webformatURL, tags }) => {
                            return (
                            <li key={id} className="gallery-item">
                                <img src={webformatURL} alt={tags} />
                            </li> 
                            )
                        }

                        )}  
                </ul>
                </>
                
            )
        }


    }
}


ImageGallery.propType = {
  searchQuery: PropTypes.string.isRequired,
};

