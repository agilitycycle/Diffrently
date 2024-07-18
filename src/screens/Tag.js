import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appState } from '../app/appSlice';
import { TagContext } from '../context/TagContext';
import {
  fbOnValueOrderByChildLimitToLast,
  fbOnValueOrderByChildEndAtLimitToFirst
} from '../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../components';

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
  const [postTagDetails, setPostTagDetails] = useState([]);
  const [lastId, setLastId] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);
  const { pathname } = location;
  const { tagsLoaded, postLoaded } = loaded;
  const routeTagName = pathname.substring(pathname.lastIndexOf('/') + 1);

  const getTags = (tagEl) => {
    return tagEl.map((tag, index) => {
      const highlightStyles = routeTagName === tag ? 'opacity-40 border border-[#A9AAC5] text-[#A9AAC5]' : 'border border-emerald-300 text-emerald-300';
      return <Link key={`tag${index}`} to={`/feed/${tag}`}>
        <span key={tag} className={`${highlightStyles} bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>
          {tag}
        </span>
      </Link>
    })
  }

  const getPost = async () => {
    const path = '/userPost/-NrnSwk-t38iZWOB76Lt/post/';
    let result;
    
    if (lastId === '') {
      result = await fbOnValueOrderByChildLimitToLast(path, `tag${routeTagName}`, true, 5);
    } else {
      result = await fbOnValueOrderByChildEndAtLimitToFirst(path, `tag${routeTagName}`, true, lastId, 5);
    }

    const currentPostTagDetails = [...postTagDetails];

    let newPostTagDetails = [];
    for (let i in result) {
      let newPost = Object.assign({ id: i }, result[i]);
      newPostTagDetails.push(newPost);
    }

    if (newPostTagDetails.length > 0) {
      const newId = newPostTagDetails.reverse()[newPostTagDetails.length - 1].id;

      const mergedArray = currentPostTagDetails.concat(newPostTagDetails.filter(item2 =>
        !currentPostTagDetails.some(item1 => item1.id === item2.id)
      ));

      const sortByDate = (a, b) => a.dateCreated - b.dateCreated;

      mergedArray.sort(sortByDate).reverse();

      setPostTagDetails(mergedArray);

      if (newId !== lastId) {
        setLastId(newId);
      }

      if (newId === lastId) {
        setPaginationEnd(true);
      }
    }

    if (newPostTagDetails.length === 0) {
      setPaginationEnd(true);
    }

    const newLoaded = {...loaded};
    newLoaded.postLoaded = true;
    setLoaded(newLoaded);
  }

  const renderPost = () => {
    if (postTagDetails.length < 1) return;
    return postTagDetails.map((item, index) => {
      const { body } = item;
      const tagEl = Object.keys(item).filter(a => a.indexOf('tag') > -1).map(b => b.replace('tag', ''));
      return (<div key={`tag${index}`} className="flex flex-row text-white mb-12 sm:mb-24">
        <div>
          <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]" style={renderProfileStyle()}>
            &nbsp;
          </div>
        </div>
        <div className="flex-1 text-left text-[#ffffff]">
          <div className="mx-5">
            <p className="text-xl font-bold mb-1">
              <span className="flex items-center text-white">{routeTagName}</span>
            </p>
            <p className="text-base text-[#A9AAC5] leading-9 mb-3" style={{wordBreak: 'break-word'}}>
              {body.slice(0, 150 - 1)}...
            </p>
            <p className="text-sm text-[#A9AAC5]">
              <span className="mr-2 opacity-60">1 day ago</span>
              {getTags(tagEl)}
            </p>
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
    setPostTagDetails([]);
  }, [location]);

  useEffect(() => {
    if (tagsLoaded && !postLoaded) {
      getPost();
    }
    // eslint-disable-next-line
  }, [loaded, tagsLoaded, postLoaded, routeTagName])

  useEffect(() => {
    if (tagsLoaded) return;
    if (tags.length > 0) {
      const newLoaded = {...loaded};
      newLoaded.tagsLoaded = true;
      setLoaded(newLoaded);
    }
  }, [loaded, tagsLoaded, tags.length])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full sm:w-7/12">
          <Header title="Your feed" />
          <div className="min-w-80 pb-7">
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
                  <p className="text-base text-[#A9AAC5] leading-loose">
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
            {(postLoaded && postTagDetails.length < 1) && (<div className="flex flex-row text-white mb-5">
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
                  <p className="text-base text-[#A9AAC5] leading-loose">
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
            {(!paginationEnd) && (
              <div className="flex items-center justify-center mb-3">
                <button type="button" onClick={getPost} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Load More</button>
              </div>
            )}
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Tag;