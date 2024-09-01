import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appState } from '../../app/appSlice';
import { fbdb } from '../../app/firebase';
import { TagContext } from '../../context/TagContext';
import { ref, query, get} from 'firebase/database';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const initialLoaded = {
  tagsLoaded: false,
  postLoaded: false
}

const PostDetails = () => {
  const { tags } = useContext(TagContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentAppState = useSelector(appState);
  const { photoUrl, userId } = currentAppState;
  const [loaded, setLoaded] = useState({});
  const [postTagDetails, setPostTagDetails] = useState([]);
  const { pathname } = location;
  const { tagsLoaded, postLoaded } = loaded;
  const routePostId = pathname.substring(pathname.lastIndexOf('/') + 1);

  const loadTag = (tag) => {
    const newLoaded = {...loaded};
    newLoaded.postLoaded = false;
    setLoaded(newLoaded);
    setPostTagDetails([]);
    navigate(`/feed/${tag}`);
  }

  const getTags = (tagEl) => {
    return tagEl.map((tag, index) => {
      const highlightStyles = getTagName() === tag ? 'opacity-40 border border-[#A9AAC5] text-[#A9AAC5]' : 'border border-emerald-300 text-emerald-300';
      return <button key={`tag${index}`} className="mb-4" onClick={() => loadTag(tag)}>
        <span key={tag} className={`${highlightStyles} bg-transparent text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>
          {tag}
        </span>
      </button>
    })
  }

  const getTagName = () => {
    for (let key in postTagDetails[0]) {
      if (pathname.indexOf(key.split('tag')[1]) > -1) {
        return key.split('tag')[1];
      }
    }
  }

  const getPost = async () => {
    const path = `/userPost/${userId}/post/${routePostId}`;
    const userRef = ref(fbdb, path);
    const q = query(userRef);
    const result = await get(q)
      .then((snapshot) => {
        if (snapshot.val() !== null) {
          return snapshot.val();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setPostTagDetails([result]);

    const newLoaded = {...loaded};
    newLoaded.postLoaded = true;
    setLoaded(newLoaded);
  }

  const renderPost = () => {
    if (postTagDetails.length < 1) return;
    return postTagDetails.map((item, index) => {
      const { body } = item;
      const tagEl = Object.keys(item).filter(a => a.indexOf('tag') > -1).map(b => b.replace('tag', ''));
      return (<div key={`tag${index}`} className="flex flex-row text-white mb-12 sm:mb-24">
        <div>
          <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a]" style={renderProfileStyle()}>
            &nbsp;
          </div>
        </div>
        <div className="flex-1 text-left text-[#ffffff]">
          <div className="mx-5">
            <p className="text-xl font-bold mb-1">
              <span className="flex items-center text-white">{getTagName()}</span>
            </p>
            <p onClick={() => navigate(`/feed/${routePostId}/${item.id}`)} className="text-base cursor-pointer text-[#A9AAC5] leading-9 mb-3" style={{wordBreak: 'break-word'}}>
              {body.slice(0, 850)}
            </p>
            <p className="text-sm text-[#A9AAC5]">
              <span className="mr-2 opacity-60">1 day ago</span>
              {getTags(tagEl)}
            </p>
            {/*
            <div className="grid justify-items-end">
              <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4 me-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z"/>
                </svg>
                Report
              </button>
            </div>
            */}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
            &nbsp;
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
    setLoaded(initialLoaded);
    setPostTagDetails([]);
  }, [location]);

  useEffect(() => {
    if (tagsLoaded && !postLoaded) {
      getPost();
    }
    // eslint-disable-next-line
  }, [loaded, tagsLoaded, postLoaded, routePostId])

  useEffect(() => {
    if (tagsLoaded) return;
    if (tags.length > 0) {
      const newLoaded = {...loaded};
      newLoaded.tagsLoaded = true;
      setLoaded(newLoaded);
    }
  }, [loaded, tagsLoaded, tags.length])

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full sm:w-7/12">
          <Header title="Your feed" />
          <div className="min-w-80 pb-7">
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
                    <span className="flex items-center text-white">{routePostId}</span>
                  </p>
                  <p className="text-base text-[#A9AAC5] leading-loose">
                    Post loading...
                  </p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">1 day ago</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
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
                    <span className="flex items-center text-white">{routePostId}</span>
                  </p>
                  <p className="text-base text-[#A9AAC5] leading-loose">
                    No post avail.
                  </p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">
                    Write your first post.
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
            </div>)}
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default PostDetails;