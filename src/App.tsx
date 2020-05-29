import React, { useState, ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';

import Greeting from './Greeting';
import HackerNewsList from './HackerNewsList';
import BookList from './BookList';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const HackerNewsSearchPath: string = 'https://hn.algolia.com/api/v1/search?query=';

  function handleChange(event: any) {
    setSearchQuery(event?.target?.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>


      </header>

      <Greeting name="stranger"/>
      <BookList />

      <input onChange={(e: ChangeEvent) => {handleChange(e);}} />
      <HackerNewsList 
        path={HackerNewsSearchPath}
        query={searchQuery} 
      />
    </div>
  );
}

export default App;
