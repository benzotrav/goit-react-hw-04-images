import PropTypes from 'prop-types';
import {useState} from 'react';
import {SearchBarStyled, SearchForm, SearchInput, ButtonSearch} from './SearchBar.styled';
import { toast } from 'react-toastify';


export const SearchBar = ({onSubmit}) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            return toast.error('Please enter a search query');
        }
        onSubmit(query);
        setQuery('');
    }

    return (
        <SearchBarStyled>
            <SearchForm onSubmit={handleSubmit}>
                <ButtonSearch type="submit"></ButtonSearch>
                <SearchInput
                    type="text"
                    name="query"
                    value={query}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </SearchForm>
        </SearchBarStyled>
    )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };




