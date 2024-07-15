import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appState } from '../app/appSlice';
import { TagContext } from '../context/TagContext';
import {
  Menu,
  Drawer,
  Header
} from '../components';

const Feed = () => {
  const { tags } = useContext(TagContext);
  const currentAppState = {...useSelector(appState)};
  const { photoUrl } = currentAppState;
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [max, setMax] = useState(4);
  
  const loadMore = () => {
    setMax(100);
  }

  const renderTags = () => {
    return tags.map((item, index) => {
      if (index >= max) return;
      return (<div key={`tag${index}`} className="flex flex-row text-white mb-5">
        <div>
          <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]" style={renderProfileStyle()}>
            &nbsp;
          </div>
        </div>
        <div className="flex-1 text-left text-[#ffffff]">
          <div className="ml-5">
            <p className="text-lg font-bold">
              <Link to={`/feed/${item.tag}`} className="flex items-center text-white">
                <span>{item.tag} ({item.post.length})</span>
              </Link>
            </p>
            <p className="text-sm text-[#A9AAC5]">Your tag description</p>
            <p className="text-sm text-[#A9AAC5] opacity-60">1 day ago</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
            &nbsp;
          </div>
        </div>
      </div>)
    })
  }

  const renderProfileStyle = () => {
    return {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: 'contain'
    };
  }

  useEffect(() => {
    if (tagsLoaded) return;
    if (tags.length > 0) {
      setTagsLoaded(true);
    }
  }, [tagsLoaded, tags.length])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full sm:h-auto">
          <Header title="Your feed" className="text-5xl text-white text-left font-semibold mb-10" />
          <div className="min-w-80">
            {tagsLoaded && renderTags()}
            {!tagsLoaded && (<div className="flex flex-row text-white mb-5">
              <div>
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
              <div className="flex-1 text-left text-[#ffffff]">
                <div className="ml-5">
                  <p className="text-lg font-bold">Tags loading...</p>
                  <p className="text-sm text-[#A9AAC5]">Your tag description</p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">1 day ago</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
            </div>)}
            {max < 100  && (
              <div className="flex items-center justify-center mt-10 mb-3">
                <button type="button" onClick={loadMore} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Load More</button>
              </div>
            )}
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Feed;