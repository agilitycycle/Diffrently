import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { updateAppState, appState } from '../app/appSlice';
import { clsx } from 'clsx';

const openClassNames = {
  right: 'translate-x-0',
  left: 'translate-x-0',
  top: 'translate-y-0',
  bottom: 'translate-y-0'
};

const closeClassNames = {
  right: 'translate-x-full',
  left: '-translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full'
};

const classNames = {
  right: 'inset-y-0 right-0',
  left: 'inset-y-0 left-0',
  top: 'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0'
};

const Drawer = ({ side = 'left' }) => {
  const currentAppState = useSelector(appState);
  const { admin } = currentAppState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = currentAppState && currentAppState.drawer;

  const drawerMenuItemClicked = () => {
    const newAppState = {...currentAppState};
    newAppState.drawerMenuItemClicked = !newAppState.drawerMenuItemClicked;
    dispatch(updateAppState(newAppState));
  }

  const toggleDrawer = () => {
    const newAppState = {...currentAppState};
    newAppState.drawer = !newAppState.drawer;
    if (!newAppState.drawer) {
      newAppState.drawerMenuItemClicked = false;
    }
    dispatch(updateAppState(newAppState));
  }

  const handleSignOut = () => {
    const auth = getAuth();
    const newDrawerState = !currentAppState.drawerMenuItemClicked;
    signOut(auth).then(() => {
      const newAppState = Object.assign({...currentAppState}, {
        drawerMenuItemClicked: newDrawerState,
        loggedIn: false,
        photoUrl: '',
        displayName: '',
        email: '',
        userId: ''
      });
      dispatch(updateAppState(newAppState));
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if (currentAppState.drawerMenuItemClicked) {
      setTimeout(() => toggleDrawer(), 25)
    }
  }, [currentAppState]);

  return (
    <div
      id={`dialog-${side}`}
      className='relative z-10'
      aria-labelledby='slide-over'
      role='dialog'
      aria-modal='true'
      onClick={toggleDrawer}
    >
      <div
        className={clsx(
          'fixed inset-0 bg-gray-500 bg-opacity-75 transition-all',
          {
            'opacity-100 duration-500 ease-in-out visible': open
          },
          { 'opacity-0 duration-500 ease-in-out invisible': !open }
        )}
      ></div>
      <div className={clsx({ 'fixed inset-0 overflow-hidden': open })}>
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className={clsx(
              'pointer-events-none fixed max-w-full',
              classNames[side]
            )}
          >
            <div
              className={clsx(
                'pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500',
                { [closeClassNames[side]]: !open },
                { [openClassNames[side]]: open }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                className={clsx(
                  'flex flex-col h-full w-64 bg-white p-10 shadow-xl bg-blue-400'
                )}
              >
                <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                <div className="py-4 overflow-y-auto">
                  <ul className="space-y-2 font-medium">
                    <li>
                      <Link to="/profile" onClick={drawerMenuItemClicked} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/timeline" onClick={drawerMenuItemClicked} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                        <span>Timeline</span>
                      </Link>
                    </li>
                    {/*<li>
                      <Link to="/tags" onClick={drawerMenuItemClicked} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                        <span>Live</span>
                        <svg className="w-4 h-4 ml-3 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/></svg>
                      </Link>
                    </li>*/}
                    <li>
                      <Link to="/subscribers" onClick={drawerMenuItemClicked} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 text-center">Subscribers</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/founders" onClick={drawerMenuItemClicked} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                        <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-2.5 text-center">Founders</button>
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleSignOut} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                        <span>Sign out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;