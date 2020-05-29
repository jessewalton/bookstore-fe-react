import React, { useState, ChangeEvent } from 'react';
import HackerNewsList from './HackerNewsList';

function HackerNewsSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const HackerNewsSearchPath: string = 'https://hn.algolia.com/api/v1/search?query=';

  function handleChange(event: any) {
    setSearchQuery(event?.target?.value);
  }

  return (
    <>
      <input onChange={(e: ChangeEvent) => {handleChange(e);}} />
      <HackerNewsList 
        path={HackerNewsSearchPath}
        query={searchQuery} 
      />
    </>
  );
}

export default HackerNewsSearch;