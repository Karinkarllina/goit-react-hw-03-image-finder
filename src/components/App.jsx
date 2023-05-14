import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';


export class App extends Component {
  
  state = {
    searchQuery: '',
  };


   handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

render() {

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery}/>
      </>
    );
  }
}

