import React from 'react';
import {
  Page,
  DrawerHome,
  Header
} from '../../components';

const Pricing = () => {

	return (<>
		<Page>
      <DrawerHome/>
      <Header useLink="/" />
      <div className="flex items-center justify-center h-full">
        <div className="h-full w-full sm:w-7/12">
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
              Purchase a one-time commercial licence or use the free <a href="https://github.com/agilitycycle/Diffrently" target="_blank" className="underline">Open Source</a> option.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Diffrently offers two kinds of licenses; <a href="https://github.com/agilitycycle/Diffrently" target="_blank" className="underline">Open Source</a> and free minus the backend code and the other is a commercial license in which all code is available.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Note: If new feats become available after purchase of a commercial license, you can opt to pay for the new code.
            </p>  
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Learning organisations such as schools can benefit from a reduced cost while introducing the benefits of AI in the classroom.
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </Page>
  </>);
};

export default Pricing;