import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { className, useLink = true } = props;
  const headerClss = className || 'inline-block text-6xl text-white text-left font-light mt-5 mb-8';

  if (useLink) {
    return (
      <div>
        <h1 className={headerClss}>
          <Link to="/timeline" className="flex items-center text-white">
            fb
          </Link>
        </h1>
      </div>
    );
  }

  return (
    <h1 className={headerClss}>
      fb
    </h1>);
}

export default Header;