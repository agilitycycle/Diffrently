import React from 'react';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';

const Topic = () => {
	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full sm:h-auto">
		      <h1 className="text-5xl text-white text-left font-semibold mb-8">
		      	Flipbio
		      </h1>
		      <h2 className="text-2xl text-white text-left leading-snug mb-2">
		      	2. Set up your topics
		      </h2>
			    <h3 className="text-lg text-[#A9AAC5] text-left leading-snug mb-8">
		      	For auto-tagging
		      </h3>
		      <div>
            <ol className="mb-20 max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
              <li>
                <input type="text" className="bg-transparent text-white text-lg block inline w-fit mb-5 mr-3 p-2.5 border-b !outline-none" placeholder="Topic" required />
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">x</button>
              </li>
              <li>
                <input type="text" className="bg-transparent text-white text-lg block inline w-fit mb-5 mr-3 p-2.5 border-b !outline-none" placeholder="Topic" required />
                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">x</button>
              </li>
              <li>
                <input type="text" className="bg-transparent text-white text-lg block inline w-fit mb-5 mr-3 p-2.5 border-b !outline-none" placeholder="Topic" required />
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
              </li>
            </ol>
          </div>
          <div className="text-center">
			    	<button className="rounded-full mb-20 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
			    		go
			    	</button>
		      </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Topic;