import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import FlipBioProfileImage from '../assets/fb-profile-1000.png';

const LandingPage = () => {
	const navigate = useNavigate();

	return (<>
		<div className="flex flex-col pt-7 px-5 h-screen bg-[#000423]">
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full">
          <Header useLink={false} />
		      <h2 className="text-6xl text-white text-left leading-snug w-full md:w-3/4 mb-8">
		      	Start auto-tagging your content today.
		      </h2>
		      <div className="text-center">
			      <p className="text-lg text-white mb-4 ml-auto mr-auto">
			      	7 day free trial
			      </p>
			    	<button onClick={() => navigate('/signin')} className="rounded-full mb-20 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
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
          <h3 className="text-base text-white text-center leading-snug mb-20">
            Re-imagining tags.
          </h3>
          <div className="text-center">
            <a href="/" className="font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline pb-10">
              Terms and conditions
            </a>
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default LandingPage;