import React from 'react';
import { useSelector } from 'react-redux';
import { appState } from '../app/appSlice';
import {
  Menu,
  Drawer,
  Header
} from '../components';

const Profile = () => {
	const currentAppState = useSelector(appState);
  const { photoUrl, email, displayName } = currentAppState;

  const renderProfileStyle = () => {
    return {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: 'contain'
    };
  }

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full sm:h-auto">
          <Header />
		      <h2 className="text-2xl text-white text-left leading-snug mb-8">
		      	1. Set up your profile
		      </h2>
          <div className="relative w-32 mb-10 ml-auto mr-auto">
            <div className="rounded-full w-32 h-32 bg-[#40435a] border border-[#707070]" style={renderProfileStyle()}></div>
            <span className="bottom-0 right-0 absolute text-lg text-white text-center w-8 h-8 bg-[#f87341] rounded-full">
              <div className="flex items-center justify-center w-8 h-8">
                <span>+</span>
					  	</div>
            </span>
          </div>
		      <div className="text-center">
            <div className="mb-5">
              <input type="text" defaultValue={displayName} className="bg-transparent text-white text-lg block w-fit p-2.5 border-b !outline-none" placeholder="Full Name" required />
            </div>
            <div className="mb-20">
              <input type="text" defaultValue={email} className="bg-transparent text-white text-lg block w-fit p-2.5 border-b !outline-none" placeholder="Email Address" required />
            </div>
			    	<button className="rounded-full mb-10 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
			    		save
			    	</button>
            <div>
              <a href="/" className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10 mb-20">
                Subscriptions
              </a>
            </div>
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Profile;