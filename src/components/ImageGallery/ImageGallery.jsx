import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <StyledImageGallery>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          // передача як props посилання на функцію відкриття/закриття модалки
          toggleModal={toggleModal}
        />
      ))}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  toggleModal: PropTypes.func.isRequired,
};
