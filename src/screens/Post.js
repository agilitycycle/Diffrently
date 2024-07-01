import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';
import { TagContext } from '../context/TagContext';
import moment from 'moment';
import { fbPush, fbSet } from '../services/firebaseService';

const initialState = {
  body: '',
  characterSize: 'noSize',
  tags: [],
  tagsLoaded: false,
  tagList: [],
  saving: false,
  published: false
};

const Post = () => {
  const navigate = useNavigate();
  const tags = useContext(TagContext);
  const [postDetails, setPostDetails] = useState(initialState);

  const characterSizes = {
    noSize: 'Less than a tweet',
    short: 'Facebook post',
    medium: 'Tweet',
    large: 'Blog article'
  }

  const getSize = (len) => {
    switch (true) {
      case (len < 1):
        return 'noSize';
      case (len < 51):
        return 'short';
      case (len < 281):
        return 'medium';
      case (len < 1501 || len > 1501):
        return 'large';
      default:
        return 'noSize';
    }
  }

  const updatePostDetails = (newPostDetails) => {
    const mergeObjects = Object.assign(postDetails, newPostDetails);
    setPostDetails(mergeObjects);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    const { length } = value;
    updatePostDetails({
      characterSize: getSize(length),
      body: value
    });
  }

  const handlePostAnother = () => setPostDetails(initialState);

  const handlePost = () => {
    const { body, tags } = postDetails;
    if (body.length < 3) return;
    if (body.length > 50) {
      updatePostDetails({
        saving: true
      });

      // check whether user has any tags...
      axios.post('https://d9mi4czmx5.execute-api.ap-southeast-2.amazonaws.com/prod/{read+}', JSON.stringify({
          data: {
            tags: tags.map((item) => `\n- ${item.text}`).join(',').replace(',', ''),
            text: body
          }
        })).then((resp) => {
          const newTagListArray = resp.data.response.content.split(',').map((item) => item.trim());
          const newTagListObject = {};

          updatePostDetails({
            tagList: newTagListArray,
            published: true,
            saving: true
          });

          for (const key of newTagListArray) {
            newTagListObject[key] = true;
          }

          const pushKey = fbPush('/userPost/-NrnSwk-t38iZWOB76Lt/post/', {
            dateCreated: moment().valueOf(),
            body,
            tags: newTagListObject
          });

          for(let i in newTagListArray) {
            const tagPost = {};
            tagPost[pushKey] = true;
            fbSet(`/userTags/-NrnSwk-t38iZWOB76Lt/tags/${newTagListArray[i]}`, tagPost);
          }

          // update userTags
      }).catch(error => {
        console.log(error);
      });
    }
  }

  const renderLabels = () => {
    return postDetails.tags.map((item, index) => {
      const highlightStyles = postDetails.tagList.includes(item.text) ? 'opacity-100 border border-green-500 text-green-500' : 'opacity-70 border border-blue-800 text-blue-800';
      return (<span key={`label${index}`} className={`${highlightStyles} bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>{item.text}</span>)
    })
  }

  useEffect(() => {
    tags.then((resp) => {
      const newPostDetails = {...postDetails}
      newPostDetails.tags = resp;
      newPostDetails.tagsLoaded = true;
      setPostDetails(newPostDetails);
    })
  }, [tags, postDetails])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="w-[500px] h-full sm:h-auto">
          <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-2">
		      	Your feed
		      </h3>
		      <h1 className="text-5xl text-white text-left font-semibold mb-8">
		      	Flipbio
		      </h1>
		      <div>
            <textarea value={postDetails.body} onChange={handleChange} rows="6" className="resize-none block py-2.5 pr-2.5 mb-20 w-full text-lg text-lg text-white bg-transparent !outline-none" placeholder="Write something..."/>
          </div>
          <div className="text-center">
            {postDetails.published && (
              <button onClick={() => navigate('/feed')} className="block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
                feed
              </button>
            )}
            {!postDetails.published && (
              <button onClick={handlePost} disabled={postDetails.saving} className={`opacity-${postDetails.saving ? '50' : '100'} block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center`}>
                {postDetails.saving ? <span>saving...</span> : <span>publish</span>}
              </button>
            )}
            <p className="sm:mt-0 mb-8 text-gray-500 dark:text-gray-400">
              {characterSizes[postDetails.characterSize]} ({postDetails.body.length}).&nbsp;
              {!postDetails.published && (
                <button className="cursor-pointer inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Tags ready to generate
                  <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </button>
              )}
              {postDetails.published && (
                <button onClick={handlePostAnother} className="cursor-pointer inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Post another?
                </button>
              )}
            </p>
            <div className="pb-8">
              {renderLabels()}
            </div>
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Post;