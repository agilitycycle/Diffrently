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
          <div className="min-w-80 pb-7 text-white font-sm">
            Create Dropzone
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default CreateDropzone;