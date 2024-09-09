// useWatchList.js
import { useState, useEffect } from 'react';

const useWatchList = () => {
  const [watchList, setWatchList] = useState(() => {
    const storedWatchList = localStorage.getItem('watchList');
    return storedWatchList ? JSON.parse(storedWatchList) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('watchList', JSON.stringify(watchList));
    } catch (error) {
      console.error('Failed to save watchlist to localStorage:', error);
    }
  }, [watchList]);

  const addItem = (updatedWatchList) => {
    setWatchList((prevList) =>
      prevList.map((list) =>
        list.id === updatedWatchList.id ? updatedWatchList : list
      )
    );
  };

  const deleteItem = (id) => {
    setWatchList((prevList) =>
      prevList.map((list) => ({
        ...list,
        items: list.items.filter((item) => item.id !== id),
      }))
    );
  };
  const deleteList = (id) => {
    setWatchList((prevList) => prevList.filter(list => list.id !== id));
  };
  const addList = (newList) => {
    setWatchList((prevList) => [...prevList, newList]);
  };
  const markDone = (id) => {
    setWatchList((prevList) =>
      prevList.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        ),
      })
      )
    );
  };


  return {
    watchList,
    addItem,
    deleteItem,
    markDone,
    addList,
    deleteList
  };
};

export default useWatchList;
