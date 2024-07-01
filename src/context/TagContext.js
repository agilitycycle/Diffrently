import React, { createContext } from 'react';
import { fbOnValue } from '../services/firebaseService';

const getTags = () => {
  return new Promise(async (resolve) => {
    const newTagList = [];
    const result = await fbOnValue('/userTags/-NrnSwk-t38iZWOB76Lt/tags/');
    for (let value in result) {
      newTagList.push({
        text: value
      });
    }
    resolve(newTagList);
  })
}

export const TagContext = createContext(null);

export const TagContextHOC = Component => {
  const tags = getTags();
  return () => {
    return (
      <TagContext.Provider value={tags}>
        <Component />
      </TagContext.Provider>
    )
  }
}

export default TagContext;