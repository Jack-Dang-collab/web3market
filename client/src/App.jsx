import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SearchContext } from './context/searchContext';
import { Sidebar, Navbar } from './components';
import { Home, Profile, ListItem, ItemDetails } from './pages';

export default function App() {
  const { search, getSearch } = useContext(SearchContext);

  return (
    <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-grow">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar setSearch={getSearch} />

        <Routes>
          <Route path="/" element={<Home keySearch={search} />} />
          <Route path="/profile" element={<Profile keySearch={search} />} />
          <Route path="/list-item" element={<ListItem />} />
          <Route path="item-details/:id" element={<ItemDetails />} />
        </Routes>
      </div>
    </div>
  );
}
