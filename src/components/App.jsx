import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css'


export class App extends Component {
  
  state = {
    searchQuery: '',
  };


   handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

render() {

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery}/>
      </div>
    );
  }
}

