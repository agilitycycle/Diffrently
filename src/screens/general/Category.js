import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appState } from '../../app/appSlice';
import { CategoryContext } from '../../context/CategoryContext';
import {
  fbRemove,
  fbOnValueOrderByKeyLimitToLast,
  fbOnValueOrderByKeyEndAtLimitToLast
} from '../../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const initialLoaded = {
  categoriesLoaded: false,
  postLoaded: false
}

const Category = () => {
  const contextObj = useContext(CategoryContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentAppState = useSelector(appState);
  const { photoUrl, userId } = currentAppState;
  const [loaded, setLoaded] = useState(initialLoaded);
  const [postTagDetails, setPostTagDetails] = useState([]);
  const [lastId, setLastId] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);
  const { categoriesLoaded, postLoaded } = loaded;
  const { pathname } = location;
  const routeTagName = pathname.substring(pathname.lastIndexOf('/') + 1);

  const loadTag = (tag) => {
    const newLoaded = {...loaded};
    newLoaded.postLoaded = false;
    setLoaded(newLoaded);
    setPostTagDetails([]);
    setLastId('');
    navigate(`/tags/${routeTagName}/${tag}`);
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
      return <button key={`tag${index}`} className="mb-4" onClick={() => loadTag(tag)}>
        <span key={tag} className="border border-emerald-300 text-emerald-300 bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded">
          {tag}
        </span>
      </button>
    })
  }

  const getPost = async () => {
    const path = `/userTags/${userId}/post/${routeTagName}`;

    let result = (lastId === '') ? 
      await fbOnValueOrderByKeyLimitToLast(path, 5) :
      await fbOnValueOrderByKeyEndAtLimitToLast(path, lastId, 6);

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
            <p onClick={() => navigate(`/tags/${routeTagName}/${tagEl[0]}/${item.id}`)} className="cursor-pointer text-base text-[#A9AAC5] leading-9 mb-3" style={{wordBreak: 'break-word'}}>
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
    if (categoriesLoaded && !postLoaded) {
      getPost();
    }
    // eslint-disable-next-line
  }, [categoriesLoaded, postLoaded])

  useEffect(() => {
    if (categoriesLoaded) return;
    if (contextObj.loaded) {
      const newLoaded = {...loaded};
      newLoaded.categoriesLoaded = true;
      setLoaded(newLoaded);
    }
  }, [loaded, categoriesLoaded, contextObj])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full sm:w-7/12">
          <Header title="Your feed" />
          <div className="min-w-80 pb-7">
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href={null} onClick={() => navigate('/tags/')} className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="w-6 h-6 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"/>
                    </svg>
                    Tags
                  </a>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{routeTagName}</span>
                  </div>
                </li>
              </ol>
            </nav>
            <button onClick={() => navigate('/tagedit/')} className="block rounded-full mb-12 text-xl uppercase w-48 h-14 border border-white bg-transparent text-[#fff]">
              Tag
            </button>
            {postLoaded && renderPost()}
            {!postLoaded && !contextObj.loaded && (<div className="flex flex-row text-white mb-5">
              <div>
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
              <div className="flex-1 text-left text-[#ffffff]">
                <div className="ml-5">
                  <p className="text-lg font-bold">
                    <span className="flex items-center text-white">Title</span>
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
                    <span className="flex items-center text-white">Title</span>
                  </p>
                  <p className="text-base text-[#A9AAC5] leading-loose">
                    No post avail.
                  </p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">
                    <a href={null} onClick={() => navigate('/tagedit/')} className="cursor-pointer hover:underline">
                      Write your first post.
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
            </div>)}
            {(postLoaded && !paginationEnd) && (
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

export default Category;