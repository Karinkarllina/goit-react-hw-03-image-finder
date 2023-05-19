import PropTypes from 'prop-types';
import css from './Button.module.css'


export const Button = ({ children, onClick = null }) => {
  return (
    <div className={css.buttonLoadWrap}>
      <button type='button' onClick={onClick} className={css.btnLoadMore}>Load More</button>
    </div>
    )
    
}


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};