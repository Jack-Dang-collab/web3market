import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton, SearchBar } from './';
import { market, menu, profile } from '../assets';
import { navlinks } from '../constants';

const Navbar = ({ setSearch }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <SearchBar setSearch={setSearch} />

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton 
          btnType="button"
          title={address ? 'List an item' : 'Connect'}
          styles={address ? 'bg-[#cbcd4a]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('list-item')
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            {address ? (
              <img src={`https://api.dicebear.com/6.x/identicon/svg?seed=${address}`} alt="user" className="w-[60%] h-[60%] object-contain" />
            ) : (
              <img src={profile} alt="user" className="w-[60%] h-[60%] object-contain" />
            )}
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
        <div className="sm:hidden flex justify-between items-center relative">
          <Link to="/">
            <div className="w-[40px] h-[40px] rounded-[10px] bg-[#cbcd4a] flex justify-center items-center cursor-pointer">
              <img src={market} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>
          </Link>

          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#cbcd4a]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex mx-4">
              <CustomButton 
                btnType="button"
                title={address ? 'List an item' : 'Connect'}
                styles={address ? 'bg-[#cbcd4a]' : 'bg-[#8c6dfd]'}
                handleClick={() => {
                  if(address) navigate('list-item')
                  else connect();
                }}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar