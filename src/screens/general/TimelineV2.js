import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {appState} from '../../app/slices/appSlice';
import {updateSubjectState, subjectState} from '../../app/slices/subjectSlice';
import {fbdb} from '../../app/firebase';
import {ref, query, get} from 'firebase/database';
import {fbUpdate, fbPush} from '../../services/firebaseService';
import Masonry from 'react-masonry-component';
import {FiX} from 'react-icons/fi';
import {RiExpandLeftRightLine} from 'react-icons/ri';
import {
  Drawer,
  Header
} from '../../components';
import Make from '../../components/Cards/type/Make';

// https://purecode.ai/generations/b105581b-8e18-4545-83c2-a328b58b0e7e/0

const TimelineV2 = () => {
  const dispatch = useDispatch();
  const currentAppState = useSelector(appState);
  const currentSubjectState = useSelector(subjectState);
  const {userId} = currentAppState;
  const {
    subject,
    subjects,
    subjectId, // rename
    newSubject,
    subjectImageUrl, // rename
    currentSubject,
    currentTimeline
  } = currentSubjectState;  
  // does this need to be added back to subjects reducer?
  const [newSettings, setNewSettings] = useState({
    topic1: '', // could user add more than 3 topics?
    topic2: '',
    topic3: '',
    cardCount: 0
  });
  const [selectedTimeline, setSelectedTimeline] = useState(undefined);
  const [isOpen, setIsOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const {topic1, topic2, topic3, cardCount} = newSettings;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const {target} = e;
    const {value, name} = target;
    const newModel = {...newSettings};
    newModel[name] = value;
    setNewSettings(newModel);
  }

  const handleSubmit = (e) => {
    axios.post('https://d9mi4czmx5.execute-api.ap-southeast-2.amazonaws.com/prod/{read+}', JSON.stringify({
      option: 'generate-articles',
      data: {
        cardCount,
        text: `${subject}, ${topic1}, ${topic2}, ${topic3}`
      }
    })).then(resp => {
      console.log(resp)
      const { data } = resp;
      const { response } = data;
      const { content } = response;
      console.log(content)
  
      const newContent = JSON.parse(content);
      const {articles} = newContent;

      setLoaded(true);

      fbUpdate(`/userSubject/${userId}/subjects/${subjectId}`, {
        topic1,
        topic2,
        topic3,
        cardCount
      });

      articles.map((article) => {
        const {title, body} = article;
        fbPush(`/userTimelineV2/${subjectId}/post/`, {
          title,
          body
        });
      })

      const newSubjectState = Object.assign({}, {...currentSubjectState}, {
        newSubject: false,
        topic1: topic1,
        topic2: topic2,
        topic3: topic3,
        cardCount: cardCount,
        currentTimeline: articles
      });
      dispatch(updateSubjectState(newSubjectState));
  
    }).catch(error => {
      console.log(error);
    });
  }

  const setInitialTimeline = () => {
    const {
      topic1,
      topic2,
      topic3,
      cardCount,
      imageUrl,
      subject,
      id
    } = subjects[0];
    setNewSettings({
      topic1,
      topic2,
      topic3,
      cardCount
    })
    setSelectedTimeline(id);
    const newSubjectState = Object.assign({}, {...currentSubjectState}, {
      subjectImageUrl: imageUrl,
      subject, 
      currentSubject: id
    });
    dispatch(updateSubjectState(newSubjectState));
    setLoaded(true);
  }

  const getTimeline = async () => {
    const newTimeline = await loadTimeline();
    const timelineArray = [];
    for (let i in newTimeline) {
      const subjectObject = {id: i};
      for (let j in newTimeline[i]) {
        subjectObject[j] = newTimeline[i][j];
      }
      timelineArray.push(subjectObject);
    }

    const newSubjectState = Object.assign({}, {...currentSubjectState}, {
      currentTimeline: timelineArray
    });
    dispatch(updateSubjectState(newSubjectState));
  }

  const loadTimeline = () => {
    const subjectId = currentSubject;
    const userRef = ref(fbdb, `userTimelineV2/${subjectId}/post`);
    const q = query(userRef);
    return new Promise((resolve) => {
      get(q)
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch((error) => {
          console.log(error);
        });
    })
  }

  const renderOptions = () => {
    if (subjects.length < 1) return;
    return subjects.map(item => {
      const {id, subject} = item;
      return (<option value={id} selected={selectedTimeline === id}>{subject}</option>)
    })
  }

  const renderPost = () => {
    const cards = currentTimeline && currentTimeline.length > 0 ? currentTimeline : [...Array(6)];
    return cards.map((item, index) => {
      return (<div
        key={index}
        className="w-full sm:w-72 sm:max-w-72 p-3"
      >
        <div className="relative mb-1 bg-transparent border border-gray-200 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
          <div className="py-3 px-7">
            <h2 className="mb-4 text-xl text-white/60 font-semibold">{item && item.title || `Chapter ${index + 1}`}</h2>
            <p className="text-white/60">
              {item && item.body || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
            </p>
          </div>
        </div>
      </div>)
    })
  }

  const makeProps = {
    topic1,
    topic2,
    topic3,
    cardCount,
    imageUrl: subjectImageUrl,
    loaded,
    handleChange,
    handleSubmit
  }

  useEffect(() => {
    if (newSubject) {
      setSelectedTimeline(subjectId)
    }
  }, newSubject)

  useEffect(() => {
    if (currentSubject) {
      // get timeline
      getTimeline();
    }
  }, [currentSubject])

  useEffect(() => {
    if (!loaded && !newSubject) {
      // check to see if there is any default timeline
      if (subjects.length > 0) {
        // set initial timeline
        setInitialTimeline();
      }
    }
  }, [subjects])

	return (
    <div className="flex">
      <aside
        className={`fixed top-0 left-0 h-screen bg-transparent border-r border-gray-800 text-white transition-all duration-500 ease-in-out ${isOpen ? "w-72" : "w-20"} z-50`}>
        <button
          onClick={toggleSidebar}
          className="h-8 absolute -right-7 top-0 bottom-0 my-auto bg-[#000423] border border-gray-800 p-2 rounded-full hover:bg-[#000423] focus:outline-none">
          {isOpen ? (
            <FiX className="w-4 h-4 text-white relative -top-[1px]" />
          ) : (
            <RiExpandLeftRightLine className="w-4 h-4 text-white relative -top-[1px]" />
          )}
        </button>
        <div className="px-4 py-6 overflow-hidden">
          <div className={`transition-all duration-300 opacity-${isOpen ? 100 : 0}`} style={{
            width: '256px',
            marginTop: '67px'
          }}>
            <Make {...makeProps} />
          </div>
        </div>
      </aside>
      <main
        className={`flex grow overflow-hidden transition-all duration-500 mr-72 ${
          isOpen ? "ml-72" : "ml-20"
        }`}
      >
        <div className={`container mx-auto px-9 py-8`}>
          <Drawer />
          <Header />
          <Masonry className={`-mt-3 -mx-3 w-[calc(${isOpen ? '0' : '18rem'}})]`}>{renderPost()}</Masonry>
        </div>
      </main>
      <aside
        className="fixed top-0 right-0 h-screen bg-transparent border-l border-gray-800 text-white transition-all duration-500 ease-in-out w-72">
        <div className="px-4 py-6 overflow-hidden">
          <div style={{
            width: '256px',
            marginTop: '67px'
          }}>
            <div className="text-lg mb-5">
              #{subject}
            </div>
            <div>
              <select name="timeline" onChange={() => {}} className="bg-transparent border border-gray-200 dark:border-gray-700 text-white/60 text-base rounded-lg block w-full p-2.5 mb-8 !outline-none">
                <option value="Select timeline" selected={!selectedTimeline}>Select Timeline</option>
                {renderOptions()}
              </select>
            </div>
            <div className="text-sm text-[#B3B5CC] mb-2">
              {`Exact match >`}
            </div>
            <ul className="text-sm text-blue-600 leading-loose">
              <li>#russellCrowe | 25 cards</li>
              <li>#russellCrowe | 25 cards</li>
              <li>#russellCrowe | 25 cards</li>
              <li>#russellCrowe | 25 cards</li>
              <li>#russellCrowe | 25 cards</li>
              <li>#russellCrowe | 25 cards</li>
            </ul>
            {/**
             * 
             * Google Square Ad
             * 
             */}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2497889154695387"
              crossorigin="anonymous"></script>
            <ins className="adsbygoogle"
              style={{display: 'block'}}
              data-ad-client="ca-pub-2497889154695387"
              data-ad-slot="6935324495"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            {/**
             * 
             * End ~
             * 
             */}
            <p className="text-sm text-[#B3B5CC] text-center w-9/12 mx-auto leading-loose">
              Pay a mo. subscription for no Ads, Unlimited timelines and more control.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TimelineV2;