import React, {useState} from 'react';
import CardContent from '../components/CardContent';
import SocialMediaIcons from '../components/SocialMediaIcons';
import ActiveMenuCard from '../components/ActiveMenuCard';
import MoreMenu from '../components/MoreMenu';

const Sm = (props) => {
  const {
    id,
    title,
    dateCreated,
    photoUrl,
    displayName,
    body,
    handleAction,
    switchPage,
    type,
    tags,
    menuOptions,
  } = props;
  const [openMenu, setOpenMenu] = useState(false);

  const toggleSubmenu = () => {
    setOpenMenu(!openMenu);
  }

  const MoreMenuProps = {
    title,
    body,
    tags,
    toggleSubmenu,
    handleAction,
    openMenu,
    menuOptions
  }

  const showHide = openMenu ? 'opacity-0 pointer-events-none' : 'opacity-100';

  const cardContentProps = {
    photoUrl,
    displayName,
    showHide,
    id,
    title,
    body,
    dateCreated,
    tagCount: type === 'ROOT' || type === 'TAGS' ? false : true,
    tags,
    switchPage,
  }

  return (<div className="relative mb-7 mx-auto bg-transparent border border-gray-200 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
    <div>
      {openMenu && (<ActiveMenuCard toggleSubmenu={toggleSubmenu}/>)}
      <MoreMenu {...MoreMenuProps}/>
      <CardContent {...cardContentProps} />
      <div className="pb-5">
        {SocialMediaIcons()}
      </div>
    </div>
  </div>);
} 

export default Sm;