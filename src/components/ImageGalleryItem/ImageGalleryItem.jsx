import PropTypes from 'prop-types';
import { StyledImage, StyledImageGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, toggleModal }) => {
  const { webformatURL, largeImageURL, tags } = image;

  return (
    <StyledImageGalleryItem>
      <StyledImage
        src={webformatURL}
        alt={tags}
        onClick={() => toggleModal(largeImageURL, tags)}
      />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
