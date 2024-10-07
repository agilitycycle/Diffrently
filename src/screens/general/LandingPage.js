import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Header } from '../../components';
import FlipBioProfileImage from '../../assets/fb-profile-1000.png';
import helloWordVideo from '../../assets/hello-world.mp4';
import OpenAi from '../../assets/openai.png';
import SundarCeo from '../../assets/sundar-ceo.png';
import Suggestion from '../../assets/suggestion.png';
import MobileFirst from '../../assets/mobile-first.png';
import GalileoGalileiImage from '../../assets/galileo-galilei.png';
import IsaacNewtonImage from '../../assets/isaac-newton.png';
import JohnDaltonImage from '../../assets/john-dalton.png';

const LandingPage = () => {
	const navigate = useNavigate();

	return (<>
		<div className="flex flex-col px-5 bg-[#000423]">
		  <div className="flex items-center justify-center">
		    <div>

		    </div>
		  </div>
	  </div>
    <div className="flex flex-col px-5 bg-[#000423]">
      <div className="flex items-center justify-center h-full">
        <div className="h-full w-full sm:w-7/12">
          <Header useLink={false} />
		      <h2 className="text-6xl text-white text-left leading-snug w-full md:w-3/4 mb-8">
		      	Start auto-tagging your content today.
		      </h2>
          <div className="text-[#fff]">
            <p className="text-6xl pt-2 mb-4 md:mb-6 text-center font-sans font-thin">
              Hi,
            </p>
            <p className="text-3xl mb-10 text-center font-sans font-extralight">
              my name is James (<a href="https://www.agilitycycle.com" target="_blank">@agilitycycle</a>).
            </p>
            <div style={{
              backgroundImage: `url(${FlipBioProfileImage})`,
              backgroundSize: '102%',
              backgroundPosition: 'center'
              }} className="w-80 h-80 mx-auto mb-10 rounded-full">
            </div>
            <h3 className="text-2xl text-white text-center leading-snug mb-10">
              Re-imagining tags.
            </h3>
            <div className="text-center">
              <p className="text-lg text-white mb-4 ml-auto mr-auto">
                Start Free Trial
              </p>
              <button onClick={() => navigate('/signin')} className="rounded-full mb-20 ml-auto mr-auto text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff] justify-center">
                sign in
              </button>
            </div>
            <div className="w-9/12 sm:max-w-lg mx-auto mb-16">
              <div className="flex flex-row text-white mb-5">
                <div>
                  <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a] border border-[#707070]"
                    style={{
                      backgroundImage: `url(${FlipBioProfileImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: '0.5'
                    }}>
                    &nbsp;
                  </div>
                </div>
                <div className="flex-1 text-left text-[#555774]">
                  <div className="ml-5">
                    <p className="text-lg font-bold">Galileo Galilei</p>
                    <p className="text-sm">Your tag description</p>
                    <p className="text-sm">1 day ago</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a] border border-[#707070]"
                    style={{
                      backgroundImage: `url(${GalileoGalileiImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: '0.5'
                    }}
                  >
                    &nbsp;
                  </div>
                </div>
              </div>
              <div className="flex flex-row text-white opacity-50 mb-5">
                <div>
                  <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a] border border-[#707070]"
                    style={{
                      backgroundImage: `url(${FlipBioProfileImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: '0.5'
                    }}>
                    &nbsp;
                  </div>
                </div>
                <div className="flex-1 text-left text-[#555774]">
                  <div className="ml-5">
                    <p className="text-lg font-bold">Isaac Newton</p>
                    <p className="text-sm">Your tag description</p>
                    <p className="text-sm">1 day ago</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a] border border-[#707070]"
                    style={{
                      backgroundImage: `url(${IsaacNewtonImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: '0.5'
                    }}>
                    &nbsp;
                  </div>
                </div>
              </div>
              <div className="flex flex-row text-white opacity-20">
                <div>
                  <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#40435a] border border-[#707070]"
                    style={{
                      backgroundImage: `url(${FlipBioProfileImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: '0.5'
                    }}>
                    &nbsp;
                  </div>
                </div>
                <div className="flex-1 text-left text-[#555774]">
                  <div className="ml-5">
                    <p className="text-lg font-bold">John Dalton</p>
                    <p className="text-sm">Your tag description</p>
                    <p className="text-sm">1 day ago</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center rounded-md ml-auto w-12 h-12 bg-[#40435a] border border-[#707070]"
                    style={{
                      backgroundImage: `url(${JohnDaltonImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: '0.5'
                    }}>
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
            <p className="text-4xl sm:text-5xl mb-10 text-center font-sans font-thin">
              I am developing a Personal Auto-Tag Assistant app online, and will be available to those who sign up and subscribe to a monthly subscription.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              The good news, is if you back me, you will be the first to help us in generating the first bundle of Auto-Generated tags.
            </p>
            <p className="text-3xl mb-10 text-center font-sans font-bold">
              Tagging examples:
            </p>
            <ol className="text-4xl mb-10 text-center font-sans font-thin leading-normal list-decimal list-inside">
              <li>Instagram</li>
              <li>LivingForJesus</li>
              <li>Speaking</li>
            </ol>
            <p className="text-xl mb-10 text-center font-sans font-thin leading-relaxed">
              With each new tag generated, it will help us to learn more about the potential of AI. Your tags and profile will be celebrated under a special URL called, <span className="font-medium">"Founders"</span>
            </p>
            <p className="text-2xl mb-10 text-center font-sans font-light leading-relaxed">
              Think of the possibilities...
            </p>
            <p className="text-xl mb-10 text-center font-sans font-thin leading-relaxed">
              Writers write and, bloggers blog while leaving the self organising part to Flipbio's Personal Auto-Tag Assistant online.
            </p>
          </div>
          <div className="flex items-center justify-center mb-16">
            <ReactPlayer className="react-player" url={helloWordVideo} playing muted loop />
          </div>
          <div className="text-[#fff] mt-4">
            <p className="text-5xl mb-10 text-center font-sans font-extralight">
              Background story...
            </p>
            <img src={MobileFirst} className="border border-zinc-400 mb-10" />
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              I like to write but not everyone wants to spend time organising their content. Imagine having a Personal Assistant who knows exactly what you want.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              And so I began to dabble with OpenAI and realised the potential of services like ChatGPT and how effective it could be.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              And so I created Flipbio, SaaS Platform, AI Auto-Tagging service.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              Its also Open Source (MIT License).
            </p>
            <img src={Suggestion} className="mx-auto border border-zinc-400 mb-10" />
            <p className="text-5xl mb-10 text-center font-sans font-extralight">
              Why?
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              I think Auto-Tagging offers a new way of delivering content other than the usual social networking platforms. It's simple, fresh, and innovative.
            </p>
            <ol className="text-4xl mb-10 text-center font-sans font-thin leading-normal list-decimal list-inside">
              <li>You write</li>
              <li>It organises</li>
              <li>You save time!!</li>
            </ol>
            <p className="text-xl mb-10 text-center font-sans font-thin leading-relaxed">
              It also gave me an opportunity to investigate AI (Artificial Intelligence).
            </p>
            <img src={SundarCeo} className="mb-10" />
            <p className="text-3xl mb-10 text-center font-sans font-bold">
              Plan and Schedule
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              The first stage of this project is to finish and launch the AI Auto-Tagging service which is approximately 40% through in progress at the moment. Backers will be given the opportunity to help populate the Auto-Tagging ecosystem with tens to hundreds of tags.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              BTW: Any generated tags will need to be child friendly as it is in the public domain. Any tags which are unfriendly will be flagged down immediately, regardless you are a backer or not.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              Once launched, Flipbio will cost, as Auto-Tagging isn't free, there will be a paid subscription option for those who want to be part of this new hemisphere.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              It might even be a great platform to show kids what AI can do (future generations).
            </p>
            <p className="text-6xl mb-10 text-center font-sans font-extralight leading-relaxed">
              "AI is a tool. The choice about how it gets deployed is ours."
            </p>
            <p className="text-5xl mb-10 text-center font-sans font-extralight">
              Development stages
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              This development stage only includes the generation of new tags not AI training. AI training will need to be part of stages 2 & 3 (requires further testing)
            </p>
            <p className="text-5xl mb-10 text-center font-sans font-extralight">
              AI specifications
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              I will be using OpenAI, and chat model, gpt-3.5-turbo.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              The AI responses are then saved to Firebase, however, the user still retains control over all of their content, whether it stays published or not.
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              All content in the public domain can be set to private again. All content can be deleted forever if the user wishes to do so.
            </p>
            <img src={OpenAi} className="mb-10 border border-zinc-400 mb-10" />
            <p className="text-3xl mb-10 text-center font-sans font-bold">
              Tag examples
            </p>
            <ol className="text-4xl mb-10 text-center font-sans font-thin leading-normal list-decimal list-inside">
              <li>MiyamotoMusashi</li>
              <li>KingJamesBible</li>
              <li>Christianity</li>
              <li>Wedding</li>
              <li>Esther</li>
            </ol>
            <p className="text-5xl mb-10 text-center font-sans font-extralight">
              Product Roadmap
            </p>
            <p className="text-xl mb-10 text-center font-sans font-light leading-relaxed">
              <span className="font-medium">File:</span> <a href="https://drive.google.com/file/d/1a5u6YrbkwpQSxyfo8GFuOQeT_j-EzWoos" target="_blank" className="break-all">https://drive.google.com/file/d/1a5u6YrbkwpQSxyfo8GFuOQeT_j-EzWoos</a>
            </p>
            <p className="text-5xl mb-10 text-center font-sans font-extralight">
              Open Source
            </p>
            <p className="text-xl mb-10 text-center font-sans font-light leading-relaxed">
              <span className="font-medium">Source:</span> <a href="https://github.com/jamesstar89/flipbio-app" target="_blank">https://github.com/jamesstar89/flipbio-app</a>
            </p>
            <p className="text-5xl mb-10 text-center font-sans font-extralight">
              Sign up
            </p>
            <p className="text-xl mb-10 text-center font-sans font-extralight leading-relaxed">
              If you would like to sign up, the best way is to back my project, and help me reach 6K. If you become a backer then I will send you regular updates as well as an appointed time for when you can sign in.
            </p>
            <p className="text-xl mb-16 text-center font-sans font-thin leading-relaxed">
              Think of all the "tags" you could save!!
            </p>
            <p className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Create unlimited Tags.
            </p>
            <p className="mb-16 text-4xl font-extrabold tracking-tight leading-none text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Flipbio. 6K.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default LandingPage;