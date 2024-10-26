import React from 'react';
import { Link } from 'react-router-dom';

const appName = 'Diffrently.';

/**
 * 
 * @diffrently
 * 
 */

const Header = (props) => {
  const { className, useLink = '/dashboard' } = props;
  const headerClss = className || 'inline-block leading-none text-4xl text-white text-left font-light mt-5 mb-9';

  return (
    <div className="relative">
      <h1 className={headerClss}>
        <Link to={useLink} className="flex items-center justify-center text-white">
          {appName}
        </Link>
      </h1>
      {useLink !== '/' && (
        <span className="absolute top-5 ml-2.5 bg-blue-100 text-blue-800 text-xs font-medium me-2 px-[7px] py-[1px] rounded-full dark:bg-blue-900 dark:text-blue-300">
          Dash
        </span>
      )}
    </div>
  );
}

export default Header;