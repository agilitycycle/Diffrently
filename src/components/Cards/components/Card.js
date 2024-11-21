import React from 'react';
import Sm from '../sizes/Sm';

const Card = (props) => {
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
    size
  } = props;

  const smProps = {
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
  }

  if (size === 'Sm') {
    return <Sm {...smProps} />
  }
} 

export default Card;