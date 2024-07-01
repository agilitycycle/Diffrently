import React from 'react';
import Menu from '../components/Menu';
import Drawer from '../components/Drawer';

const Pricing = () => {
	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
			<Drawer/>
			<Menu/>
		  <div className="flex items-center justify-center h-full">
		    <div className="min-w-80 h-full sm:h-auto">
		      <h1 className="text-5xl text-white text-left font-semibold mb-8">
		      	Flipbio
		      </h1>
		      <h2 className="text-2xl text-white text-left leading-snug mb-8">
		      	1. Choose your plan
		      </h2>
          {/** First tier */}
          <div className="flex flex-col items-start justify-between gap-12 overflow-hidden rounded-2xl mb-5 border p-6 border-[#707070] bg-transparent">
            <div className="inline-flex flex-col items-start justify-start gap-6">
              <div className="flex flex-col items-start justify-start gap-4">
                <p className="text-lg text-white font-semibold">Free trial</p>
                <p className="inline-flex items-end justify-start gap-2">
                  <span className="text-center text-5xl font-bold text-white">$0</span>
                  <span className="text-md leading-tight text-[#A9AAC5]">/month</span>
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-md leading-tight text-[#A9AAC5]">Test drive our casual plan.</p>
                <div className="flex flex-col items-start justify-start gap-4">
                  <div className="inline-flex items-center justify-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                      <path
                        d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                      </path>
                    </svg>
                    <p className="text-md text-[#A9AAC5]">5 tags</p>
                  </div>
                  <div className="inline-flex items-center justify-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                      <path
                        d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                      </path>
                    </svg>
                    <p className="text-md text-[#A9AAC5]">1-2 articles per day</p>
                  </div>
                </div>
              </div>
            </div>
            <button type="button"
              className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 stroke-white px-6 text-white h-[42px] min-w-[42px] gap-2 w-full disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100">
              <span>Upgrade</span>
            </button>
          </div>
          {/** Second tier */}
          <div className="flex flex-col items-start justify-between gap-12 overflow-hidden rounded-2xl mb-5 border p-6 border-[#707070] bg-transparent">
            <div className="inline-flex flex-col items-start justify-start gap-6">
              <div className="flex flex-col items-start justify-start gap-4">
                <p className="text-lg text-white font-semibold">Casual</p>
                <p className="inline-flex items-end justify-start gap-2">
                  <span className="text-center text-5xl font-bold text-white">$25</span>
                  <span className="text-md leading-tight text-[#A9AAC5]">/month</span>
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-md leading-tight text-[#A9AAC5]">Perfect for the casual writer.</p>
                <div className="flex flex-col items-start justify-start gap-4">
                  <div className="inline-flex items-center justify-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                      <path
                        d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                      </path>
                    </svg>
                    <p className="text-md text-[#A9AAC5]">5 tags</p>
                  </div>
                  <div className="inline-flex items-center justify-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                      <path
                        d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                      </path>
                    </svg>
                    <p className="text-md text-[#A9AAC5]">1-2 articles per day</p>
                  </div>
                </div>
              </div>
            </div>
            <button type="button"
              className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-white px-6 text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 h-[42px] min-w-[42px] gap-2 w-full disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100">
              <span>Upgrade</span>
            </button>
          </div>
          {/** Third tier */}
          <div className="flex flex-col items-start justify-between gap-12 overflow-hidden rounded-2xl border p-6 mb-5 border-[#707070] bg-transparent">
            <div className="inline-flex flex-col items-start justify-start gap-6">
              <div className="flex flex-col items-start justify-start gap-4">
                <p className="text-lg text-white font-semibold">Pro</p>
                <p className="inline-flex items-end justify-start gap-2">
                  <span className="text-center text-5xl font-bold text-white">$99</span>
                  <span className="text-md leading-tight text-[#A9AAC5]">/month</span>
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-md leading-tight text-[#A9AAC5]">Perfect for the pro writer.</p>
                <div className="flex flex-col items-start justify-start gap-4">
                  <div className="inline-flex items-center justify-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                      <path
                        d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                      </path>
                    </svg>
                    <p className="text-md text-[#A9AAC5]">25 tags</p>
                  </div>
                  <div className="inline-flex items-center justify-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                      <path
                        d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                      </path>
                    </svg>
                    <p className="text-md text-[#A9AAC5]">7-10 articles per day</p>
                  </div>
                </div>
              </div>
            </div>
            <button type="button"
              className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-white px-6 text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 h-[42px] min-w-[42px] gap-2 w-full disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100">
              <span>Upgrade</span>
            </button>
          </div>
		    </div>
		  </div>
	  </div>
  </>);
};

export default Pricing;