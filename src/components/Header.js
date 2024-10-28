import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from './';

const appName = 'Diffrently.';

/**
 * 
 * @diffrently
 * 
 */

const Header = (props) => {
  const { className, invisible = false, useLink = '/dashboard' } = props;
  const headerClss = className || `${invisible ? 'block sm:hidden' : 'block'} w-full block leading-none text-4xl text-white font-light mb-9 mt-[-8px]`;

  return (
    <div className="flex">
			<Menu />
      <div className="grow">
        <h1 className={headerClss}>
          <Link to={useLink} className="flex items-center w-[220px] text-white">
            {appName}
            {useLink !== '/' && (
              <span className="ml-2.5 mt-[-18px] bg-blue-100 text-blue-800 text-xs font-medium me-2 px-[7px] py-[1px] rounded-full dark:bg-blue-900 dark:text-blue-300">
                Dash
              </span>
            )}
          </Link>
        </h1>
      </div>
      <div className="w-[34px] ml-4">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun-bright" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="text-amber-400 w-5 h-5">
          <path fill="currentColor" d="M256 0c-13.3 0-24 10.7-24 24l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24zm0 400c-13.3 0-24 10.7-24 24l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24zM488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0zM112 256c0-13.3-10.7-24-24-24l-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0c13.3 0 24-10.7 24-24zM437 108.9c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-45.3 45.3c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L437 108.9zM154.2 357.8c-9.4-9.4-24.6-9.4-33.9 0L75 403.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l45.3-45.3c9.4-9.4 9.4-24.6 0-33.9zM403.1 437c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-45.3-45.3c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L403.1 437zM154.2 154.2c9.4-9.4 9.4-24.6 0-33.9L108.9 75c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l45.3 45.3c9.4 9.4 24.6 9.4 33.9 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Header;