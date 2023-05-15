import PropTypes from 'prop-types';


export const Button = ({ children, onClick = null }) => {
    return (
        <button type='button' onClick={onClick}>{children}</button>  
    )
    
}


Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
};