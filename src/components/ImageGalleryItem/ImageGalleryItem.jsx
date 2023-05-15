import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item }) => {
  const { tags, webformatURL } = item;

    return (
        <li className='galeryItem'>
                <img src={webformatURL} alt={tags} loading="lazy" />
        </li>
    );
};


ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
//   onImageClick: PropTypes.func.isRequired,
};




