import React from 'react';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';
import FlipBioProfileImage from '../assets/fb-profile-1000.png';

const LandingPage = () => {
	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full">
		      <h1 className="text-5xl text-white text-left font-semibold mb-8">
		      	Flipbio
		      </h1>
		      <h2 className="text-6xl text-white text-left leading-snug w-full md:w-3/4 mb-8">
		      	Start auto-tagging your content today.
		      </h2>
		      <div className="text-center">
			      <p className="text-lg text-white mb-4 ml-auto mr-auto">
			      	7 day free trial
			      </p>
			    	<button className="rounded-full mb-20 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
			    		start now
			    	</button>
		      </div>
          <div className="max-w-lg mx-auto mb-16">
            <div className="flex flex-row text-white mb-5">
              <div>
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a] border border-[#707070]">
                  &nbsp;
                </div>
              </div>
              <div className="flex-1 text-left text-[#555774]">
                <div className="ml-5">
                  <p className="text-lg font-bold">Generated tag</p>
                  <p className="text-sm">Your tag description</p>
                  <p className="text-sm">1 day ago</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a] border border-[#707070]">
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="flex flex-row text-white opacity-50 mb-5">
              <div>
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a] border border-[#707070]">
                  &nbsp;
                </div>
              </div>
              <div className="flex-1 text-left text-[#555774]">
                <div className="ml-5">
                  <p className="text-lg font-bold">Generated tag</p>
                  <p className="text-sm">Your tag description</p>
                  <p className="text-sm">1 day ago</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a] border border-[#707070]">
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="flex flex-row text-white opacity-20">
              <div>
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a] border border-[#707070]">
                  &nbsp;
                </div>
              </div>
              <div className="flex-1 text-left text-[#555774]">
                <div className="ml-5">
                  <p className="text-lg font-bold">Generated tag</p>
                  <p className="text-sm">Your tag description</p>
                  <p className="text-sm">1 day ago</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a] border border-[#707070]">
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
          <div style={{
            backgroundImage: `url(${FlipBioProfileImage})`,
            backgroundSize: '102%',
            backgroundPosition: 'center'
            }} className="w-80 h-80 mx-auto mb-10 rounded-full">
          </div>
          <h2 className="text-lg text-white text-center leading-snug mb-3">
            <b>Hello</b>, I'm James - Creator of FlipBio
          </h2>
          <h3 className="text-md text-white text-center leading-snug mb-20">
            Re-imagining tags.
          </h3>
          <div className="text-center">
            <a href="#" className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10">
              Terms and conditions
            </a>
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default LandingPage;