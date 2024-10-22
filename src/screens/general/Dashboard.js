import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Drawer,
  Header
} from '../../components';

const Dashboard = () => {
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
                    <h3 className="text-3xl font-extralight text-white/50">Dashboard</h3>
                  </div>
                  <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div onClick={() => navigate('/timeline')} className="relative group border border-gray-700 bg-transparent py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md">
                      <img className="w-20 h-20 object-cover object-center rounded-full" src="https://firebasestorage.googleapis.com/v0/b/flipbio-1712c.appspot.com/o/images%2F-NrnSwk-t38iZWOB76Lt%2Fimage1729578936096.jpg?alt=media" />
                      <h4 className="text-white text-2xl font-bold capitalize text-center">Timeline</h4>
                      <p className="text-white/50">5000 post</p>
                    </div>
                    <div onClick={() => navigate('/parachute')} className="relative group border border-gray-700 bg-transparent py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md">
                      <img className="w-20 h-20 object-cover object-center rounded-full" src="https://firebasestorage.googleapis.com/v0/b/flipbio-1712c.appspot.com/o/images%2F-NrnSwk-t38iZWOB76Lt%2Fimage1729578827807.jpg?alt=media" />
                      <h4 className="text-white text-2xl font-bold capitalize text-center">Parachute</h4>
                      <p className="text-white/50">4 dropzones</p>
                    </div>
                    <div onClick={() => navigate('/fizztime')} className="relative group border border-gray-700 bg-transparent py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md">
                      <img className="w-20 h-20 object-cover object-center rounded-full" src="https://firebasestorage.googleapis.com/v0/b/flipbio-1712c.appspot.com/o/images%2F-NrnSwk-t38iZWOB76Lt%2Fimage1729580431074.jpg?alt=media" />
                      <h4 className="text-white text-2xl font-bold capitalize text-center">Fizz time</h4>
                      <p className="text-white/50">4 post</p>
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

export default Dashboard;