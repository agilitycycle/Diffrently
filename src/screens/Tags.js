import React, { useState, useEffect, useContext } from 'react';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';
import { TagContext } from '../context/TagContext';
import { fbSet } from '../services/firebaseService';

const Tags = () => {
  const [tagList, setTagList] = useState([
    {
      text: ''
    }
  ]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const tags = useContext(TagContext);

  const handleNewTag = (e) => {
    const { value, id } = e.target;
    const newTagList = [...tagList];
    newTagList[Number(id.replace('tag', ''))] = value;
    setTagList(newTagList);
  }

  const handleAddTag = () => {
    const newTagList = [...tagList];

    // validate value before setting
    const tagValue = tagList[tagList.length - 1];
    fbSet(`/userTags/-NrnSwk-t38iZWOB76Lt/tags/${tagValue}`, true);

    newTagList.push({
      text: ''
    });
    setTagList(newTagList);
  }

	const renderList = () => {
    return tagList.map((item, index) => {
      const tagLength = tagList.length - 1;
      const elementId = `tag${index}`;
      return (
        <li key={elementId}>
          <input type="text" id={elementId} value={item.text} onChange={handleNewTag} className="bg-transparent text-white text-lg block inline w-fit mb-5 mr-3 p-2.5 border-b !outline-none" disabled={index !== tagLength} placeholder="Tag" />
          {index === tagLength && (
            <button type="button" onClick={handleAddTag} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
          )}
          {index !== tagLength && (
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">x</button>
          )}
        </li>
      )
    })
  }

  useEffect(() => {
    tags.then((resp) => {
      setTagList(resp);
      setTagsLoaded(true);
    })
  }, [tags])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full sm:h-auto">
		      <h1 className="text-5xl text-white text-left font-semibold mb-8">
		      	Flipbio
		      </h1>
		      <h2 className="text-2xl text-white text-left leading-snug mb-2">
		      	2. Set up your tags
		      </h2>
			    <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-8">
		      	For auto-tagging
		      </h3>
          {tagsLoaded && (
            <div>
              <ol className="mb-20 max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                {renderList()}
              </ol>
            </div>
          )}
          {!tagsLoaded && (
            <div>
              <ol className="mb-20 max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
              <li>
                <input type="text" className="bg-transparent text-white text-lg block inline w-fit mb-5 mr-3 p-2.5 border-b !outline-none" disabled placeholder="Tag" />
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </li>
              </ol>
            </div>
          )}
          <div className="text-center">
			    	<button className="rounded-full mb-20 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
			    		go
			    	</button>
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Tags;