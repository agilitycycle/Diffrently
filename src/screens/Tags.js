import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagContext } from '../context/TagContext';
import { fbSet } from '../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../components';

const Tags = () => {
  const [formTags, setFormTags] = useState([
    {
      tag: '',
      post: []
    }
  ]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [tagFormValue, setTagFormValue] = useState('');
  const { tags, getTags } = useContext(TagContext);
  const navigate = useNavigate();

  const handleNewTag = (e) => {
    const { value } = e.target;
    setTagFormValue(value);
  }

  const handleAddTag = () => {
    if (tagFormValue.length > 3) {
      // auto refresh
      fbSet(`/userTags/-NrnSwk-t38iZWOB76Lt/tags/${tagFormValue}`, true);
      setTagFormValue('');
      setTagsLoaded(false);
      getTags();
    }
  }

	const renderList = () => {
    return formTags.map((item, index) => {
      const elementId = `tag${index}`;
      return (
        <li key={elementId} className="py-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="inline-flex items-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
              &nbsp;
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-gray-900 truncate dark:text-white mb-0.5">
                {item.tag}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Your tag description...
              </p>
            </div>
            <div className="inline-flex items-center">
              <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-2 py-1 text-center mb-2 ">Edit</button>
            </div>
          </div>
        </li>
      )
    })
  }

  useEffect(() => {
    if (tagsLoaded) return;
    if (tags.length > 0) {
      const newFormTags = [...tags];
      setFormTags(newFormTags);
      setTagsLoaded(true);
    }
  }, [tags, tagsLoaded, setFormTags])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full">
          <Header />
		      <h2 className="text-2xl text-white text-left leading-snug mb-2">
		      	2. Set up your tags
		      </h2>
			    <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-4">
		      	For auto-tagging
		      </h3>
          {tagsLoaded && (
            <div>
              <div className="space-y-1">
                <ul className="max-w-md">
                  <li>
                    <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                      <div className="grow mb-8">
                        <input type="text" value={tagFormValue} onChange={handleNewTag} className="w-full h-[40px] bg-transparent text-white text-lg block inline py-2.5 border-b border-b-sky-100 !outline-none" placeholder="Add a tag" />
                      </div>
                      <div className="flex-none">
                        <button type="button" onClick={handleAddTag} className="h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mb-4 space-y-1 text-gray-500 rounded border border-gray-700">
                <ul className="px-4 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  {renderList()}
                </ul>
              </div>
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
          {tagsLoaded && (
            <div className="text-center">
              <div className="mb-8">
                <a href="/" className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10 mb-20">
                  Load more
                </a>
              </div> 
              <button onClick={() => navigate('/post')} className="rounded-full mb-20 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
                post
              </button>
            </div>
          )}
		    </div>
		  </div>
	  </div>
  </>);
};

export default Tags;