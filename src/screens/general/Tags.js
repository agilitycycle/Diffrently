import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CategoryContext } from '../../context/CategoryContext';
import { fbSet, fbUpdate, fbRemove } from '../../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../../components';
import { appState } from '../../app/appSlice';

// reorder results
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: '#000423',
  ...draggableStyle
});

const getListStyle = () => ({
  padding: grid
});

const Tags = () => {
  const navigate = useNavigate();
  const currentAppState = useSelector(appState);
  const contextObj = useContext(CategoryContext);
  const { credit, userId } = currentAppState;
  const [formTags, setFormTags] = useState([
    {
      categoryName: 'Default'
    }
  ]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [categoriesFormValue, setCategoriesFormValue] = useState('');
  const [max, setMax] = useState(4);

  const capitalizeFirstLetter = (categoryName) => {
    return `${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`;
  }

  const loadMore = () => {
    setMax(100);
  }

  const showLess = () => setMax(4);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const newFormTags = reorder(
      formTags,
      result.source.index,
      result.destination.index
    );

    newFormTags.map((item, index) => {
      // update order in firebase
      fbUpdate(`/userCategories/${userId}/categories/${item.categoryName}`, {
        order: index,
        description: ''
      });
    })

    setFormTags(newFormTags);
  }
  

  /**
   * 
   * What happens to existing post?
   * 
   */
  const handleDeleteTag = (category) => {
    fbRemove(`/userCategories/${userId}/categories/${category}`);
    fbRemove(`/userTags/${userId}/post/${category}`); 
    setCategoriesLoaded(false);
    contextObj.loading();
    contextObj.getCategories(userId);
  }

  const handleNewCategory = (e) => {
    const { value } = e.target;
    setCategoriesFormValue(value);
  }

  const handleAddCategory = () => {
    if (categoriesFormValue.length > 2) {
      // testing for space
      let hydrateBody = /\s/.test(categoriesFormValue) ?
        categoriesFormValue.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()).replace(/\s/g, '') :
        categoriesFormValue;

      // remove any special characters
      hydrateBody = hydrateBody.replace(/[^\w\s]/gi, '');
        
      // capitalize first letter
      hydrateBody = capitalizeFirstLetter(hydrateBody);

      // no duplicates
      if (contextObj.categories.some(obj => obj.categoryName === hydrateBody)) return;

      // reset context loading
      contextObj.loading();

      fbSet(`/userCategories/${userId}/categories/${hydrateBody}`, {
        description: ''
      });

      setCategoriesLoaded(false);
      setCategoriesFormValue('');
      contextObj.getCategories(userId);
    }
  }

  const setCategory = (categoryName) => {
    navigate(`/tags/${categoryName}`);
  }

	const renderList = () => {
    return formTags.map((item, index) => {
      if (index >= max) return false;
      const elementId = `tag${index}`;
      return (
        <Draggable key={elementId} draggableId={elementId} index={index}>
          {(provided, snapshot) => (
            <li
              className="py-4"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                provided.draggableProps.style
              )}
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="inline-flex items-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900 truncate dark:text-white mb-0.5">
                    <a href={null} onClick={() => setCategory(item.categoryName)} className="flex items-center text-white">
                      <span>{item.categoryName} ({item.post})</span>
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Your tag description...
                  </p>
                </div>
                <div className="inline-flex items-center">
                  <button type="button" onClick={() => handleDeleteTag(item.categoryName)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 mr-2 text-rose-900">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-2 py-1 text-center">Edit</button>
                </div>
              </div>
            </li>
          )}
        </Draggable>
      )
    })
  }

  /**
   * 
   * Two sets of load:
   * 1. One from context level
   * 2. One for UI level
   * 
   */
  
  useEffect(() => {
    if (categoriesLoaded) return;
    if (contextObj.loaded && contextObj.categories.length < 1) {
      // no tags avail yet
      setCategoriesLoaded(true);
    }
    if (contextObj.categories.length > 0) {
      const newCategories = [...contextObj.categories];
      setFormTags(newCategories);
      setCategoriesLoaded(true);
    }
  }, [contextObj.categories, categoriesLoaded, setFormTags])

	return (<>
		<div className="flex flex-col px-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-10/12 sm:w-6/12">
          <Header />
		      <h2 className="text-2xl text-white text-left leading-snug mb-2">
		      	Set up your categories
		      </h2>
			    <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-4">
		      	Organise your tags
		      </h3>
          <div>
            <div className="space-y-1">
              <ul className="w-full">
                <li>
                  <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                    <div className="grow mb-8">
                      <input type="text" value={categoriesFormValue} onChange={handleNewCategory} className="w-full h-[40px] bg-transparent text-white text-lg block inline py-2.5 border-b border-b-sky-100 !outline-none" placeholder="Add a category" />
                    </div>
                    <div className="flex-none">
                      <button type="button" onClick={handleAddCategory} disabled={formTags.length > 25} className="h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {contextObj.categories.length > 0 && (
              <div className="mb-6 space-y-1 text-gray-500 rounded border border-gray-700">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <ul
                        className="px-4 w-full divide-y divide-gray-200 dark:divide-gray-700"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {renderList()}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>
          {categoriesLoaded && (
            <div className="text-center">
              <div>
                <div className="flex items-center justify-center mt-10">
                  {max < 100 && (
                      <button onClick={loadMore} className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10">
                        Load more
                      </button>
                  )}
                  {max > 4 && (
                    <button onClick={showLess} className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10">
                      Show less
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {!credit && (
            <div className="flex flex-row text-white mb-6">
              <div className="flex-1 text-left text-[#ffffff]">
                <div className="block w-full p-6 bg-white border border-gray-700 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">You have 0 credit</h5>
                  <p className="text-base text-[#A9AAC5] dark:text-[#A9AAC5] leading-loose">{
                    !currentAppState.freeTrial ? (<a href={null} onClick={() => navigate('/subscriptions')} className="cursor-pointer hover:underline">Consider getting a FREE Trial plan.</a>) :
                      (<a href={null} onClick={() => navigate('/subscriptions')} className="cursor-pointer hover:underline">Consider getting a Pay as you go plan</a>)
                  }</p>
                </div>
              </div>
            </div>
          )}
		    </div>
		  </div>
	  </div>
  </>);
};

export default Tags;