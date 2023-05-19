import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { BsFillSearchHeartFill } from "react-icons/bs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


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
            Notify.info('Please enter your request and try again');
            return 
        }
        this.props.onSubmit(this.state.searchQuery);
    };


    
    render() {


    return (   
    <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.buttonSerach}>
                    <span className={css.buttonLabel}>
                        <BsFillSearchHeartFill size="22" />
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};