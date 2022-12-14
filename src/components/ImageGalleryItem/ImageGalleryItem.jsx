import { GalleryItem } from './ImageGalleryItem.styled.js';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, preview, alt, toggleLargeMode }) => {
  return (
    <GalleryItem
      onClick={() => {
        toggleLargeMode({ url, alt });
      }}
    >
      <img alt={alt} src={preview} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  alt: PropTypes.string,
  toggleLargeMode: PropTypes.func,
};