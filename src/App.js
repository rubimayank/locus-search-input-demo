import React, { useState, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Fuse from 'fuse.js';

import Search from './components/Search';
import UserCard from './components/UserCard';
import users from './users.json';

const GlobalStyles = createGlobalStyle`
  /* lazy reset */
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #bbb;
    min-height: 100vh;
    box-sizing: border-box;
  }
`;

const AppWrapper = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InformCard = styled.div`
  margin: 40px;
  padding: 40px;
  font-size: 16px;
  background: #fff;
`;

function App() {
  // list of suggestions to render
  const [suggestions, setSuggestions] = useState([]);

  // selected item from the suggestions
  const [searchSelection, setSearchSelection] = useState(null);

  // searchTerm will represent the value user wants to search
  const [searchTerm, setSearchTerm] = useState('');

  // state when suggestions arent enough and search page or something equivalent is needed
  const [isPageSearch, setPageSearch] = useState(false);

  // create an index of data and keep it (this demo specific) 
  const index = useMemo(() => new Fuse(users, {
    includeMatches: true,
    keys: [
      'id', 'name', 'items', 'address', 'pincode',
    ],
  }), []);

  // search a term in suggestions and also set for controlled Search component
  const onTermChange = (term) => {
    setPageSearch(false);
    setSearchTerm(term); 
    setSuggestions(index.search(term));
  };

  // a placeholder function instead of navigation to a search page
  const onPageSearch = () => {
    setSuggestions([]);
    setPageSearch(true);
  };


  // when a suggestion is selected
  const onSuggestionSelect = (suggestion) => {
    setSuggestions([]);
    setSearchSelection(suggestion);
  };

  return (
    <AppWrapper>
      <Search 
        placeholder='Search users by ID, address, name or items'
        value={searchTerm}
        onChange={onTermChange} 
        suggestions={suggestions}
        onSearch={onPageSearch}
        onSelect={onSuggestionSelect}
        renderSuggestion={(result) => (
          <UserCard user={result.item} />
        )}
      /> 

      {!!searchSelection && (
        <InformCard>
          <UserCard user={searchSelection.item} />
        </InformCard>
      )}

      {!!isPageSearch && (
        <InformCard>
          {'Search Page with term => '}
          <b>{searchTerm}</b>
        </InformCard>
      )}
      <GlobalStyles />
    </AppWrapper>
  );
}

export default App;
