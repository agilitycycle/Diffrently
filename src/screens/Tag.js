import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appState } from '../app/appSlice';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';
import { TagContext } from '../context/TagContext';
import { fbOnValueOrderByChild } from '../services/firebaseService';

const initialLoaded = {
  tagsLoaded: false,
  postLoaded: false
}

const Tag = () => {
  const { tags } = useContext(TagContext);
  const location = useLocation();
  const currentAppState = useSelector(appState);
  const { photoUrl } = currentAppState;
  const [loaded, setLoaded] = useState(initialLoaded);
  const [postDetails, setPostDetails] = useState([]);
  const { pathname } = location;
  const { tagsLoaded, postLoaded } = loaded;
  const routeTagName = pathname.substring(pathname.lastIndexOf('/') + 1);

  const renderPost = () => {
    if (postDetails.length < 1) return;
    return postDetails.map((item, index) => {
      const { body } = item;
      return (<div key={`tag${index}`} className="flex flex-row text-white mb-7">
        <div>
          <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]" style={renderProfileStyle()}>
            &nbsp;
          </div>
        </div>
        <div className="flex-1 text-left text-[#ffffff]">
          <div className="mx-5">
            <p className="text-lg font-bold">
              <span className="flex items-center text-white">{routeTagName}</span>
            </p>
            <p className="text-md text-[#A9AAC5] leading-loose">
              {body}
            </p>
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
    setLoaded(initialLoaded);
    setPostDetails([]);
  }, [location]);

  useEffect(() => {
    if (tagsLoaded && !postLoaded) {
      const getPost = async () => {
        const path = '/userPost/-NrnSwk-t38iZWOB76Lt/post/';
        const result = await fbOnValueOrderByChild(path, `tag${routeTagName}`, true);
        let newPostDetails = [];
        for (let i in result) {
          const id = i;
          let newPost = Object.assign({ id: i}, result[i]);
          newPostDetails.push(newPost);
        }
        setPostDetails(newPostDetails);
        const newLoaded = {...loaded};
        newLoaded.postLoaded = true;
        setLoaded(newLoaded);
      }
      getPost();
    }
  }, [tagsLoaded, postLoaded])

  useEffect(() => {
    if (tagsLoaded) return;
    if (tags.length > 0) {
      const newLoaded = {...loaded};
      newLoaded.tagsLoaded = true;
      setLoaded(newLoaded);
    }
  }, [tagsLoaded, tags.length])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full sm:h-auto w-full sm:w-7/12">
          <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-2">
		      	Your feed
		      </h3>
		      <h1 className="text-5xl text-white text-left font-semibold mb-10">
		      	Flipbio
		      </h1>
          <div className="min-w-80">
            {postLoaded && renderPost()}
            {!postLoaded && (<div className="flex flex-row text-white mb-5">
              <div>
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
              <div className="flex-1 text-left text-[#ffffff]">
                <div className="ml-5">
                  <p className="text-lg font-bold">
                    <span className="flex items-center text-white">{routeTagName}</span>
                  </p>
                  <p className="text-md text-[#A9AAC5] leading-loose">
                    Post loading...
                  </p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">1 day ago</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
            </div>)}
            {(postLoaded && postDetails.length < 1) && (<div className="flex flex-row text-white mb-5">
              <div>
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
              <div className="flex-1 text-left text-[#ffffff]">
                <div className="ml-5">
                  <p className="text-lg font-bold">
                    <span className="flex items-center text-white">{routeTagName}</span>
                  </p>
                  <p className="text-md text-[#A9AAC5] leading-loose">
                    No post avail.
                  </p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">
                    Write your first post.
                  </p>
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

export default Tag;