import React from 'react';
import { Header, CardMini } from '../../components';

const LandingPage = () => {

  const getTags = () => {
    const tagEl = [
      'Asheville', 'CBSNews', 'Carolinas', 'Casualties',
      'Catastrophe', 'ClimateChange', 'EffecDeaths', 'ExtremeWeatherEvent',
      'Flood', 'HumanitarianCrisis', 'HurricaneHelene', 'MeganDrye',
      'Micah', 'NaturalCalamity', 'NaturalDisaster', 'NorthCarolina',
      'Rescue', 'StormDamage', 'Tragedy'
    ];
    return tagEl.map((tag, index) => {
      return <button key={`tag${index}`} className="mb-2">
        <span key={tag} className="opacity-40 border border-[#A9AAC5] text-[#A9AAC5] bg-transparent text-sm font-medium me-3 px-2.5 py-1.5 rounded">
          {tag}
        </span>
      </button>
    })
  }

  const renderMiniCard = () => {
    const props = {
      item: {
        primaryTag: 'HurricaneHelene'
      }
    }
    return (<CardMini {...props} />)
  }

  const renderSocialMediaIcons = () => {
    return(<div className="flex items-center justify-center">
      <svg className="opacity-25 w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
      </svg>
      <svg className="opacity-25 w-[42px] h-[42px] mr-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
      </svg>
      <svg className="opacity-25 w-[42px] h-[42px] mr-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd"/>
      </svg>
      <svg className="opacity-25 w-[38px] h-[38px] mr-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
      </svg>
      <svg className="opacity-25 w-[46px] h-[46px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
        <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
      </svg>
    </div>)
  }

	return (<>
    <div className="flex flex-col px-5 bg-[#000423]">
      <div className="flex items-center justify-center h-full">
        <div className="h-full w-full sm:w-7/12">
          <Header className="inline-block text-6xl text-white text-left font-light mt-8 mb-10" useLink />
          <div className="flex flex-col md:flex-row justify-between mb-16 text-4xl text-white font-sans font-thin">
            <div className="flex items-center justify-center mb-10">
              Write something...
            </div>
            <div>
              {renderMiniCard()}
            </div>
          </div>
          <div className="flex flex-col text-center mb-10 text-4xl text-white font-sans font-thin">
            <div className="mb-10">
              Generate image
            </div>
            <div>
              <img className="w-11/12 m-auto" src="https://firebasestorage.googleapis.com/v0/b/flipbio-1712c.appspot.com/o/images%2F-NrnSwk-t38iZWOB76Lt%2Fimage1728438644559.jpg?alt=media" />
            </div>
          </div>
          <div className="flex flex-col mb-16 text-3xl text-white font-sans font-thin">
            <div className="text-center mb-5">
              Generate tags
            </div>
            <div className="text-center">
              {getTags()}
            </div>
          </div>
          <div className="pt-8 pb-7 px-12 pe-12 mb-16 text-blue-800 border border-blue-300 rounded-lg bg-transparent dark:text-blue-400 dark:border-blue-800" role="alert">
            <h3 className="text-3xl font-light text-center mb-6">Donate - Samaritan's Purse</h3>
            <div className="mt-2 mb-12 text-2xl text-center font-thin leading-relaxed">
              Samaritan's Purse is responding to both Hurricane Helene and Hurricane Milton, with multiple disaster relief bases in North Carolina and Florida.
            </div>
            <div className="flex justify-center mb-2">
              <a href="https://www.samaritanspurse.org/disaster/hurricane-helene" target="_blank" className="text-white text-1xl bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg px-3 py-1.5 w-full sm:w-2/12 me-2 inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Give
              </a>
            </div>
          </div>
          <div className="flex flex-col mb-16 text-3xl text-white font-sans font-thin">
            <div className="mb-5 leading-relaxed text-center">
              Export your content to popular social network platforms
            </div>
            <div>
              {renderSocialMediaIcons()}
            </div>
          </div>
          <div className="mb-10 text-center text-1xl text-white font-sans font-thin leading-relaxed">
            Want to use Flipbio commercially, PM james@agilitycycle.com to purchase a one-time commercial license.
          </div>
          <div className="mb-16 text-center text-1xl text-white font-sans font-thin leading-relaxed">
            Flipbio is 99.99% of the time in sync with the cloud database.
          </div>
          <div className="mb-10 text-center text-3xl text-white font-sans font-thin">
            Subscriptions
          </div>
          <div>
            {/* Subscription 1 */}
            <div className="flex flex-col sm:flex-row gap-x-4 justify-center mb-4">
              <div className="flex flex-col items-start justify-between mx-auto w-11/12 lg:w-7/12 gap-6 overflow-hidden rounded-2xl mb-5 border p-6 border-[#707070] bg-transparent">
                <div className="inline-flex flex-col items-start justify-start gap-6">
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-lg text-white font-normal">FREE Trial - $0 (one-time)</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">25 tags / 5 images</p>
                      </div>
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">Publish / export 1-2 post</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button"
                  className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 stroke-white px-6 text-white h-[42px] min-w-[42px] gap-2 w-full disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100">
                  <span>Sign in to add</span>
                </button>
              </div>
            </div>
            {/* Subscription 2 */}
            <div className="flex flex-col sm:flex-row gap-x-4 justify-center mb-4">
              <div className="flex flex-col items-start justify-between mx-auto w-11/12 lg:w-7/12 gap-6 overflow-hidden rounded-2xl mb-5 border p-6 border-[#707070] bg-transparent">
                <div className="inline-flex flex-col items-start justify-start gap-6">
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-lg text-white font-normal">Pay as you go - $5</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">5 generated images</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button"
                  className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 stroke-white px-6 text-white h-[42px] min-w-[42px] gap-2 w-full disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100">
                  <span>Sign in to add</span>
                </button>
              </div>
            </div>
            {/* Subscription 3 */}
            <div className="flex flex-col sm:flex-row gap-x-4 justify-center mb-4">
              <div className="flex flex-col items-start justify-between mx-auto w-11/12 lg:w-7/12 gap-6 overflow-hidden rounded-2xl mb-5 border p-6 border-[#707070] bg-transparent">
                <div className="inline-flex flex-col items-start justify-start gap-6">
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-lg text-white font-normal">Pay as you go - $25</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">25 tags / 25 images</p>
                      </div>
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">Publish / export 4-5 post</p>
                      </div>
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">Functions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button"
                  className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 stroke-white px-6 text-white h-[42px] min-w-[42px] gap-2 w-full disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100">
                  <span>Sign in to add</span>
                </button>
              </div>
            </div>
            {/* Subscription 4 */}
            <div className="flex flex-col sm:flex-row gap-x-4 justify-center mb-4">
              <div className="flex flex-col items-start justify-between mx-auto w-11/12 lg:w-7/12 gap-6 overflow-hidden rounded-2xl mb-5 border p-6 border-[#707070] bg-transparent">
                <div className="inline-flex flex-col items-start justify-start gap-6">
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-lg text-white font-normal">Pay as you go - $125</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">500 tags / 100 images</p>
                      </div>
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">Publish / export 15-25 post</p>
                      </div>
                      <div className="inline-flex items-center justify-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white">
                          <path
                            d="M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883">
                          </path>
                        </svg>
                        <p className="text-base text-[#A9AAC5]">Functions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button"
                  className="group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 stroke-white px-6 text-white h-[42px] min-w-[42px] gap-2 w-full disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100">
                  <span>Sign in to add</span>
                </button>
              </div>
            </div>
          </div>
          <div className="text-[#A9AAC5] text-sm text-center mb-10 font-sans font-thin">
            © Copyright Flipbio. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default LandingPage;