import React from 'react';
import {
  Page,
  DrawerHome,
  Header,
  Flat
} from '../../components';
import GithubImage from '../../assets/github-mark-white.svg';

const LandingPage = () => {

  const getCurateTags = () => {
    const tagEl = [
      'Books', 'Biographies', 'Blurbs', 'Blogs',
      'Stories', 'Writings', 'Geography', 'Mappings',
      'Disasters', 'History', 'Images', 'Post',
      'ExpositorySermonOutlines', 'IndoorExercises', 'Insights', 'Locations',
      'Places', 'Things'
    ];
    return tagEl.map((tag, index) => {
      return <button key={`tag${index}`} className="mb-2">
        <span key={tag} className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm font-medium me-3 px-2.5 py-1.5 rounded">
          {tag}
        </span>
      </button>
    })
  }

  const getTags = () => {
    const tagEl = [
      'Asheville', 'CBSNews', 'Carolinas', 'Casualties',
      'Catastrophe', 'ClimateChangeEffec', 'Deaths', 'ExtremeWeatherEvent',
      'Flood', 'HumanitarianCrisis', 'HurricaneHelene', 'MeganDrye',
      'Micah', 'NaturalCalamity', 'NaturalDisaster', 'NorthCarolina',
      'Rescue', 'StormDamage', 'Tragedy'
    ];
    return tagEl.map((tag, index) => {
      return <button key={`tag${index}`} className="mb-2">
        <span key={tag} className="opacity-40 border border-[#A9AAC5] text-gray-400 bg-transparent text-sm font-medium me-3 px-2.5 py-1.5 rounded">
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
    return (<Flat {...props} />)
  }

  const renderSocialMediaIcons = () => {
    return(<div className="flex items-center justify-center">
      <svg className="opacity-85 w-[40px] h-[40px] text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
      </svg>
      <svg className="opacity-85 w-[42px] h-[42px] mr-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
      </svg>
      <svg className="opacity-85 w-[42px] h-[42px] mr-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd"/>
      </svg>
      <svg className="opacity-85 w-[38px] h-[38px] mr-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
      </svg>
      <svg className="opacity-85 w-[46px] h-[46px] text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
        <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
      </svg>
    </div>)
  }

	return (<>
    <Page>
      <DrawerHome />
      <Header useLink="/" invisible />
      <div className="flex items-center justify-center h-full">
        <div className="h-full w-full sm:w-7/12">
          <div className="hidden sm:flex items-center justify-center h-96 text-white text-9xl mb-24 font-extralight">
            Diffrently.
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-6 mb-16 text-4xl text-white font-sans font-thin">
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
              <img className="w-11/12 m-auto" referrerpolicy="no-referrer" src="https://lh3.googleusercontent.com/d/18UOi66-7Gb9Jkl6kmsi3i1bOVmoSr-cH" />
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
            <h3 className="text-3xl font-thin text-center mb-6">Donate - Samaritan's Purse</h3>
            <div className="mt-2 mb-12 text-2xl text-center font-thin leading-relaxed">
              Samaritan's Purse is responding to both Hurricane Helene and Hurricane Milton, with multiple disaster relief bases in North Carolina and Florida.
            </div>
            <div className="flex justify-center mb-2">
              <a href="https://www.samaritanspurse.org/disaster/hurricane-helene" target="_blank" className="text-white text-base bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg py-1.5 px-14 sm:px-16 me-2 inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Give
              </a>
            </div>
          </div>
          <div className="mb-14">
            <iframe className="border border-[#A9AAC5]/40 rounded-xl mx-auto w-full sm:w-5/5 h-[285px] md:h-[425px] xl:h-[700px]" src="https://www.youtube.com/embed/9M0fPsfTJwU?si=LWouqko0vKpb0gjD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="flex flex-col mb-14 text-3xl text-white font-sans font-thin">
            <div className="mb-5 leading-relaxed text-center">
              What can I curate with Diffrently?
            </div>
            <div className="text-center">
              {getCurateTags()}
            </div>
          </div>
          <div className="flex flex-col mb-16 text-3xl text-white font-sans font-thin">
            <div className="mb-5 leading-relaxed text-center">
              Share to popular Social Media platforms
            </div>
            <div>
              {renderSocialMediaIcons()}
            </div>
          </div>
          <div>
            <a href="https://github.com/agilitycycle/Diffrently" target="_blank">
              <img className="mx-auto mb-16 w-[85px]" src={GithubImage} />
            </a>
          </div>
          <div className="mb-10 text-center text-base text-gray-400 font-sans font-extralight leading-relaxed">
            Want to use Diffrently. commercially, PM james@agilitycycle.com to purchase a one-time commercial license.
          </div>
          <div className="mb-16 text-center text-base text-gray-400 font-sans font-extralight leading-relaxed">
            Diffrently. is 99.99% of the time in sync with the cloud database.
          </div>
          <div className="mb-10 text-center text-3xl text-white font-sans font-thin">
            Pricing
          </div>
          <div className="mb-18 lg:mb-20">
            <div className="text-center text-white text-7xl font-extralight mb-11">
              FREE or $25/MO*
            </div>
            <div className="text-gray-400 text-base text-center mt-10 mb-10 pb-10 font-sans font-extralight">
              * All benefits incl. AI features.
            </div>
          </div>
          <div className="text-gray-400 text-sm text-center mb-10 pb-10 font-sans font-extralight">
            © Copyright Diffrently. All rights reserved.
          </div>
        </div>
      </div>
    </Page>
  </>);
};

export default LandingPage;