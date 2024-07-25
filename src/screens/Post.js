import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TagContext } from '../context/TagContext';
import { fbPush, fbUpdate } from '../services/firebaseService';
import moment from 'moment';
import {
  Menu,
  Drawer,
  Header
} from '../components';

const initialState = {
  body: '',
  characterSize: 'noSize',
  error: false,
  errorResponse: '',
  tags: [],
  tagsLoaded: false,
  autoTagging: [],
  generating: false,
  saving: false,
  published: false
};

const Post = () => {
  const navigate = useNavigate();
  const { tags, getTags } = useContext(TagContext);
  const [postDetails, setPostDetails] = useState(initialState);
  // eslint-disable-next-line
  const [max, setMax] = useState(4);

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

  const generateTags = () => {
    const { body, tags } = postDetails;
    if (body.length < 3) return;
    if (body.length > 49) {
      setPostDetails(Object.assign({...postDetails}, { generating: true }));

      // check whether user has any tags...
      axios.post('https://d9mi4czmx5.execute-api.ap-southeast-2.amazonaws.com/prod/{read+}', JSON.stringify({
          data: {
            tags: tags.map((item) => `\n- ${item.tag}`).join(',').replace(',', ''),
            text: body
          }
        })).then((resp) => {
          const { data } = resp;
          const { response } = data;
          const { content } = response;
          
          const autoTaggingArray = content.split(',').map(item => hydrateTag(item)).filter(a => a.toLowerCase() !== 'error');

          const newPostDetailsForError = Object.assign({...postDetails}, {
            error: true,
            errorResponse: hydrateErrorResponseMessage(content) === true ? content : '',
            generating: false
          });

          const newPostDetailsForSuccess = Object.assign({...postDetails}, {
            autoTagging: autoTaggingArray,
            error: false,
            generating: false
          });

          // error
          if (hydrateErrorResponseMessage(content) === true ||
            autoTaggingArray.length === 0) {
            setPostDetails(newPostDetailsForError);
            return false;
          }

          // success
          setPostDetails(newPostDetailsForSuccess);

      }).catch(error => {
        console.log(error);
      });
    }
  }

  const hydrateErrorResponseMessage = (content) => {
    if (content.indexOf('This article can') > -1 ||
    content.indexOf('The article you') > -1 ||
    content.indexOf('This article fits') > -1 ||
    content.indexOf('article falls under') > -1 ||
    content.indexOf('falls under the category') > -1 ||
    content.indexOf('The provided article is related to') > -1 ||
    content.indexOf('The artical provided falls under') > -1 ||
    content.indexOf('The article provided seems') > -1 ||
    content.indexOf('I would classify this under') > -1) {
      return true;
    }
    return false;
  }

  const hydrateTag = (tag) => {
    return tag.replace(/\w+/g, (a) =>
    `${a.charAt(0).toUpperCase()}${a.substr(1)}`).replace(/\s/g, '');
  }

  const handleChange = (e) => {
    const { value } = e.target;
    const { length } = value;
    const newPostDetails = Object.assign({...postDetails}, {
      body: value,
      characterSize: getSize(length),
      autoTagging: []
    });
    setPostDetails(newPostDetails);
  }

  const handlePostAnother = () => setPostDetails(initialState);

  const handlePost = async () => {
    const { body, tags } = postDetails;
    if (body.length < 3) return;
    if (body.length > 49) {
      setPostDetails(Object.assign({...postDetails}, { saving: true }));

      // check whether user has any tags...
      const result = await axios.post('https://d9mi4czmx5.execute-api.ap-southeast-2.amazonaws.com/prod/{read+}', JSON.stringify({
        data: {
          tags: tags.map((item) => `\n- ${item.tag}`).join(',').replace(',', ''),
          text: body
        }
      }));
      
      const { data } = result;
      const { response } = data;
      const { content } = response;
      
      const autoTaggingArray = content.split(',').map(item => hydrateTag(item)).filter(a => a.toLowerCase() !== 'error');

      const newPostDetailsForError = Object.assign({...postDetails}, {
        error: true,
        errorResponse: hydrateErrorResponseMessage(content) === true ? content : '',
        saving: false
      });

      const newPostDetailsForSuccess = Object.assign({...postDetails}, {
        autoTagging: autoTaggingArray,
        published: true,
        error: false,
        saving: true
      });

      // error
      if (hydrateErrorResponseMessage(content) === true ||
        autoTaggingArray.length === 0) {
        setPostDetails(newPostDetailsForError);
        return false;
      }

      // success
      setPostDetails(newPostDetailsForSuccess);

      const postItem = {
        dateCreated: moment().valueOf(),
        body
      }

      for (const key of autoTaggingArray) {
        postItem[`tag${key}`] = true;
      }

      const pushKey = fbPush('/userPost/-NrnSwk-t38iZWOB76Lt/post/', postItem);

      for(let i in autoTaggingArray) {
        const tagPost = {};
        tagPost[pushKey] = true;
        fbUpdate(`/userTags/-NrnSwk-t38iZWOB76Lt/tags/${autoTaggingArray[i]}`, tagPost);
      }

      getTags();
    }
  }

  const handlePostWithGeneratedTags = async () => {
    const { body } = postDetails;
    if (body.length < 3) return;
    if (body.length > 49) {
      const { autoTagging } = postDetails;
      setPostDetails(Object.assign({...postDetails}, { saving: true }));

      // fake time
      setTimeout(() => {
        const newPostDetails = Object.assign({...postDetails}, {
          saving: false,
          published: true
        });
        // success
        setPostDetails(newPostDetails);
      }, 1000)

      const postItem = {
        dateCreated: moment().valueOf(),
        body
      }

      for (const key of autoTagging) {
        postItem[`tag${key}`] = true;
      }

      const pushKey = fbPush('/userPost/-NrnSwk-t38iZWOB76Lt/post/', postItem);

      for(let i in autoTagging) {
        const tagPost = {};
        tagPost[pushKey] = true;
        fbUpdate(`/userTags/-NrnSwk-t38iZWOB76Lt/tags/${autoTagging[i]}`, tagPost);
      }

      getTags();
    }
  }

  const renderAutoTags = () => {
    return postDetails.autoTagging.map((item, index) => {
      if (index >= max) return false;
      return (<span key={`tag${index}`} className="border border-emerald-300 text-emerald-300 bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded">{item}</span>)
    }) 
  }

  const renderTags = () => {
    return postDetails.tags.map((item, index) => {
      if (index >= max) return false;
      const highlightStyles = postDetails.autoTagging.includes(item.tag) ? 'border border-emerald-300 text-emerald-300' : 'opacity-70 border border-blue-800 text-blue-800';
      return (<span key={`tag${index}`} className={`${highlightStyles} bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>{item.tag}</span>)
    })
  }

  useEffect(() => {
    if (postDetails.tagsLoaded) return;
    if (tags.length > 0) {
      const newPostDetails = {...postDetails}
      newPostDetails.tags = tags;
      newPostDetails.tagsLoaded = true;
      setPostDetails(newPostDetails);
    }
  }, [postDetails, tags])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="w-[500px] h-full sm:h-auto">
          <Header title="Your feed" />
		      <div>
            <textarea value={postDetails.body} onChange={handleChange} rows="9" className="resize-none block py-2.5 pr-2.5 mb-20 w-full text-lg text-lg text-white bg-transparent !outline-none" placeholder="Write something..."/>
          </div>
          <div className="text-center">
            {postDetails.published && (
              <button onClick={() => navigate('/feed')} className="block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
                feed
              </button>
            )}
            {(!postDetails.published && postDetails.autoTagging.length === 0) && (
              <button onClick={handlePost} disabled={postDetails.saving} className={`opacity-${postDetails.saving || postDetails.body.length < 50 ? '50' : '100'} block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center`}>
                {postDetails.saving ? <span>saving...</span> : <span>publish</span>}
              </button>
            )}
            {(!postDetails.published && postDetails.autoTagging.length > 0) && (
              <button onClick={handlePostWithGeneratedTags} disabled={postDetails.saving} className={`opacity-${postDetails.saving || postDetails.body.length < 50 ? '50' : '100'} block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center`}>
                {postDetails.saving ? <span>saving...</span> : <span>publish</span>}
              </button>
            )}
            <p className="sm:mt-0 mb-4 text-gray-500 dark:text-gray-400">
              {characterSizes[postDetails.characterSize]} ({postDetails.body.length}).&nbsp;
              {!postDetails.published && (
                <button onClick={generateTags} className="cursor-pointer inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  {!postDetails.generating && (
                    <>
                      Generate tags
                      <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                    </>
                  )}
                  {postDetails.generating && (
                    <>
                      Generating...&nbsp;
                      <p role="status">
                        <svg aria-hidden="true" className="inline w-6 h-6 ms-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                      </p>
                    </>
                  )}
                </button>
              )}
              {postDetails.published && (
                <button onClick={handlePostAnother} className="cursor-pointer inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Post another?
                </button>
              )}
            </p>
            {postDetails.error && (
              <div className="p-4 mb-5 text-base text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {(postDetails.error && postDetails.errorResponse === '') && (<span>Could not auto-tag. Try again.</span>)}
                {(postDetails.error && postDetails.errorResponse !== '') && (<span><span className="font-bold">Suggestion:</span> {postDetails.errorResponse}</span>)}
            </div>
            )}
            {postDetails.autoTagging.length > 0 && (
              <div className="pb-8 mt-4">
                {renderAutoTags()}
              </div>
            )}
            {postDetails.autoTagging.length === 0 && (
              <div className="pb-8 mt-4">
                {renderTags()}
              </div>
            )}
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Post;