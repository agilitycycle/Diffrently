import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState, appState } from '../app/appSlice';

const Menu = () => {
	const currentAppState = useSelector(appState);
  const { loggedIn } = currentAppState;
	const dispatch = useDispatch();

	return (<div className="w-8 absolute right-5" onClick={() => {
		const newAppState = {...currentAppState};
    (!loggedIn) ?
      newAppState.drawerHome = !newAppState.drawerHome :
      newAppState.drawer = !newAppState.drawer;
    dispatch(updateAppState(newAppState));
	}}>
		<div className="tham tham-e-squeeze tham-w-8 mt-5 ml-auto">
		  <div className="tham-box">
		    <div className="tham-inner bg-slate-300" />
		  </div>
		</div>
	</div>)
};

export default Menu;