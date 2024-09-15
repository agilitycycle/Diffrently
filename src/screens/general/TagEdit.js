import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from '../../context/CategoryContext';
import axios from 'axios';
import { fbSet, fbPush } from '../../services/firebaseService';
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
  tags: [
    {
      tag: 'Person'
    },
    {
      tag: 'Place'
    },
    {
      tag: 'Thing'
    }
  ],
  selected: [],
  autoTagging: [],
  generating: false,
  saving: false,
  published: false
};

const maxCharacters = 850;

const TagEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAppState = useSelector(appState);
  const contextObj = useContext(CategoryContext);
  const { credit, userId, tagEdit } = currentAppState;
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [characterCount, setCharacterCount] = useState(maxCharacters);
  const [postDetails, setPostDetails] = useState(initialState);
  const [tagFormValue, setTagFormValue] = useState('');

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
    // remove space, special characters
    return tag.replace(/\w+/g, (a) =>
    `${a.charAt(0).toUpperCase()}${a.substr(1)}`).replace(/\s/g, '').replace(/[^\w\s]/gi, '');
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

  // What happens when I publish post?
  const handlePost = async () => {
    const { body } = postDetails;
    if (body.length < 3) return;
    if (body.length > 49 && body.length < 851 && credit > 0 &&
      credit >= postDetails.autoTagging.length) {
      // remove credit
      const tagsCredit = credit - postDetails.autoTagging.length;
      fbSet(`/users/${userId}/credit`, tagsCredit);
      const newAppState = Object.assign({...currentAppState}, {
        credit: tagsCredit
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
        predefinedTags: JSON.stringify(postDetails.selected),
        body
      }

      for (const key of postDetails.autoTagging) {
        postItem[`tag${key}`] = true;
      }

      // fbPush(`/userPost/${userId}/post/`, postItem);
      fbPush(`/userTags/${userId}/post/${selectedCategory}`, postItem);
    }
  }

  const handleNewTag = (e) => {
    const { value } = e.target;
    setTagFormValue(value);
  }

  const handleAddTag = async () => {
    // testing for space
    let hydrateBody = /\s/.test(tagFormValue) ?
      tagFormValue.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()).replace(/\s/g, '') :
      tagFormValue;

    // remove any special characters
    hydrateBody = hydrateBody.replace(/[^\w\s]/gi, '');
      
    // capitalize first letter
    hydrateBody = capitalizeFirstLetter(hydrateBody);

    // no duplicates
    if (postDetails.tags.some(obj => obj.tag === hydrateBody)) return;

    if (tagFormValue.length > 2) {
      const newTags = [...postDetails.tags];
      newTags.push({
        tag: hydrateBody
      });
      const newPostDetails = Object.assign({...postDetails}, {
        tags: newTags
      });
      setPostDetails(newPostDetails);
      setTagFormValue('');
    }
  }

  const removeAutoTag = (tagName) => {
    let newAutoTagging = [...postDetails.autoTagging];
    newAutoTagging = newAutoTagging.filter(e => e !== tagName);
    const newPostDetails = Object.assign({...postDetails}, {
      autoTagging: newAutoTagging
    });

    // Remove from selected
    if ((postDetails.selected && postDetails.selected.some(obj => obj.tag === tagName))) {
      let newSelected = [...postDetails.selected];
      newSelected = newSelected.filter(x => x.tag != tagName);
      newPostDetails.selected = newSelected;
    }

    setPostDetails(newPostDetails);
  }

  const addSelected = (tagName) => {
    const newSelected = [...postDetails.selected];
    newSelected.push({
      tag: tagName
    });
    const unique = arr => arr.filter((el, i, array) => array.indexOf(el) === i);
    const newPostDetails = Object.assign({...postDetails}, {
      selected: unique(newSelected)
    });
    setPostDetails(newPostDetails);
  }

  const removeSelected = (tagName) => {
    let newSelected = [...postDetails.selected];
    newSelected = newSelected.filter(x => x.tag != tagName);
    const newPostDetails = Object.assign({...postDetails}, {
      selected: newSelected
    });
    setPostDetails(newPostDetails);
  }

  const setCategoryFormValue = (event) => {
    const { target } = event;
    const { value } = target;
    setSelectedCategory(value);
  }

  const renderClickableTags = () => {
    return postDetails.tags.map((item, index) => {
      if ((postDetails.selected && postDetails.selected.some(obj => obj.tag === item.tag))) {
        return (<span key={`tag${index}`} onClick={() => removeSelected(item.tag)} className="inline-block border border-blue-500 text-blue-500 bg-transparent cursor-pointer text-sm font-medium me-2 mb-2 px-2.5 py-0.5 rounded">- {item.tag}</span>)
      }
      return (<span key={`tag${index}`} onClick={() => addSelected(item.tag)} className="inline-block border border-neutral-400 text-neutral-400 bg-transparent cursor-pointer text-sm font-medium me-2 mb-2 px-2.5 py-0.5 rounded">+ {item.tag}</span>)
    })
  }

  const renderGeneratedTags = () => {
    return postDetails.autoTagging.map((item, index) => {
      const highlight = (postDetails.selected.some(obj => obj.tag === item)) ? 'border-violet-400 text-violet-400' : 'border-emerald-300 text-emerald-300';
      return (<span key={`tag${index}`} className={`${highlight} cursor-pointer inline-block border bg-transparent text-sm font-medium me-2 mb-2 pr-2.5 py-0.5 rounded`}>
        <a href={null} onClick={() => removeAutoTag(item)} className="pl-2.5 pr-2">x</a> {item}
      </span>)
    }) 
  }

  useEffect(() => {
    if (tagEdit && selectedCategory === undefined) {
      setSelectedCategory(tagEdit);
    }
  }, tagEdit)

  useEffect(() => {
    if (categoriesLoaded) return;
    if (contextObj.loaded && contextObj.categories.length < 1) {
      // no tags avail yet
      setCategoriesLoaded(true);
    }
    if (contextObj.categories.length > 0) {
      const newCategories = [...contextObj.categories];
      setCategories(newCategories);
      setCategoriesLoaded(true);
    }
  }, [contextObj.categories, categoriesLoaded, setCategories])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="w-[500px] h-full">
          <Header title="Tag edit" />
		      <div>
            <textarea value={postDetails.body} onChange={handleChange} rows="9" className="resize-none block py-2.5 pr-2.5 mb-20 w-full text-lg text-lg text-white bg-transparent !outline-none" placeholder="Write something..."/>
          </div>
          <div className="text-center">
            <div className="sm:mt-0 mb-6 text-gray-500 dark:text-gray-400">
              Max: ({characterCount})
            </div>
            <div className="mb-6 mt-4 mx-auto block text-gray-500 w-10/12">
              <select value={tagEdit || 'Choose a category'} onChange={setCategoryFormValue} className="bg-transparent border border-gray-700 text-neutral-400 text-sm rounded-lg block w-full p-2.5 dark:bg-transparent dark:border-gray-700 dark:text-neutral-400">
                <option value="Choose a category">Choose a category</option>
                {categories.map((item) => {
                  return (
                    <option value={item.categoryName}>{item.categoryName}</option>
                  )
                })}
              </select>
            </div>
            <div className="p-6 mb-16 mt-4 mx-auto block text-gray-500 rounded border border-gray-700 w-10/12">
              <div className="space-y-1">
                <ul className="w-full">
                  <li>
                    <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                      <div className="grow mb-8">
                        <input type="text" value={tagFormValue} onChange={handleNewTag} className="w-full h-[40px] bg-transparent text-white text-lg block inline py-2.5 border-b border-b-sky-100 !outline-none" placeholder="Help your AI learn" />
                      </div>
                      <div className="flex-none">
                        <button type="button" onClick={handleAddTag} disabled={postDetails.tags.length > 25} className="h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add tags</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {renderClickableTags()}
            </div>
            {/** Feed button **/}
            {postDetails.published && (
              <button onClick={() => navigate('/tags')} className="block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
                tags
              </button>
            )}
            {/** Generate **/}
            {(postDetails.autoTagging.length === 0) && (
              <button onClick={generateTags} disabled={postDetails.generating || postDetails.selected.length == 0} className={`opacity-${postDetails.generating || (postDetails.body.length < 50 || postDetails.body.length > 850 || characterCount < 0 || postDetails.selected.length == 0) ? '50' : '100'} block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center`}>
                {postDetails.generating ? <span>generating...</span> : <span>generate</span>}
              </button>
            )}
            {/** Publish **/}
            {(!postDetails.published && postDetails.autoTagging.length > 0) && (
              <button onClick={handlePost} disabled={!credit || credit - postDetails.autoTagging.length < 0 || postDetails.saving || selectedCategory === undefined} className={`opacity-${!credit || credit - postDetails.autoTagging.length < 0 || postDetails.saving || (postDetails.body.length < 50 || postDetails.body.length > 850 || characterCount < 0 || selectedCategory === undefined) ? '50' : '100'} block rounded-full mb-8 mx-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center`}>
                {postDetails.saving ? <span>saving...</span> : <span>publish</span>}
              </button>
            )}
            {/** Generate again **/}
            {!postDetails.published && postDetails.autoTagging.length > 0 && (<>
              <div className="w-full mb-16 flex flex-col items-center justify-center font-normal text-blue-600 dark:text-blue-500">
                <div className="text-sm mb-3">
                  {credit - postDetails.autoTagging.length >= 0 && (
                    <span className="text-neutral-400">Yes, you can publish. ({credit})</span>
                  )}
                  {credit !== 0 && credit - postDetails.autoTagging.length < 0 && (
                    <span className="text-neutral-400">Please remove some tags, you only have - {credit} credits</span>
                  )}
                  {!credit && (
                    <span className="text-neutral-400">Sorry, you have no credit to publish. (0)</span>
                  )}
                </div>
                <div>
                  <span className="font-sm">Unhappy?</span>&nbsp;<a href={null} onClick={generateTags} className="cursor-pointer underline">Generate again</a>.
                </div>
              </div>
            </>)}
            {/** Post another **/}
            {postDetails.published && (
              <p className="sm:mt-0 mb-4 text-gray-500 dark:text-gray-400">
                <button onClick={handlePostAnother} className="cursor-pointer inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Post another?
                </button>
              </p>
            )}
            {/** Render error **/}
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
                <div>&nbsp;</div>
              </>
            )}
            {/** Render generated tags **/}
            {postDetails.autoTagging.length > 0 && (
              <div className="pb-8 mt-4">
                <div className="my-8">
                  {renderGeneratedTags()}
                </div>
              </div>
            )}
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default TagEdit;