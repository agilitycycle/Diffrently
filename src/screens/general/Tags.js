import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TagContext } from '../../context/TagContext';
import { fbSet } from '../../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../../components';
import { appState } from '../../app/appSlice';

const Tags = () => {
  const navigate = useNavigate();
  const currentAppState = useSelector(appState);
  const contextObj = useContext(TagContext);
  const { credit, userId } = currentAppState;
  const [formTags, setFormTags] = useState([
    {
      tag: '',
      post: []
    }
  ]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [tagFormValue, setTagFormValue] = useState('');
  const [max, setMax] = useState(4);

  const capitalizeFirstLetter = (tagName) => {
    return `${tagName.charAt(0).toUpperCase()}${tagName.slice(1)}`;
  }

  const loadMore = () => {
    setMax(100);
  }

  const showLess = () => setMax(4);

  const handleDeleteTag = (tag) => {
    // how to successfully remove tags and post??
    // remove(ref(fbdb, 'every related post id'));
    // remove(ref(fbdb, 'id'));
  }

  const handleNewTag = (e) => {
    const { value } = e.target;
    setTagFormValue(value);
  }

  const handleAddTag = () => {
    if (tagsLoaded && tagFormValue.length > 2) {
      // testing for space
      let hydrateBody = /\s/.test(tagFormValue) ?
        tagFormValue.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()).replace(/\s/g, '') :
        tagFormValue;

      // remove any special characters
      hydrateBody = hydrateBody.replace(/[^\w\s]/gi, '');
        
      // capitalize first letter
      hydrateBody = capitalizeFirstLetter(hydrateBody);

      // no duplicates
      if (contextObj.tags.some(obj => obj.tag === hydrateBody)) return;

      // reset context loading
      contextObj.loading();

      fbSet(`/userTags/${userId}/tags/${hydrateBody}`, true);
      setTagFormValue('');
      setTagsLoaded(false);
      contextObj.getTags(userId);
    }
  }

	const renderList = () => {
    return formTags.map((item, index) => {
      if (index >= max) return false;
      const elementId = `tag${index}`;
      return (
        <li key={elementId} className="py-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="inline-flex items-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
              &nbsp;
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-gray-900 truncate dark:text-white mb-0.5">
                <Link to={`/feed/${item.tag}`} className="flex items-center text-white">
                  <span>{item.tag} ({item.post.length})</span>
                </Link>
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Your tag description...
              </p>
            </div>
            <div className="inline-flex items-center">
              <button type="button" onClick={() => handleDeleteTag(item.tag)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 mr-2 text-rose-900">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
              </button>
              <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-2 py-1 text-center">Edit</button>
            </div>
          </div>
        </li>
      )
    })
  }

  /**
   * 
   * Two sets of load:
   * 1. One from context level
   * 2. One for UI level
   * 
   */
  
  useEffect(() => {
    if (tagsLoaded) return;
    if (contextObj.loaded && contextObj.tags.length < 1) {
      // no tags avail yet
      setTagsLoaded(true);
    }
    if (contextObj.tags.length > 0) {
      const newFormTags = [...contextObj.tags];
      setFormTags(newFormTags);
      setTagsLoaded(true);
    }
  }, [contextObj.tags, tagsLoaded, setFormTags])

	return (<>
		<div className="flex flex-col px-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-10/12 sm:w-6/12">
          <Header />
		      <h2 className="text-2xl text-white text-left leading-snug mb-2">
		      	2. Set up your tags (lim 25)
		      </h2>
			    <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-4">
		      	For auto-tagging
		      </h3>
          <div>
            <div className="space-y-1">
              <ul className="w-full sm:w-7/12">
                <li>
                  <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                    <div className="grow mb-8">
                      <input type="text" value={tagFormValue} onChange={handleNewTag} className="w-full h-[40px] bg-transparent text-white text-lg block inline py-2.5 border-b border-b-sky-100 !outline-none" placeholder="Add a tag" />
                    </div>
                    <div className="flex-none">
                      <button type="button" onClick={handleAddTag} disabled={formTags.length > 25} className="h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {contextObj.tags.length > 0 && (
              <div className="mb-6 space-y-1 text-gray-500 rounded border border-gray-700">
                <ul className="px-4 w-full divide-y divide-gray-200 dark:divide-gray-700">
                  {renderList()}
                </ul>
              </div>
            )}
          </div>
          {!credit && (
            <div className="flex flex-row text-white mb-6">
              <div className="flex-1 text-left text-[#ffffff]">
                <div className="block w-full p-6 bg-white border border-gray-700 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">No active subscriptions</h5>
                  <p className="text-base text-[#A9AAC5] dark:text-[#A9AAC5] leading-loose">{
                    !currentAppState.freeTrial ? (<a href={null} onClick={() => navigate('/subscriptions')} className="cursor-pointer hover:underline">Consider getting a FREE Trial plan.</a>) :
                      (<a href={null} onClick={() => navigate('/subscriptions')} className="cursor-pointer hover:underline">Consider getting a Pay as you go plan</a>)
                  }</p>
                </div>
              </div>
            </div>
          )}
          {!tagsLoaded && (
            <div>
              <ol className="mb-6 max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
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
              <div>
                <div className="flex items-center justify-center mt-10">
                  {max < 100 && (
                      <button onClick={loadMore} className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10">
                        Load more
                      </button>
                  )}
                  {max > 4 && (
                    <button onClick={showLess} className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10">
                      Show less
                    </button>
                  )}
                </div>
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