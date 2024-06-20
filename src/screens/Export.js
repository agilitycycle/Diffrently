import React from 'react';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';

const Export = () => {
	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="min-w-80 h-full sm:h-auto">
          <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-2">
		      	Export
		      </h3>
		      <h1 className="text-5xl text-white text-left font-semibold mb-10">
		      	Flipbio
		      </h1>
          <h2 className="text-2xl text-white text-left leading-snug mb-10">
		      	Export your data to:
		      </h2>
          <div>
            <div className="flex flex-row text-white mb-5">
              <div className="flex-1 text-left text-[#ffffff]">
                <div>
                  <p className="text-lg font-bold">Word doc</p>
                  <p className="text-sm text-[#A9AAC5]">Perfect for print media</p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">Export</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="flex flex-row text-white mb-5">
              <div className="flex-1 text-left text-[#ffffff]">
                <div>
                  <p className="text-lg font-bold">PDF</p>
                  <p className="text-sm text-[#A9AAC5]">Perfect for emails</p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">Export</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="flex flex-row text-white">
              <div className="flex-1 text-left text-[#ffffff]">
                <div>
                  <p className="text-lg font-bold">JSON</p>
                  <p className="text-sm text-[#A9AAC5]">Perfect for apps</p>
                  <p className="text-sm text-[#A9AAC5] opacity-60">Export</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a]">
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Export;