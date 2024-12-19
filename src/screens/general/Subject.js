import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { appState } from '../../app/slices/appSlice';
import { updateSubjectState, subjectState, initialState } from '../../app/slices/subjectSlice';
import { fbPush } from '../../services/firebaseService';
import {
  Page,
  Drawer,
  Header
} from '../../components';

const renderPlaceholderTags = () => {
  return (<div className="w-4/5 sm:w-[410px] text-center">
    <button className="mb-6 sm:mb-8">
      <span className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm sm:text-base font-medium mx-2 px-2.5 py-1.5 sm:mx-3 rounded">
        Person
      </span>
    </button>
    <button className="mb-6 sm:mb-8">
      <span className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm sm:text-base font-medium mx-2 px-3 py-1.5 sm:mx-3 rounded">
        Place
      </span>
    </button>
    <button className="mb-6 sm:mb-8">
      <span className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm sm:text-base font-medium mx-2 px-3 py-1.5 sm:mx-3 rounded">
        Book
      </span>
    </button>
    <button className="mb-6 sm:mb-8">
      <span className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm sm:text-base font-medium mx-2 px-3 py-1.5 sm:mx-3 rounded">
        Movie
      </span>
    </button>
    <button className="mb-6 sm:mb-8">
      <span className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm sm:text-base font-medium mx-2 px-3 py-1.5 sm:mx-3 rounded">
        History
      </span>
    </button>
    <button className="mb-6 sm:mb-8">
      <span className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm sm:text-base font-medium mx-2 px-3 py-1.5 sm:mx-3 rounded">
        Things
      </span>
    </button>
    <button className="mb-6 sm:mb-8">
      <span className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm sm:text-base font-medium mx-2 px-3 py-1.5 sm:mx-3 rounded">
        Bio
      </span>
    </button>
  </div>)
}

const Subject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAppState = useSelector(appState);
  const currentSubjectState = useSelector(subjectState);
  const {userId} = currentAppState;
  const {subjects} = currentSubjectState;
  const [subject, setSubject] = useState('');

  const handleChange = (e) => {
    const {target} = e;
    const {value} = target;
    setSubject(value);
  }
  
  const handleSubject = () => {
    if (subject.length > 3) {
      axios.post('https://d9mi4czmx5.execute-api.ap-southeast-2.amazonaws.com/prod/{read+}', JSON.stringify({
        option: 'subject-type',
        data: {
          text: subject
        }
      })).then(resp => {
        const { data } = resp;
        const { response } = data;
        const { content } = response;
    
        const newContent = JSON.parse(content);
        const {category, tags} = newContent;

        // {category: 'Person', tags: ['actor', 'film']}

        const fbHydrated = {
          subject: hydrateTag(subject),
          category: hydrateTag(category),
          tags: JSON.stringify(tags.map(tag => hydrateTag(tag)))
        };

        const hydrated = {
          subject: hydrateTag(subject),
          category: hydrateTag(category),
          tags: tags.map(tag => hydrateTag(tag))
        };

        const subjectId = fbPush(`/userSubject/${userId}/subjects/`, fbHydrated);

        const amendedState = {};
        amendedState.value = {...initialState.value};
        amendedState.value.subjects = subjects || [];

        const newSubjects = [...subjects];
        newSubjects.push({
          id: subjectId,
          subject: hydrateTag(subject)
        });

        const newSubjectState = Object.assign(
          {}, {...amendedState.value}, hydrated, {subjectId}, {newSubject: true}, {subjects: newSubjects}
        );
        dispatch(updateSubjectState(newSubjectState));

        // redirect
        navigate('/add-settings');
    
    }).catch(error => {
      console.log(error);
    });
  }
  }

  const hydrateTag = (tag) => {
    // remove space, special characters
    const hydrated = tag.replace(/\w+/g, (a) =>
    `${a.charAt(0).toUpperCase()}${a.substr(1)}`).replace(/\s/g, '').replace(/[^\w\s]/gi, '');
    return [hydrated].filter(a => a.toLowerCase() && a.length < 25)[0];
  }

	return (<>
		<Page>
			<Drawer />
      <Header />
      <div className="flex flex-col items-center justify-center h-3/5 sm:h-4/5">
        <div className="transition-all ease-in-out mb-8 sm:mb-16 lg:mb-20 text-white text-3xl sm:text-6xl font-light">
          What is this about?
        </div>
        <div className="transition-all ease-in-out w-full lg:w-2/3 rounded-full border border-gray-200 dark:border-gray-700 mb-7 sm:mb-14 px-8 py-3.5 sm:px-10 sm:py-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white text-2xl sm:text-5xl mr-4 sm:mr-5">#</span>
              <input value={subject} onChange={handleChange} className="text-white text-2xl sm:text-5xl font-light bg-transparent !outline-none" placeholder="Who/what/where" />
            </div>
            <button onClick={handleSubject} className="bg-emerald-400 w-11 sm:w-16 text-base sm:text-xl p-2 sm:p-3 rounded-full items-end">
              Go
            </button>
          </div>
        </div>
        {renderPlaceholderTags()}
      </div>
      <div className="hidden flex flex-col items-center justify-center h-3/5 sm:h-4/5">
        <div className="transition-all ease-in-out mb-8 sm:mb-16 lg:mb-20 text-white text-3xl sm:text-6xl font-light">
          Is this a Person?
        </div>
        <div className="transition-all ease-in-out w-full lg:w-2/3 rounded-full border border-gray-200 dark:border-gray-700 px-10 py-5">
          <span className="text-white text-xl sm:text-5xl mr-5">#</span>
          <input className="text-white text-xl sm:text-5xl font-light bg-transparent !outline-none" value="russellcrowe" placeholder="What/who/where" />
        </div>
      </div>
	  </Page>
  </>);
};

export default Subject;