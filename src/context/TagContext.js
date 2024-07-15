import React, { useState, useEffect, createContext } from 'react';
import { fbOnValueOrderByKeyLimitToFirst } from '../services/firebaseService';

export const TagContext = createContext(null);

const TagContextProvider = (props) => {
  const { Component } = props;

  const getPost = (tagNode) => {
    let post = [];
    for (let key in tagNode) {
      post.push(key)
    }
    return post;
  }

  const getTags = async () => {
    const newTags = {...tags};
    newTags.tags = [];
    const result = await fbOnValueOrderByKeyLimitToFirst('/userTags/-NrnSwk-t38iZWOB76Lt/tags/', 100);
    for (let value in result) {
      const post = getPost(result[value]);
      newTags.tags.push({
        tag: value,
        post
      });
    }
    newTags.loaded = true;
    setTags(newTags);
  }

  const initialState = {
    tags: [],
    loaded: false,
    getTags: getTags
  }

  const [tags, setTags] = useState(initialState);

  useEffect(() => {
    if (tags.loaded) return;
    getTags();
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