import React, { useState, useEffect } from 'react';
import DisplayItems from '../components/DisplayItems';

import { useStateContext } from '../context';

const Profile = ({ keySearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const { address, contract, getUserItems } = useStateContext();

  const fetchItems = async () => {
    setIsLoading(true);
    const data = await getUserItems();
    setItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchItems();
  }, [address, contract]);


  return (
    <DisplayItems 
      title="Your selling items"
      isLoading={isLoading}
      items={items}
      searchTerm={keySearch}
    />
  )
}

export default Profile