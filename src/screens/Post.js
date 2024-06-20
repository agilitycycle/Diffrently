import React from 'react';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';

const Post = () => {
	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="w-[500px] h-full sm:h-auto">
          <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-2">
		      	Your feed
		      </h3>
		      <h1 className="text-5xl text-white text-left font-semibold mb-8">
		      	Flipbio
		      </h1>
		      <div>
            <textarea rows="6" className="resize-none block py-2.5 pr-2.5 mb-20 w-full text-lg text-lg text-white bg-transparent !outline-none" placeholder="Write something..."></textarea>
          </div>
          <div className="text-center">
			    	<button className="rounded-full mb-10 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
			    		save
			    	</button>
            <h2 className="text-lg text-white leading-snug">
		      	  Tags and images wil be auto-generated.
		        </h2>
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Post;