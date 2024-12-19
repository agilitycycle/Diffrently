import React from 'react';

const Make = ({
  topic1,
  topic2,
  topic3,
  cardCount,
  imageUrl,
  loaded,
  handleChange,
  handleSubmit
}) => {
  return (<div className="relative mb-7 mx-auto bg-transparent border border-gray-200 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
    <div className="w-full sm:max-w-96 pt-3 pb-8 px-3">
      <div className="flex mb-6">
        <img src={imageUrl || 'https://placehold.co/600x400'} className="rounded-2xl w-full" />
      </div>
      <div>
        <input name="topic1" value={topic1} onChange={handleChange} className="block py-1 pr-2.5 mb-2.5 w-full text-base text-white bg-transparent !outline-none" placeholder="Topic 1"/>
        <input name="topic2" value={topic2} onChange={handleChange} className="block py-1 pr-2.5 mb-2.5 w-full text-base text-white bg-transparent !outline-none" placeholder="Topic 2"/>
        <input name="topic3" value={topic3} onChange={handleChange} className="block py-1 pr-2.5 mb-2.5 w-full text-base text-white bg-transparent !outline-none" placeholder="Topic 3"/>
        <select name="cardCount" value={cardCount === 0 ? 'How many cards?' : cardCount} onChange={handleChange} className="bg-transparent border border-gray-200 dark:border-gray-700 text-white/60 text-base rounded-lg block w-full p-2.5 mb-8 !outline-none">
          <option selected>How many cards?</option>
          <option value="1">1</option>
          <option value="3">3 (Nearly)</option>
          <option value="5">5 (Nearly)</option>
        </select>
        <button onClick={handleSubmit} disabled={loaded} className="block rounded-full mt-4 mb-4 text-xl uppercase w-48 h-14 bg-[#f87341] text-[#ffffff]">
          Make
        </button>
      </div>
    </div>
  </div>);
}

export default Make;