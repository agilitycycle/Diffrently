import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appState } from '../../app/appSlice';
import {
  fbOnValueOrderByChildLimitToLast,
  fbOnValueOrderByChildEndAtLimitToLast
} from '../../services/firebaseService';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const Subscribers = () => {
  const currentAppState = useSelector(appState);
  const { photoUrl } = currentAppState;
  const [subscribers, setSubscribers] = useState([]);
  const [subscribersLoaded, setSubscribersLoaded] = useState(false);
  const [lastId, setLastId] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);

  const getSubscribers = async () => {
    const path = '/userStatus/';

    let result = (lastId === '') ? 
      await fbOnValueOrderByChildLimitToLast(path, 'subscriber', true, 5) :
      await fbOnValueOrderByChildEndAtLimitToLast(path, 'subscriber', lastId, 6);

    const currentSubscribers = [...subscribers];
    
    const newSubscribers = [];
    for (let i in result) {
      newSubscribers.push(Object.assign({ id: i }, result[i]));
    }

    if (newSubscribers.length > 0) {
      const newId = newSubscribers.reverse()[newSubscribers.length - 1].id;

      const merged = currentSubscribers.concat(newSubscribers.filter(item2 =>
        !currentSubscribers.some(item1 => item1.id === item2.id)
      ));

      const unique = arr => arr.filter((el, i, array) => array.indexOf(el) === i);

      setSubscribers(unique(merged));

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

    if (newSubscribers.length === 0) {
      setPaginationEnd(true);
    }

    setSubscribersLoaded(true);
  }

  const renderSubscribers = () => {
    if (subscribers.length < 1) return;
    return subscribers.map((item, index) => {
      return (<div key={`subscribers${index}`} className="flex flex-row text-white mb-6">
        <div>
          <div className="flex items-center justify-center rounded-full w-14 h-14 bg-[#40435a]" style={renderProfileStyle()}>
            &nbsp;
          </div>
        </div>
        <div className="flex-1 text-left text-[#ffffff]">
          <div className="mx-5">
            <p className="text-xl font-bold">
              <span className="flex items-center text-white mb-1">James Star</span>
            </p>
            <p className="text-base text-[#A9AAC5] leading-9 mb-3" style={{wordBreak: 'break-word'}}>
              Updated 2 days ago.
            </p>
          </div>
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
    if (!subscribersLoaded) {
      getSubscribers();
    }
    // eslint-disable-next-line
  }, [subscribersLoaded])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full sm:w-7/12">
          <Header title="Subscribers" />
          <div className="min-w-80 pb-7">
            {renderSubscribers()}
            {(!paginationEnd && subscribers.length > 4) && (
              <div className="flex items-center justify-center mb-3">
                <button type="button" onClick={getSubscribers} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Load More</button>
              </div>
            )}
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Subscribers;