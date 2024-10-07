import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { appState } from '../../app/appSlice';
import { ref as sRef, getDownloadURL } from 'firebase/storage';
import {
  fbRemove,
  fbOnValueOrderByKeyLimitToLast,
  fbOnValueOrderByKeyEndAtLimitToLast,
} from '../../services/firebaseService';
import { fbStorage } from '../../app/firebase';
import moment from 'moment';
import {
  Menu,
  Drawer,
  Header,
  ModalExport
} from '../../components';

// refactored
const initialLoaded = {
  tagCategoryLoaded: false,
  postLoaded: false
}

const Timeline = () => {
  const navigate = useNavigate();
  const currentAppState = useSelector(appState);
  const { photoUrl, userId } = currentAppState;
  const [open, setOpen] = useState(false);
  const [postItem, setPostItem] = useState(undefined);
  const [loaded, setLoaded] = useState(initialLoaded);
  const [postTagDetails, setPostTagDetails] = useState([]);
  const [tagCategories, setTagCategories] = useState(undefined);
  const [lastId, setLastId] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);
  const { tagCategoryLoaded, postLoaded } = loaded;

  const loadTag = (tag) => {
    const newLoaded = {...loaded};
    newLoaded.postLoaded = false;
    setLoaded(newLoaded);
    setPostTagDetails([]);
    setLastId('');
    navigate(`/timeline/${tag}`);
  }

  const handleDeletePost = (postId) => {
    fbRemove(`/userTimeline/${userId}/post/${postId}`);
    const newPostTagDetails = [...postTagDetails];
    const removeIndex = newPostTagDetails.findIndex(item => item.id === postId);
    newPostTagDetails.splice(removeIndex, 1);
    setPostTagDetails(newPostTagDetails);
  }

  const handleDynamicTags = (event) => {
    const { target } = event;
    const { value } = target;
    navigate(`/timeline/${value}`);
  }

  const getPost = async () => {
    const path = `/userTimeline/${userId}/post`;

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

  const renderImage = (image) => {
    const base = 'https://firebasestorage.googleapis.com/v0/b/flipbio-1712c.appspot.com/o/';
    return `${base}${encodeURIComponent(image)}?alt=media`;
  }

  const renderThumbnail = (categoryName) => {
    const avatar = createAvatar(identicon, {
        size: 48,
        seed: categoryName
      }).toDataUri();
  
    return <img src={avatar} alt="Avatar" className="w-[40px] h-[40px]" />
  }

  const renderProfileStyle = () => {
    return {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: 'contain'
    };
  }

  const renderPost = () => {
    if (postTagDetails.length < 1) return;
    return postTagDetails.map((item) => {
      const { body, dateCreated } = item;
      const tagEl = Object.keys(item).filter(a => a.indexOf('tag') > -1).map(b => b.replace('tag', ''));
      return (<div className="relative mb-7 mx-auto bg-transparent border border-gray-200 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
        <div className="absolute top-4 right-4 bg-white p-2 divide-y divide-solid divide-gray-300 rounded-md">
          <div>
            <div className="mb-2">
              {renderThumbnail(item.primaryTag)}
            </div>
          </div>
          <div>
            <div className="rounded-full mt-2 w-[40px] h-[40px] bg-[#40435a]" style={renderProfileStyle()}>
              &nbsp;
            </div>
          </div>
        </div>
        <a href={null} className="block h-[300px] rounded-t-lg" style={{
          backgroundImage: `url(${item.image && renderImage(item.image) || 'https://www.amormeus.org/web/wp-content/uploads/2018/05/Solemnity-of-the-Ascension-of-the-Lord-Jesus-Christ-into-Heaven.jpg'})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}>&nbsp;</a>
        <div className="p-5">
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title || item.primaryTag}
            </h5>
            <div>
              <a href={null} onClick={() => {
                setPostItem(item);
                setOpen(true);
              }} className="cursor-pointer text-sm font-medium text-blue-500 hover:underline mb-2 mr-3">export</a>
              <a href={null} className="cursor-pointer text-sm font-medium text-blue-500 hover:underline mb-2 mr-3">edit</a>
              <a href={null} onClick={() => handleDeletePost(item.id)} className="cursor-pointer text-sm font-medium text-rose-600 hover:underline mb-2">delete</a>
            </div>
          </div>
          <p onClick={() => navigate(`/timeline/${tagEl[0]}/${item.id}`)} className="cursor-pointer mb-8 font-normal text-base text-[#A9AAC5] leading-9" style={{wordBreak: 'break-word'}}>
            {body.slice(0, 150 - 1)}...
          </p>
          <p className="mb-8 text-sm text-[#A9AAC5]">
            <div className="mb-4 opacity-60 text-[#A9AAC5]">{
              moment(dateCreated).fromNow()
            }</div>
            <button className="mb-4" onClick={() => loadTag(tagEl[0])}>
              <span className="opacity-40 border border-[#A9AAC5] text-[#A9AAC5] bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                {tagEl.length} tags
              </span>
            </button>
          </p>
          <div className="flex items-center justify-center">
            <svg className="opacity-25 w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
            </svg>
            <svg className="opacity-25 w-[22px] h-[22px] mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
            </svg>
            <svg className="opacity-25 w-[22px] h-[22px] mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd"/>
            </svg>
            <svg className="opacity-25 w-[18px] h-[18px] mr-1.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
            </svg>
            <svg className="opacity-25 w-[23px] h-[23px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
              <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
            </svg>
          </div>
        </div>
      </div>)
    })
  }

  const renderTagCategories = () => {
    let tags = []
    for (let i in tagCategories) {
      tags.push(i.replace('tag',''));
    }

    return <div className="mb-7">
      {tags.map((tag, index) => {
        return <button key={`tag${index}`} className="mb-4" onClick={() => handleDynamicTags(tag)}>
          <span className="opacity-40 border border-[#A9AAC5] text-[#A9AAC5] bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        </button>
      })}
    </div>
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
  }, [postLoaded])

	return (<>
    <ModalExport open={open} setOpen={setOpen} postItem={postItem} />
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full max-w-[500px] sm:w-8/12">
          <Header title="Your feed" />
          <div className="min-w-80 pb-7">
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href={null} className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                    <span className="flex items-center text-white">Title</span>
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

export default Timeline;