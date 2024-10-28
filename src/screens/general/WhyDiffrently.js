import React from 'react';
import {
  Menu,
  DrawerHome,
  Header
} from '../../components';

const WhyDiffrently = () => {

	return (<>
		<div className="flex flex-col p-5 h-screen bg-[#000423]">
      <DrawerHome />
      <Header useLink="/" />
      <div className="flex items-center justify-center h-full">
        <div className="h-full w-full sm:w-7/12">
          <div>
            <div className="flex flex-col md:flex-row justify-between mt-6 text-4xl text-white font-sans font-thin">
              <div className="flex items-center mb-10">
                Why Diffrently?
              </div>
            </div>
            <p className="mb-4 text-2xl text-gray-500 md:text-xl dark:text-gray-400 font-extralight leading-relaxed">
              Diffrently is a co-partnership between you and AI in curating NEW content.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              The idea is that you write or copy and paste in content from something you like and by prompting our chat AI you can enhance your content with a generated image and tags.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Once your content is published, you can choose to export to any of the popular social networks.
            </p>
            <div className="flex flex-col mt-9 mb-9 text-3xl text-white font-sans font-thin">
              Parachute
            </div>
            <p className="mb-4 text-2xl text-gray-500 md:text-xl dark:text-gray-400 font-extralight leading-relaxed">
              Parachute content to a signed in user or a group of signed in individuals.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              With Parachute you can make content accessible to pre-existing users of your choosing. Your content will show in the form of a newsfeed.
            </p>
            <div className="flex flex-col mt-9 mb-9 text-3xl text-white font-sans font-thin">
              Fizz time
            </div>
            <p className="mb-4 text-2xl text-gray-500 md:text-xl dark:text-gray-400 font-extralight leading-relaxed">
              Fizz time is the ultimate share to everyone who is signed in.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Once signed in you can choose to subscribe to tags in Fizz time. Each tag becomes its own newsfeed with content ranked from highest to lowest.
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default WhyDiffrently;