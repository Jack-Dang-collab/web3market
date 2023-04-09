import React, { useState, useEffect } from 'react';
import DisplayItems from '../components/DisplayItems';

import { useStateContext } from '../context';

const Home = ({ keySearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const { address, contract, getItems } = useStateContext();

  const fetchItems = async () => {
    setIsLoading(true);
    const data = await getItems();
    setItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchItems();
  }, [address, contract]);


  return (
    <DisplayItems 
      title="All items"
      isLoading={isLoading}
      items={items}
      searchTerm={keySearch}
    />
  )
}

export default Home