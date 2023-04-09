import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x490a19106d04B094629a391b0ec6e0f2e561B1fa');

  const address = useAddress();
  const connect = useMetamask();

  const publishItem = async (form) => {
    try {
      const data = await contract.call(
        "listItem",
        [
          address,
          form.title,
          form.description,
          form.price,
          form.image,
        ],
      );
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  const buyItem = async (id, amount) => {
    try {
      const data = await contract.call("buyItem", id, { value: ethers.utils.parseEther(amount)});
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  const sendItem = async (id) => {
    try {
      const data = await contract.call("sendItem", id);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  const receiveItem = async (id) => {
    try {
      const data = await contract.call("receiveItem", id);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  const refundItem = async (id) => {
    try {
      const data = await contract.call("refundItem", id);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  const resetItem = async (id) => {
    try {
      const data = await contract.call("resetItem", id);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

  const getItems = async () => {
    const items = await contract.call('getItems');
    
    const parsedItems = items.map((item, i) => ({
      seller: item.seller,
      title: item.title,
      description: item.description,
      price: ethers.utils.formatEther(item.price.toString()),
      image: item.image,
      id: i,
      buyer: item.buyer,
      isItemSold: item.isItemSold,
      isItemSent: item.isItemSent,
      isItemReceived: item.isItemReceived,
    }));

    return parsedItems.reverse();
  }

  const getUserItems = async () => {
    const allItems = await getItems();

    const filteredItems = allItems.filter((item) => item.seller === address);

    return filteredItems;
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        listItem: publishItem,
        getItems,
        getUserItems,
        buyItem,
        sendItem,
        receiveItem,
        refundItem,
        resetItem,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);