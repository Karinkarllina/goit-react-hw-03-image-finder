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

    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
        // console.log(prevQuery)
        // console.log(nextQuery)

        if (prevQuery !== nextQuery) {
            this.setState({ status: 'pending' });
            // console.log('Изменилось имя')
            // console.log(prevQuery)
            // console.log(nextQuery)
            getImagesAPI
            .getImages(nextQuery)
                .then(images => this.setState({
                    images,
                    status: 'resolved'
                }))
                .catch(error => this.setState({ error, status: 'rejected' }));

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
            console.log('error')
             return
        }
    
        if (this.state.status === 'resolved') {
            return (
                <>
                    <ul className="gallery">

                        {this.state.images.hits.map(({ webformatURL }) => {
                            return (
                            <li className="gallery-item">
                                <img src={webformatURL} alt="" />
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

