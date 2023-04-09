import React from 'react';

const ItemCard = ({ seller, title, description, price, image, handleClick }) => {
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />
      <div className="flex flex-col p-4">

        <div className="block mb-2">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="block">
          <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">Price</h4>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{price} ETH</p>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={`https://api.dicebear.com/6.x/identicon/svg?seed=${seller}`} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{seller}</span></p>
        </div>
      </div>
    </div>
  )
}

export default ItemCard