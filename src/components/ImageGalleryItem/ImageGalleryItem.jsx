import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItemStyle } from './ImageGalleryItem.styled';
import { UseToggleModal } from 'hooks/useToggle.hooks';

export const ImageGalleryItem = ({ webURL, tags, largeURL }) => {
  const { isOpen, open, close } = UseToggleModal();
  return (
    <>
      <ImageGalleryItemStyle>
        <img src={webURL} alt={tags} onClick={open} />
        {isOpen && (
          <Modal closeModal={close}>
            <img src={largeURL} alt={tags} />
          </Modal>
        )}
      </ImageGalleryItemStyle>
    </>
  );
};

ImageGalleryItem.propTypes = {
  largeURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webURL: PropTypes.string.isRequired,
};
