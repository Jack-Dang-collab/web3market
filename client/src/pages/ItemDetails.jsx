import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';

const ItemDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const { address, buyItem, sendItem, receiveItem, refundItem, resetItem } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('')

  const handlePay = async () => {
    setIsLoading(true);
    await buyItem(state.id.toString(), amount);
    navigate('/');
    setIsLoading(false);
  }

  const handleDeliver = async () => {
    setIsLoading(true);
    await sendItem(state.id.toString());
    navigate('/');
    setIsLoading(false);
  }

  const handleReceive = async () => {
    setIsLoading(true);
    await receiveItem(state.id.toString());
    navigate('/');
    setIsLoading(false);
  }

  const handleNotReceive = async () => {
    setIsLoading(true);
    await refundItem(state.id.toString());
    navigate('/');
    setIsLoading(false);
  }

  const handleResetItem = async () => {
    setIsLoading(true);
    await resetItem(state.id.toString());
    navigate('/');
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}
      <img src={state.image} alt="campaign" className="object-contain rounded-full"/>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Seller</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={`https://api.dicebear.com/6.x/identicon/svg?seed=${state.seller}`} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.seller}</h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Price</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div>
                <p className="font-epilogue font-semibold text-[16px] text-white break-all">{state.price} ETH</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Description</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div> 
        </div>

        {/* SELLER */}
        {address === state.seller && (
          <div className="flex-1">
            {state.buyer === "0x0000000000000000000000000000000000000000" && (
              <h4 className="font-epilogue font-semibold text-[18px] text-white">Buyer: {state.buyer}</h4> 
            )}

            {state.buyer !== "0x0000000000000000000000000000000000000000" && (
              <div>
                <div className="mt-[20px] mb-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img src={`https://api.dicebear.com/6.x/identicon/svg?seed=${state.buyer}`} alt="user" className="w-[60%] h-[60%] object-contain"/>
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.buyer} bought {state.title}</h4>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify w-[75%]">Item Status: 
                    {(state.isItemSent && !state.isItemReceived) 
                      ? (<span className="font-epilogue font-semibold text-[14px] text-white break-all"> Delivering</span>) 
                      : (state.isItemSent && state.isItemReceived) 
                      ? (<span className="font-epilogue font-semibold text-[14px] text-white break-all"> Delivered</span>)
                      : (<span className="font-epilogue font-semibold text-[14px] text-white break-all"> Not deliver</span>)
                    }
                  </p>
                  {state.isItemSent || state.isItemReceived ? (
                    <CustomButton 
                      btnType="button"
                      title="Deliver"
                      styles={`w-[25%] bg-[#1dc071]`}
                    />
                  ) : (
                    <CustomButton 
                      btnType="button"
                      title="Deliver"
                      styles={`w-[25%] bg-[#1dc071]`}
                      handleClick={handleDeliver}
                    />
                  )}
                </div>
                <div>
                  {(state.buyer !== "0x0000000000000000000000000000000000000000" && !state.isItemSold) && (
                    <div className="mb-3">
                      <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                        <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                          <img src={`https://api.dicebear.com/6.x/identicon/svg?seed=${state.buyer}`} alt="user" className="w-[60%] h-[60%] object-contain"/>
                        </div>
                        <div>
                          <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.buyer} not received {state.title}</h4>
                        </div>
                      </div>
                      <div>
                        <CustomButton 
                          btnType="button"
                          title="Reset Item"
                          styles="w-[50%] bg-red-500"
                          handleClick={handleResetItem}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        
        {/* BUYER */}
        {address === state.buyer && (
          <div className="flex-1">
            <div className="mb-3">
              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img src={`https://api.dicebear.com/6.x/identicon/svg?seed=${state.buyer}`} alt="user" className="w-[60%] h-[60%] object-contain"/>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.buyer} bought {state.title}</h4>
                </div>
              </div>
            </div>
            <div>
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify mb-[20px]">Item Status: 
                {(state.isItemSent && !state.isItemReceived) 
                  ? (<span className="font-epilogue font-semibold text-[14px] text-white break-all"> Delivering</span>) 
                  : (state.isItemSent && state.isItemReceived) 
                  ? (<span className="font-epilogue font-semibold text-[14px] text-white break-all"> Delivered</span>)
                  : (<span className="font-epilogue font-semibold text-[14px] text-white break-all"> Not deliver</span>)
                }
              </p>
              {state.isItemSent && (
                <div className="flex gap-3">
                  {state.isItemReceived ? (
                    <CustomButton 
                      btnType="button"
                      title="Received"
                      styles="w-[50%] bg-[#1dc071]"
                    />
                  ) : (state.buyer !== "0x0000000000000000000000000000000000000000" && !state.isItemSold) ? (
                    <>
                      <CustomButton 
                        btnType="button"
                        title="Not Received"
                        styles="w-[50%] bg-red-500"
                      />
                    </>
                  ) : (
                    <>
                      <CustomButton 
                        btnType="button"
                        title="Receive"
                        styles="w-[50%] bg-[#1dc071]"
                        handleClick={handleReceive}
                      />
                      <CustomButton 
                        btnType="button"
                        title="Not Receive"
                        styles="w-[50%] bg-red-500"
                        handleClick={handleNotReceive}
                      />
                    </>
                  )}
                  
                </div>
              )}
            </div>
          </div>
        )}


        {/* OTHER BUYERS */}
        {address !== state.seller && address !== state.buyer && address && (
          <div className="flex-1">
            {state.buyer === "0x0000000000000000000000000000000000000000" && (
              <div className="flex-1">
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Buy</h4>   

                <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                  <div>
                    <input 
                      type="number"
                      placeholder={`ETH ${state.price}`}
                      step="0.01"
                      className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px] mb-2"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />

                    <CustomButton 
                      btnType="button"
                      title="Buy"
                      styles="w-full bg-[#8c6dfd]"
                      handleClick={handlePay}
                    />
                  </div>
                </div>
              </div>
            )}

            {state.buyer !== "0x0000000000000000000000000000000000000000" && (
              <div>
                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img src={`https://api.dicebear.com/6.x/identicon/svg?seed=${state.buyer}`} alt="user" className="w-[60%] h-[60%] object-contain"/>
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.buyer} bought {state.title}</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* GUEST */}
        {!address && (
          <div>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all uppercase">You need to connect to your metamaskwallet</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemDetails