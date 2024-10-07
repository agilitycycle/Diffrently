import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { appState } from '../../app/appSlice';
import { fbdb } from '../../app/firebase';
import { ref, query, get} from 'firebase/database';
import {
  fbRemove,
  fbOnValueOrderByKeyLimitToLast
} from '../../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const initialLoaded = {
  tagCategoryLoaded: false,
  postLoaded: false
}

const PostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentAppState = useSelector(appState);
  const { photoUrl, userId } = currentAppState;
  const [loaded, setLoaded] = useState({});
  const [postTagDetails, setPostTagDetails] = useState([]);
  const [tagCategories, setTagCategories] = useState(undefined);
  const { pathname } = location;
  const { tagCategoryLoaded, postLoaded } = loaded;
  const routePostId = pathname.substring(pathname.lastIndexOf('/') + 1);

  const loadTag = (tag) => {
    const newLoaded = {...loaded};
    newLoaded.postLoaded = false;
    setLoaded(newLoaded);
    setPostTagDetails([]);
    navigate(`/timeline/${tag}`);
  }

  const handleDeletePost = (postId) => {
    fbRemove(`/userPost/${userId}/post/${postId}`);
    const newPostTagDetails = [...postTagDetails];
    const removeIndex = newPostTagDetails.findIndex(item => item.id === postId);
    newPostTagDetails.splice(removeIndex, 1);
    setPostTagDetails(newPostTagDetails);
    navigate(`/timeline/${getTagName()}`);
  }

  const handleDynamicTags = (tag) => {
    navigate(`/timeline/${tag}`);
  }

  const getTags = (tagEl) => {
    return tagEl.map((tag, index) => {
      const highlightStyles = getTagName() === tag ? 'border border-emerald-600 text-emerald-600' : 'opacity-40 border border-[#A9AAC5] text-[#A9AAC5]';
      return <button key={`tag${index}`} className="mb-4" onClick={() => loadTag(tag)}>
        <span key={tag} className={`${highlightStyles} bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>
          {tag}
        </span>
      </button>
    })
  }

  const getTagName = () => {
    for (let key in postTagDetails[0]) {
      if (pathname.indexOf(key.split('tag')[1]) > -1) {
        return key.split('tag')[1];
      }
    }
  }

  const getPost = async () => {
    const path = `/userTimeline/${userId}/post/${routePostId}`;
    const userRef = ref(fbdb, path);
    const q = query(userRef);
    const result = await get(q)
      .then((snapshot) => {
        if (snapshot.val() !== null) {
          return snapshot.val();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setPostTagDetails([result]);

    const newLoaded = {...loaded};
    newLoaded.postLoaded = true;
    setLoaded(newLoaded);
  }

  const getTagCategory = async () => {
    const path = `/userTagFrequency/${userId}`;

    const tagCategories = await fbOnValueOrderByKeyLimitToLast(path, 25);

    if (tagCategories) {
      setTagCategories(tagCategories);
    }

    const newLoaded = {...loaded};
    newLoaded.tagCategoryLoaded = true;
    setLoaded(newLoaded);
  }

  const renderThumbnail = (categoryName) => {
    const avatar = createAvatar(identicon, {
        size: 48,
        seed: categoryName
      }).toDataUri();
  
    return <img src={avatar} alt="Avatar" style={{width: '48px'}} />
  }

  const renderTagCategories = () => {
    let tags = []
    for (let i in tagCategories) {
      tags.push(i.replace('tag',''));
    }

    return <div className="mb-9">
      {tags.map((tag, index) => {
        return <button key={`tag${index}`} className="mb-4" onClick={() => handleDynamicTags(tag)}>
          <span className="opacity-40 border border-[#A9AAC5] text-[#A9AAC5] bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        </button>
      })}
    </div>
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
              <span className="flex items-center text-white">
                {item.title || item.primaryTag}
              </span>
            </p>
            <p className="text-base cursor-pointer text-[#A9AAC5] leading-9 mb-3" style={{wordBreak: 'break-word'}}>
              {body.slice(0, 850)}
            </p>
            <p className="text-sm text-[#A9AAC5]">
              <span className="mr-2 opacity-60">1 day ago</span>
              {getTags(tagEl)}
            </p>
            {/*<div className="grid justify-items-end">
              <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4 me-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z"/>
                </svg>
                Report
              </button>
            </div>*/}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center rounded-md mb-2 ml-auto w-12 h-12 border border-gray-700 bg-transparent">
            {renderThumbnail(item.primaryTag)}
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
    if (!tagCategoryLoaded) {
      getTagCategory();
    }
    // eslint-disable-next-line
  }, [tagCategoryLoaded])

  useEffect(() => {
    if (!postLoaded) {
      getPost();
    }
    // eslint-disable-next-line
  }, [loaded, postLoaded])

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
                  <a href={null} onClick={() => navigate('/timeline')} className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="w-5 h-5 me-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
                    Timeline
                  </a>
                </li>
              </ol>
            </nav>
            <button onClick={() => navigate('/post')} className="block rounded-full mb-10 text-xl uppercase w-48 h-14 border border-white bg-transparent text-[#fff]">
              Post
            </button>
            {tagCategories && (renderTagCategories())}
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
                    <span className="flex items-center text-white">Title</span>
                  </p>
                  <p className="text-base text-[#A9AAC5] leading-loose">
                    Post loading...
                  </p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">1 day ago</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 border border-gray-700 bg-transparent">
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
                    <span className="flex items-center text-white">{routePostId}</span>
                  </p>
                  <p className="text-base text-[#A9AAC5] leading-loose">
                    No post avail.
                  </p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">
                    <a href={null} onClick={() => navigate('/post/')} className="cursor-pointer hover:underline">
                      Write your first post.
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 border border-gray-700 bg-transparent">
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

export default PostDetails;