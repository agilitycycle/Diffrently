import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {appState } from '../app/appSlice';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';
import { TagContext } from '../context/TagContext';

const Feed = () => {
  const { tags } = useContext(TagContext);
  const currentAppState = {...useSelector(appState)};
  const { photoUrl } = currentAppState;
  const [tagsLoaded, setTagsLoaded] = useState(false);

  const renderTags = () => {
    return tags.map((item, index) => {
      return (<div key={`tag${index}`} className="flex flex-row text-white mb-5">
        <div>
          <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]" style={renderProfileStyle()}>
            &nbsp;
          </div>
        </div>
        <div className="flex-1 text-left text-[#ffffff]">
          <div className="ml-5">
            <p className="text-lg font-bold">
              <Link to={`/feed/${item.tag}`} onClick={() => {}} className="flex items-center text-white">
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
          <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-2">
		      	Your feed
		      </h3>
		      <h1 className="text-5xl text-white text-left font-semibold mb-10">
		      	Flipbio
		      </h1>
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
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Feed;