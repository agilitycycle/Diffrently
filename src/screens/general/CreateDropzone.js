import React from 'react';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const CreateDropzone = () => {

	return (<>
		<div className="flex flex-col p-5 h-screen bg-[#000423]">
			<Drawer />
      <Header />
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full max-w-[500px] sm:w-8/12">
          <div className="w-10/12 text-center">
            <div>
              <input value="" onChange={() => {}} maxlength="25" className="block py-2.5 pr-2.5 mb-1.5 w-full text-lg text-white bg-transparent !outline-none" placeholder="Dropzone (25)"/>
              <input value="" onChange={() => {}} maxlength="25" className="block py-2.5 pr-2.5 mb-5 w-full text-base text-white bg-transparent !outline-none" placeholder="A representation image of..."/>
            </div>
            <div className="relative w-fit flex items-center mb-9 border border-[#A9AAC5]/40 rounded-lg px-12 py-5 sm:px-20">
              <img className="w-20 h-20 object-cover object-center rounded-full" src="https://picsum.photos/id/18/300/200" />
              <div className="flex justify-center">
                <button type="button" onClick={() => {}} className="h-[25px] bg-gray-700/30 text-white/50 focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-sm ml-5 px-3 focus:outline-none dark:focus:ring-blue-800">
                  Generate
                </button>
              </div>
            </div>
            <button onClick={() => {}} className="block rounded text-base uppercase w-24 h-9 bg-[#f87341] text-[#ffffff] justify-center">
              Create
            </button>
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default CreateDropzone;