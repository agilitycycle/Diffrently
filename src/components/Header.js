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
    <h1 className={headerClss}>
      <Link to={useLink} className="flex items-center justify-center text-white">
        {appName}
      </Link>
    </h1>
  );
}

export default Header;