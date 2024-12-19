import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState, appState } from '../app/slices/appSlice';

const Menu = () => {
	const currentAppState = useSelector(appState);
  const { loggedIn } = currentAppState;
	const dispatch = useDispatch();
	return (<div className="w-[32px] mr-4" onClick={() => {
    const newAppState = {...currentAppState};
    (!loggedIn) ?
      newAppState.drawerHome = !newAppState.drawerHome :
      newAppState.drawer = !newAppState.drawer;
      dispatch(updateAppState(newAppState));
    }}>
    <div className="tham tham-e-squeeze tham-w-8 mr-auto">
      <div className="tham-box">
        <div className="tham-inner bg-[#000423] dark:bg-slate-300" />
      </div>
    </div>
  </div>)
};

export default Menu;