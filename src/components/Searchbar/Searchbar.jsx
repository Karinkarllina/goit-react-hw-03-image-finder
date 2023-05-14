import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class Searchbar extends Component {
    state = {
        searchQuery: '',
    };
    
    handleChange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.searchQuery.trim() === '') {
            alert('Oops!');
            return 
        }
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    };


    
    render() {


    return (   
    <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
            <span className="buttonLabel">Search</span>
            </button>
            <input
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.searchQuery}
                onChange={this.handleChange}
            />
        </form>
    </header>
    );
    }
    
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};