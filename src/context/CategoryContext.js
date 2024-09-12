import React, { useState, useEffect, createContext } from 'react';
import { useSelector } from 'react-redux';
import { fbOnValueOrderByKeyLimitToLast } from '../services/firebaseService';
import { appState } from '../app/appSlice';

export const CategoryContext = createContext(null);

const CategoryContextProvider = (props) => {
  const { Component } = props;
  const currentAppState = useSelector(appState);
  const { userId } = currentAppState;

  const getPost = async (categoryName) => {
    const result = await fbOnValueOrderByKeyLimitToLast(`/userTags/${userId}/post/${categoryName}`, 100);
    if (result) {
      return Object.keys(result).length;
    }
    return 0;
  }

  const getCategories = async (userId) => {
    const newCategories = {...categories};
    const postResult = await getPost('Default');
    newCategories.categories = [{
      post: postResult,
      categoryName: 'Default'
    }];
    const result = await fbOnValueOrderByKeyLimitToLast(`/userCategories/${userId}/categories/`, 100);
    if (result) {
      for (let value in result) {
        const postResult = await getPost(value);
        newCategories.categories.push({
          post: postResult,
          categoryName: value
        });
      }
    }
    newCategories.loaded = true;
    setCategories(newCategories);
  }

  const setLoading = () => {
    const newCategories = Object.assign(categories, {
      loaded: false
    })
    setCategories(newCategories);
  }

  const initialState = {
    categories: [],
    loaded: false,
    loading: setLoading,
    getCategories: getCategories
  }

  const [categories, setCategories] = useState(initialState);

  useEffect(() => {
    if (categories.loaded) return;
    getCategories(userId);
    // eslint-disable-next-line
  }, [categories])

  return (<CategoryContext.Provider value={categories}>
      <Component />
    </CategoryContext.Provider>);
}

export const CategoryContextHOC = Component => {
  return () => <CategoryContextProvider Component={Component} />
}

export default CategoryContext;