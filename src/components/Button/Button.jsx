import PropTypes from 'prop-types';
import { StyledBtn } from './Button.styled';

export const Button = ({ children, onClickLoadMore }) => {
  return (
    <StyledBtn type="button" onClick={onClickLoadMore}>
      {children}
    </StyledBtn>
  );
};

Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
