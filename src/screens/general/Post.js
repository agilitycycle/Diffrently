import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TagContext } from '../../context/TagContext';
import { fbSet, fbPush, fbUpdate } from '../../services/firebaseService';
import moment from 'moment';
import {
  Menu,
  Drawer,
  Header
} from '../../components';
import { updateAppState, appState } from '../../app/appSlice';

const initialState = {
  body: '',
  error: false,
  errorResponse: '',
  tags: [],
  tagsLoaded: false,
  autoTagging: [],
  generating: false,
  saving: false,
  published: false
};

const maxCharacters = 850;

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAppState = useSelector(appState);
  const { credit, userId } = currentAppState;
  const { tags, getTags } = useContext(TagContext);
  const [characterCount, setCharacterCount] = useState(maxCharacters);
  const [postDetails, setPostDetails] = useState(initialState);
  const [tagFormValue, setTagFormValue] = useState('');
  // eslint-disable-next-line
  const [max, setMax] = useState(4);

  const getCredit = () => {
    const tags = Number(credit.split('/')[0]);
    const post = Number(credit.split('/')[1]);
    return {
      tags,
      post
    }
  }

  const capitalizeFirstLetter = (tagName) => {
    return `${tagName.charAt(0).toUpperCase()}${tagName.slice(1)}`;
  }

  const generateTags = () => {
    const { body, tags } = postDetails;
    if (body.length < 3) return;
    if (body.length > 49) {
      // remove credit
      setPostDetails(Object.assign({...postDetails}, {
        published: false,
        saving: false,
        autoTagging: [],
        generating: true
      }));

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
          console.log(resp)
          
          const autoTaggingArray = content.split(',').map(item => hydrateTag(item)).filter(a => a.toLowerCase() !== 'error' && a.length < 25);

          // regex
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
    console.log(content);
    if (content.indexOf('This article can') > -1 ||
    content.indexOf('The article you') > -1 ||
    content.indexOf('This article fits') > -1 ||
    content.indexOf('article falls under') > -1 ||
    content.indexOf('falls under the category') > -1 ||
    content.indexOf('The provided article is related to') > -1 ||
    content.indexOf('The artical provided falls under') > -1 ||
    content.indexOf('The article provided seems') > -1 ||
    content.indexOf('I would classify this under') > -1 ||
    content.indexOf('This quote aligns with') > -1 ||
    content.indexOf('This quote is related') > -1 ||
    content.indexOf('This quote emphasizes') > -1 ||
    content.indexOf('This quote by') > -1 ||
    content.indexOf('The categories that best fit this') > -1 ||
    content.indexOf('Categories:') > -1) {
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
    setCharacterCount(maxCharacters - value.length);
    const newPostDetails = Object.assign({...postDetails}, {
      body: value,
      autoTagging: []
    });
    setPostDetails(newPostDetails);
  }

  const handlePostAnother = () => setPostDetails(initialState);

  const handlePost = async () => {
    const { body, tags } = postDetails;
    if (body.length < 3) return;
    if (body.length > 49 && body.length < 851 && getCredit().post > 0) {
      // remove credit
      const tagsCredit = getCredit().tags;
      let postCredit = getCredit().post - 1;
      fbSet(`/users/${userId}/credit`, `${tagsCredit}/${postCredit}`);
      const newAppState = Object.assign({...currentAppState}, {
        credit: `${tagsCredit}/${postCredit}`
      });
      dispatch(updateAppState(newAppState));

      setPostDetails(Object.assign({...postDetails}, { saving: true }));

      const newPostDetails = Object.assign({...postDetails}, {
        published: true,
        error: false,
        saving: true
      });

      // success
      setPostDetails(newPostDetails);

      const postItem = {
        dateCreated: moment().valueOf(),
        body
      }

      for (const key of postDetails.autoTagging) {
        postItem[`tag${key}`] = true;
      }

      const pushKey = fbPush(`/userPost/${userId}/post/`, postItem);

      for(let i in postDetails.autoTagging) {
        const tagPost = {};
        tagPost[pushKey] = true;
        fbUpdate(`/userTags/${userId}/tags/${postDetails.autoTagging[i]}`, tagPost);
      }

      await getTags(userId);
    }
  }

  const handleNewTag = (e) => {
    const { value } = e.target;
    setTagFormValue(value);
  }

  const handleAddTag = async () => {
    // check your not adding a duplicate
    let hydrateBody = /\s/.test(tagFormValue) ?
    tagFormValue.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()).replace(/\s/g, '') :
    tagFormValue;

    hydrateBody = capitalizeFirstLetter(hydrateBody);

    if (postDetails.tags.some(obj => obj.tag === hydrateBody)) return;

    if (postDetails.tagsLoaded && tagFormValue.length > 2 && getCredit().tags > 0) {
      // remove credit
      const tagsCredit = getCredit().tags - 1;
      let postCredit = getCredit().post;
      fbSet(`/users/${userId}/credit`, `${tagsCredit}/${postCredit}`);
      const newAppState = Object.assign({...currentAppState}, {
        credit: `${tagsCredit}/${postCredit}`
      });
      dispatch(updateAppState(newAppState));
      await setNewTag(hydrateBody);
      setTagFormValue('');
      const newPostDetails = {...postDetails}
      newPostDetails.tagsLoaded = false;
      setPostDetails(newPostDetails);
      await getTags(userId);
    }
  }

  const setNewTag = async (hydrateBody) => {
    await new Promise((resolve) => {
      fbSet(`/userTags/${userId}/tags/${hydrateBody}`, true);
      resolve(true);
    })
  }

  const removeAutoTag = (tagName) => {
    let newAutoTagging = [...postDetails.autoTagging];
    newAutoTagging = newAutoTagging.filter(e => e !== tagName);
    const newPostDetails = Object.assign({...postDetails}, {
      autoTagging: newAutoTagging
    });
    setPostDetails(newPostDetails);
  }

  const addAutoTag = (tagName) => {
    const newAutoTagging = [...postDetails.autoTagging];
    newAutoTagging.push(tagName);
    const newPostDetails = Object.assign({...postDetails}, {
      autoTagging: newAutoTagging
    });
    setPostDetails(newPostDetails);
  }

  const renderClickableTags = () => {
    return postDetails.tags.map((item, index) => {
      const highlightStyles = 'inline-block border border-blue-500 text-blue-500';
      return (<span key={`tag${index}`} onClick={() => addAutoTag(item.tag)} className={`${highlightStyles} bg-transparent cursor-pointer text-sm font-medium me-2 mb-2 px-2.5 py-0.5 rounded`}>+ {item.tag}</span>)
    })
  }

  const renderAutoTags = () => {
    return postDetails.autoTagging.map((item, index) => {
      return (<span key={`tag${index}`} className="cursor-pointer inline-block border border-emerald-300 text-emerald-300 bg-transparent text-sm font-medium me-2 mb-2 pr-2.5 py-0.5 rounded">
        <a href={null} onClick={() => removeAutoTag(item)} className="pl-2.5 pr-2">x</a> {item}
      </span>)
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
		    <div className="w-[500px] h-full">
          <Header title="Your feed" />
		      <div>
            <textarea value={postDetails.body} onChange={handleChange} rows="9" className="resize-none block py-2.5 pr-2.5 mb-20 w-full text-lg text-lg text-white bg-transparent !outline-none" placeholder="Write something..."/>
          </div>
          <div className="text-center">
            <div className="sm:mt-0 mb-6 text-gray-500 dark:text-gray-400">
              Max: ({characterCount})
            </div>
            {postDetails.published && (
              <button onClick={() => navigate('/feed')} className="block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
                feed
              </button>
            )}
            {(postDetails.autoTagging.length === 0) && (
              <button onClick={generateTags} disabled={postDetails.generating} className={`opacity-${postDetails.generating || (postDetails.body.length < 50 || postDetails.body.length > 850 || characterCount < 0) ? '50' : '100'} block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center`}>
                {postDetails.generating ? <span>generating...</span> : <span>generate</span>}
              </button>
            )}
            {(!postDetails.published && postDetails.autoTagging.length > 0) && (
              <button onClick={handlePost} disabled={postDetails.saving} className={`opacity-${postDetails.saving || (postDetails.body.length < 50 || postDetails.body.length > 850 || characterCount < 0) ? '50' : '100'} block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center`}>
                {postDetails.saving ? <span>saving...</span> : <span>publish ({getCredit().post})</span>}
              </button>
            )}
            <p className="sm:mt-0 mb-4 text-gray-500 dark:text-gray-400">
              {postDetails.published && (
                <button onClick={handlePostAnother} className="cursor-pointer inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Post another?
                </button>
              )}
            </p>
            {!postDetails.published && postDetails.error && (
              <>
                <div className="p-4 mb-6 text-base text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  {(postDetails.error && postDetails.errorResponse === '') && (<span>Could not auto-tag. Try again.</span>)}
                  {(postDetails.error && postDetails.errorResponse !== '') && (<span><span className="font-bold">Suggestion:</span> {
                    postDetails.errorResponse
                  }</span>)}
                </div>
                <div className="w-full flex items-center justify-center font-medium text-blue-600 dark:text-blue-500">
                  <a href={null} onClick={generateTags} className="cursor-pointer underline">Generate again</a>&nbsp;or add tags
                  <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </div>
                <div className="p-6 mt-4 block text-gray-500 rounded border border-gray-700 w-full">
                  <ul className="w-full sm:w-7/12">
                    <li>
                      <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                        <div className="grow mb-8">
                          <input type="text" value={tagFormValue} onChange={handleNewTag} className="w-full h-[40px] bg-transparent text-white text-lg block inline py-2.5 border-b border-b-sky-100 !outline-none" placeholder="Add a tag" />
                        </div>
                        <div className="flex-none">
                          <button type="button" onClick={handleAddTag} className="h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add ({getCredit().tags})</button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  {renderClickableTags()}
                </div>
                <div>&nbsp;</div>
              </>
            )}
            {postDetails.autoTagging.length > 0 && (
              <div className="pb-8 mt-4">
                {!postDetails.published && (<>
                  <div className="w-full flex items-center justify-center font-medium text-blue-600 dark:text-blue-500">
                    <a href={null} onClick={generateTags} className="cursor-pointer underline">Generate again</a>&nbsp;or add tags
                    <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </div>
                  <div className="p-6 mt-4 block text-gray-500 rounded border border-gray-700 w-full">
                    <div className="space-y-1">
                      <ul className="w-full sm:w-7/12">
                        <li>
                          <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                            <div className="grow mb-8">
                              <input type="text" value={tagFormValue} onChange={handleNewTag} className="w-full h-[40px] bg-transparent text-white text-lg block inline py-2.5 border-b border-b-sky-100 !outline-none" placeholder="Add a tag" />
                            </div>
                            <div className="flex-none">
                              <button type="button" onClick={handleAddTag} className="h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add ({getCredit().tags})</button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {renderClickableTags()}
                  </div>
                </>)}
                <div className={!postDetails.published ? 'mt-10 mb-2' : 'mt-7 mb-2'}>
                  {renderAutoTags()}
                </div>
              </div>
            )}
            {postDetails.autoTagging.length === 0 && !postDetails.error && (
              <div className="pb-8 mt-4 mb-2">
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