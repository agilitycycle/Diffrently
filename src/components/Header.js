import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, DarkMode } from './';

const appName = 'Diffrently.';

/**
 * 
 * @diffrently
 * 
 */

const Header = (props) => {
  const { className, invisible = false, useLink = '/dashboard' } = props;
  const headerClss = className || `${invisible ? 'block sm:hidden' : 'block'} w-full block leading-none text-4xl font-light mb-9 mt-[-8px]`;

  return (
    <div className="flex">
			<Menu />
      <div className="grow">
        <h1 className={headerClss}>
          <Link to={useLink} className="flex items-center w-[220px] text-[#000423] dark:text-white">
            {appName}
            {useLink !== '/' && (
              <span className="ml-2.5 mt-[-18px] bg-blue-100 text-blue-800 text-xs font-medium me-2 px-[7px] py-[1px] rounded-full dark:bg-blue-900 dark:text-blue-300">
                Dash
              </span>
            )}
          </Link>
        </h1>
      </div>
      <DarkMode />
    </div>
  );
}

export default Header;