import React from 'react';
import { Link } from 'react-router-dom';

const appName = 'Diffrently.';

/**
 * 
 * @diffrently
 * 
 */

const Header = (props) => {
  const { className, useLink = false } = props;
  const headerClss = className || 'inline-block leading-none text-4xl sm:text-6xl text-white text-left font-light my-9';

  // use sign in
  if (useLink) {
    return (
      <div className="flex items-center justify-between w-full">
        <h1 className={headerClss}>
          {appName}
        </h1>
        <div className="text-white text-2xl font-sans font-thin">
          Sign in
        </div>
      </div>
    );
  }

  return (
    <h1 className={headerClss}>
      <Link to="/timeline" className="flex items-center justify-center text-white">
        {appName}
      </Link>
    </h1>);
}

export default Header;