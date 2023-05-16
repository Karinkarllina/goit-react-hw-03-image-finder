import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { ReactComponent as SearchBtn } from '../Icons/search.svg';


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
    <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.buttonSerach}>
                    <span className={css.buttonLabel}>
                        <SearchBtn />
                    </span>
            </button>
            <input
                className={css.input}
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