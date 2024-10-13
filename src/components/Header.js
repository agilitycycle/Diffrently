import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { className, useLink = false } = props;
  const headerClss = className || 'inline-block text-6xl text-white text-left font-light my-8';

  if (useLink) {
    return (
      <div className="flex items-center justify-between w-full">
        <h1 className={headerClss}>
          <Link to="/timeline" className="flex items-center text-white">
            fb
          </Link>
        </h1>
        <div className="text-white text-2xl font-sans font-thin">
          Sign in
        </div>
      </div>
    );
  }

  return (
    <h1 className={headerClss}>
      fb
    </h1>);
}

export default Header;