import React, {useState} from 'react'
import { search } from '../assets'

const SearchBar = ({ theme, setSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
      setSearch(e.target.value);
    }

  return (
    <div className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] ${theme === 'light' ? 'bg-gray-300' : 'bg-[#1c1c24]'} rounded-[100px]`}>
        <input type="text" placeholder="Search for items" value={searchTerm} onChange={handleInputChange} className={`flex w-full font-epilogue font-normal text-[14px] ${theme === 'light' ? 'placeholder:text-gray-600 text-black' : 'placeholder:text-[#4b5264] text-white'} bg-transparent outline-none`} />
        <div className="w-[72px] h-full rounded-[20px] bg-[#cbcd4a] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
    </div>
  )
}

export default SearchBar