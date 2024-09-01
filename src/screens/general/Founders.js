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

const Founders = () => {
  const currentAppState = useSelector(appState);
  const { photoUrl } = currentAppState;
  const [founders, setFounders] = useState([]);
  const [foundersLoaded, setFoundersLoaded] = useState(false);
  const [lastId, setLastId] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);

  const getFounders = async () => {
    const path = '/userStatus/';

    let result = (lastId === '') ? 
      await fbOnValueOrderByChildLimitToLast(path, 'founder', true, 5) :
      await fbOnValueOrderByChildEndAtLimitToLast(path, 'founder', lastId, 6);

    const currentFounders = [...founders];
    
    const newFounders = [];
    for (let i in result) {
      newFounders.push(Object.assign({ id: i }, result[i]));
    }

    if (newFounders.length > 0) {
      const newId = newFounders.reverse()[newFounders.length - 1].id;

      const merged = currentFounders.concat(newFounders.filter(item2 =>
        !currentFounders.some(item1 => item1.id === item2.id)
      ));

      const unique = arr => arr.filter((el, i, array) => array.indexOf(el) === i);

      setFounders(unique(merged));

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

    if (newFounders.length === 0) {
      setPaginationEnd(true);
    }

    setFoundersLoaded(true);
  }

  const renderSubscribers = () => {
    if (founders.length < 1) return;
    return founders.map((item, index) => {
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
    if (!foundersLoaded) {
      getFounders();
    }
    // eslint-disable-next-line
  }, [foundersLoaded])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full sm:w-7/12">
          <Header title="Subscribers" />
          <div className="min-w-80 pb-7">
            {renderSubscribers()}
            {founders.length < 1 && (
              <div className="flex flex-row text-white mb-6">
                <div className="flex-1 text-left text-[#ffffff]">
                  <a href={null} className="block w-full p-6 bg-white border border-gray-700 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">No founders</h5>
                    <p className="text-base text-[#A9AAC5] dark:text-[#A9AAC5] leading-loose">Consider supporting us to become a founder.</p>
                  </a>
                </div>
              </div>
            )}
            {(!paginationEnd && founders.length > 4) && (
              <div className="flex items-center justify-center mb-3">
                <button type="button" onClick={getFounders} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Load More</button>
              </div>
            )}
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Founders;