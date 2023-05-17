import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchBtn,
  StyledSearchInput,
  StyledSearchIcon,
} from './Searchbar.styled';

export const Searchbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // контрольований інпут
  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    //заборона вводу порожнього рядка
    if (searchQuery.trim() === '') {
      toast.info('Enter a search name!');
      return;
    }

    handleSearch(searchQuery.trim());
    // очищуємо форму
    setSearchQuery('');
  };

  return (
    <StyledSearchbar>
      <StyledSearchForm onSubmit={handleFormSubmit}>
        <StyledSearchInput
          type="text"
          autoComplete="off"
          name="searchQuery"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <StyledSearchBtn type="submit">
          <StyledSearchIcon />
        </StyledSearchBtn>
      </StyledSearchForm>
    </StyledSearchbar>
  );
};

