import React, { useState } from 'react'
import { SearchContext } from '../context/searchContext'

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const getSearch = (keySearch) => {
    setSearch(keySearch);
  };

  return (
    <SearchContext.Provider value={{ search, getSearch }}>
        {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider