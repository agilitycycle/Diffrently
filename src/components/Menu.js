import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState, appState } from '../app/appSlice';

const Menu = () => {
	const currentAppState = useSelector(appState);
	const dispatch = useDispatch();

	return (<div onClick={() => {
		const newAppState = {...currentAppState};
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