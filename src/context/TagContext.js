import React, { useState, useEffect, createContext } from 'react';
import { useSelector } from 'react-redux';
import { fbOnValueOrderByKeyLimitToLast } from '../services/firebaseService';
import { appState } from '../app/appSlice';

export const TagContext = createContext(null);

const TagContextProvider = (props) => {
  const { Component } = props;
  const currentAppState = useSelector(appState);
  const { userId } = currentAppState;

  const getPost = (tagNode) => {
    let post = [];
    for (let key in tagNode) {
      post.push(key)
    }
    return post;
  }

  const getTags = async (userId) => {
    const newTags = {...tags};
    newTags.tags = [];
    const result = await fbOnValueOrderByKeyLimitToLast(`/userTags/${userId}/tags/`, 100);
    if (result) {
      for (let value in result) {
        const post = getPost(result[value]);
        newTags.tags.push({
          tag: value,
          post
        });
      }
    }
    newTags.loaded = true;
    setTags(newTags);
  }

  const setLoading = () => {
    const newTags = Object.assign(tags, {
      loaded: false
    })
    setTags(newTags);
  }

  const initialState = {
    tags: [],
    loaded: false,
    loading: setLoading,
    getTags: getTags
  }

  const [tags, setTags] = useState(initialState);

  useEffect(() => {
    if (tags.loaded) return;
    getTags(userId);
    // eslint-disable-next-line
  }, [tags])

  return (<TagContext.Provider value={tags}>
      <Component />
    </TagContext.Provider>);
}

export const TagContextHOC = Component => {
  return () => <TagContextProvider Component={Component} />
}

export default TagContext;