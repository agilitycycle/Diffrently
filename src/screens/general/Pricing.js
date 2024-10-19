import React from 'react';
import {
  Menu,
  DrawerHome,
  Header
} from '../../components';

const Pricing = () => {

	return (<>
		<div className="flex flex-col pl-5 pr-5 h-screen bg-[#000423]">
      <DrawerHome/>
      <Menu/>
      <div className="flex items-center justify-center h-full">
        <div className="h-full w-full sm:w-7/12">
          <Header useLink="/" className="flex items-center leading-none inline-block text-4xl sm:text-5xl text-white text-left font-light mt-5 mb-14" />
          <div>
            <div className="flex flex-col md:flex-row justify-between mt-6 text-4xl text-white font-sans font-thin">
              <div className="flex items-center mb-10">
                Pricing
              </div>
            </div>
            <p className="mb-4 text-2xl text-gray-500 md:text-xl dark:text-gray-400 font-extralight leading-relaxed">
              Diffrently is different than most apps and so is the pricing.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              If you are intending to use our cloud service, than you can try Diffrently for free using our FREE Trial subscription.
              If you find you like using Diffrently, than you can opt for our mo. subscription with booster options.
            </p>
            <div className="flex flex-col mt-9 mb-9 text-3xl text-white font-sans font-thin">
              Subscription
            </div>
            <p className="mb-4 text-2xl text-gray-500 md:text-xl dark:text-gray-400 font-extralight leading-relaxed">
              Subscribe monthy with no fixed terms.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Diffrently offers several subscriptions although at this time there is only one mo. option.
            </p>
            <div className="flex flex-col mt-9 mb-9 text-3xl text-white font-sans font-thin">
              Hosting and set up
            </div>
            <p className="mb-4 text-2xl text-gray-500 md:text-xl dark:text-gray-400 font-extralight leading-relaxed">
              Host your own Diffrently app with our help.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              If you would prefer to host your own Diffrently app than we can help lend a hand with us.
              Contact james@agilitycycle.com
            </p>
            <div className="flex flex-col mt-9 mb-9 text-3xl text-white font-sans font-thin">
              Commercial or Open Source
            </div>
            <p className="mb-4 text-2xl text-gray-500 md:text-xl dark:text-gray-400 font-extralight leading-relaxed">
              Purchase a one-time commercial licence or use the free Open Source option.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Diffrently offers two kinds of licenses; Open Source and free minus backend code and the other is a commercial license in which all code is accessible.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Schools get Diffrently at a reduced cost.
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Pricing;