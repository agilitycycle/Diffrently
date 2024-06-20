import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
                         <span>View profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/topic" onClick={drawerMenuItemClicked} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                         <span>Add topics</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/feed" onClick={drawerMenuItemClicked} className="flex items-center pt-2 pb-2 text-gray-900 dark:text-black">
                         <span>Feed</span>
                      </Link>
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