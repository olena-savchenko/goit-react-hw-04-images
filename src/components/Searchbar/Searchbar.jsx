import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchBtn,
  StyledSearchInput,
  StyledSearchIcon,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  // контрольований інпут
  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    //заборона вводу порожнього рядка
    if (this.state.searchQuery.trim() === '') {
      toast.info('Enter a search name!');
      return;
    }

    this.props.handleSearch(this.state.searchQuery.trim());
    this.reset();
  };

  render() {
    return (
      <StyledSearchbar>
        <StyledSearchForm onSubmit={this.handleFormSubmit}>
          <StyledSearchInput
            type="text"
            autoComplete="off"
            name="searchQuery"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
          <StyledSearchBtn type="submit">
            <StyledSearchIcon />
          </StyledSearchBtn>
        </StyledSearchForm>
      </StyledSearchbar>
    );
  }
}
