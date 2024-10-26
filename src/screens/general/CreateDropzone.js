import React from 'react';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const CreateDropzone = () => {

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full max-w-[500px] sm:w-8/12">
          <Header />
          <div className="w-10/12 text-center">
            <div>
              <input value="" onChange={() => {}} maxlength="25" className="block py-2.5 pr-2.5 mb-5 w-full text-lg text-lg text-white bg-transparent !outline-none" placeholder="Dropzone (25)"/>
            </div>
            <div className="flex mb-10">
              <div className="text-white mr-10">
                Picture
              </div>
              <div>
                <button type="button" onClick={() => {}} className="h-[32px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 pt-.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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