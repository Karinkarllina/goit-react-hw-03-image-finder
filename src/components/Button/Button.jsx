import PropTypes from 'prop-types';
import css from './Button.module.css'


export const Button = ({ children, onClick = null }) => {
    return (
        <button type='button' onClick={onClick} className={css.btnLoadMore}>{children}</button>  
    )
    
}


Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
};