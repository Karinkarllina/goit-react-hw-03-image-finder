import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ item, imageOpen }) => {
  const {  webformatURL, tags, largeImageURL } = item;

    return (
      <li className={css.galeryItem}
        onClick={event => {
          event.preventDefault();
          imageOpen({ largeImageURL, tags });
        }}>
        <img src={webformatURL} alt={tags} loading="lazy" className={css.image} />
        </li>
    );
};


ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  imageOpen: PropTypes.func.isRequired,
};




