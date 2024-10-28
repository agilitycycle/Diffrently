import React from 'react';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const PostEdit = () => {

	return (<>
		<div className="flex flex-col p-5 h-screen bg-[#000423]">
			<Drawer />
      <Header />
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full max-w-[500px] sm:w-8/12">
          <div className="min-w-80 pb-7 text-white font-sm">
            Post edit
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default PostEdit;