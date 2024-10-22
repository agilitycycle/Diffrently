import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

// https://www.creative-tim.com/twcomponents/component/group-list

const Parachute = () => {
  const navigate = useNavigate();

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="h-full w-full max-w-[900px]">
          <Header />
          <div className="min-w-80 pb-7 text-white font-sm">
            <div className="mt-9">
              <div className="flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row max-w-6xl sm:rounded-2xl">
                <div className="flex-1 px-2 sm:px-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-extralight text-white/50">Dropzone</h3>
                  </div>
                  <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="group border border-gray-700 bg-transparent py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md">
                      <a href={null} onClick={() => navigate('/create-dropzone')} className="bg-gray-700/30 text-white/50 flex w-20 h-20 rounded-full items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </a>
                      <a href={null} onClick={() => navigate('/create-dropzone')} className="text-white/50 text-center">Create dropzone</a>
                    </div>
                    <div className="relative group border border-gray-700 bg-transparent py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md">
                      <img className="w-20 h-20 object-cover object-center rounded-full" src="https://picsum.photos/id/18/300/200" />
                      <h4 className="text-white text-2xl font-bold capitalize text-center">MBSG Prayers</h4>
                      <p className="text-white/50">5 members</p>
                      <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">2 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                    </div>
                    <div className="relative group border border-gray-700 bg-transparent py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md">
                      <img className="w-20 h-20 object-cover object-center rounded-full" src="https://picsum.photos/id/18/300/200" />
                      <h4 className="text-white text-2xl font-bold capitalize text-center">MBSG News</h4>
                      <p className="text-white/50">4 members</p>
                      <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">1 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                    </div>
                    <div className="relative group border border-gray-700 bg-transparent py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md">
                      <img className="w-20 h-20 object-cover object-center rounded-full" src="https://picsum.photos/id/18/300/200" />
                      <h4 className="text-white text-2xl font-bold capitalize text-center">Prayers</h4>
                      <p className="text-white/50">5 members</p>
                      <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">2 Online <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Parachute;