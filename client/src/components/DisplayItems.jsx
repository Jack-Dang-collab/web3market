import React from 'react';
import { useNavigate } from 'react-router-dom';

import { loader } from '../assets';
import ItemCard from './ItemCard';

const DisplayItems = ({ title, isLoading, items, searchTerm }) => {
  const userSearchItems = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
      userSearchItems.push(items[i]);
    }
  }

  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/item-details/${item.title}`, { state: item });
  }

  if (userSearchItems) {
    return (
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({userSearchItems.length})</h1>
  
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {isLoading && (
            <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
          )}
  
          {!isLoading && userSearchItems.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have not listed any items yet.
            </p>
          )}
  
          {!isLoading && userSearchItems.length > 0 && userSearchItems.map((item) => <ItemCard 
            key={item.id}
            {...item}
            handleClick={() => handleNavigate(item)}
          />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({items.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && items.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not listed any items yet.
          </p>
        )}

        {!isLoading && items.length > 0 && items.map((item) => <ItemCard 
          key={item.id}
          {...item}
          handleClick={() => handleNavigate(item)}
        />)}
      </div>
    </div>
  )
}

export default DisplayItems