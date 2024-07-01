import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';

const Publish = () => {
	const navigate = useNavigate();

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
          <div className="text-center">
            <h2 className="block text-[#707070] border border-slate-700 rounded-lg p-10 text-xl text-white leading-snug mb-10">
		      	  Your post was published. Would you like to publish another?
		        </h2>
            <button onClick={() => {
              navigate('/post');
            }} className="rounded-full mb-10 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
			    		post again
			    	</button>
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Publish;