import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appState } from '../../app/appSlice';
import { TagContext } from '../../context/TagContext';
import {
  fbRemove,
  fbOnValueOrderByChildLimitToLast,
  fbOnValueOrderByChildEndAtLimitToLast
} from '../../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const initialLoaded = {
  tagsLoaded: false,
  postLoaded: false
}

const Tag = () => {
  const { tags } = useContext(TagContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentAppState = useSelector(appState);
  const { photoUrl, userId } = currentAppState;
  const [loaded, setLoaded] = useState(initialLoaded);
  const [postTagDetails, setPostTagDetails] = useState([]);
  const [lastId, setLastId] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);
  const { pathname } = location;
  const { tagsLoaded, postLoaded } = loaded;
  const routeTagName = pathname.substring(pathname.lastIndexOf('/') + 1);

  const loadTag = (tag) => {
    const newLoaded = {...loaded};
    newLoaded.postLoaded = false;
    setLoaded(newLoaded);
    setPostTagDetails([]);
    setLastId('');
    navigate(`/feed/${tag}`);
  }

  const handleDeletePost = (postId) => {
    fbRemove(`/userPost/${userId}/post/${postId}`);
    const newPostTagDetails = [...postTagDetails];
    const removeIndex = newPostTagDetails.findIndex(item => item.id === postId);
    newPostTagDetails.splice(removeIndex, 1);
    setPostTagDetails(newPostTagDetails);
  }

  const getTags = (tagEl) => {
    return tagEl.map((tag, index) => {
      const highlightStyles = routeTagName === tag ? 'opacity-40 border border-[#A9AAC5] text-[#A9AAC5]' : 'border border-emerald-300 text-emerald-300';
      return <button key={`tag${index}`} className="mb-4" onClick={() => loadTag(tag)}>
        <span key={tag} className={`${highlightStyles} bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>
          {tag}
        </span>
      </button>
    })
  }

  const getPost = async () => {
    const path = `/userPost/${userId}/post/`;

    let result = (lastId === '') ? 
      await fbOnValueOrderByChildLimitToLast(path, `tag${routeTagName}`, true, 5) :
      await fbOnValueOrderByChildEndAtLimitToLast(path, `tag${routeTagName}`, lastId, 6);

    const currentPostTagDetails = [...postTagDetails];
    
    const newPostTagDetails = [];
    for (let i in result) {
      newPostTagDetails.push(Object.assign({ id: i }, result[i]));
    }

    if (newPostTagDetails.length > 0) {
      const newId = newPostTagDetails.reverse()[newPostTagDetails.length - 1].id;

      const merged = currentPostTagDetails.concat(newPostTagDetails.filter(item2 =>
        !currentPostTagDetails.some(item1 => item1.id === item2.id)
      ));

      const unique = arr => arr.filter((el, i, array) => array.indexOf(el) === i);

      setPostTagDetails(unique(merged));

      switch(true) {
        case newId !== lastId:
          setLastId(newId);
          break;
        case newId === lastId:
          setPaginationEnd(true);
          break;
        default:
          break;
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
            <p onClick={() => navigate(`/feed/${routeTagName}/${item.id}`)} className="text-base cursor-pointer text-[#A9AAC5] leading-9 mb-3" style={{wordBreak: 'break-word'}}>
              {body.slice(0, 150 - 1)}...
            </p>
            <p className="text-sm text-[#A9AAC5]">
              <span className="mr-2 opacity-60">1 day ago</span>
              {getTags(tagEl)}
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center rounded-md mb-2 ml-auto w-12 h-12 bg-[#40435a]">
            &nbsp;
          </div>
          <div className="text-center">
            <a href={null} className="cursor-pointer text-sm font-medium text-blue-500 hover:underline mb-2">edit</a>
          </div>
          <button type="button" className="mx-auto block" onClick={() => handleDeletePost(item.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-rose-900">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
            </svg>
          </button>
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
            {(!paginationEnd && postTagDetails.length > 4) && (
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