import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import Greeting from "./Greeting";
import BookList from "./BookList";
import HackerNewsSearch from "./HackerNewsSearch";
import BookForm from "./BookForm";

// todo: add material ui
// todo: rerender page on ws
function App() {
  // create book ws

  const bookWS: any = useRef(null);

  useEffect(() => {
    bookWS.current = new WebSocket("ws://localhost:8080/ws");
    bookWS.current.onopen = () => console.log("book ws opened");
    bookWS.current.onclose = () => console.log("book ws closed");

    return () => {
      bookWS.current.close();
    };
  }, []);

  useEffect(() => {
    if (!bookWS.current) {
      console.log("no websocket available");
      return;
    }

    bookWS.current.onmessage = (e: any) => {
      // fix this
      if (!e || !e.data) {
        console.log("WS improperly formatted, ignoring");
        return;
      }
      const message = JSON.parse(e.data);
      console.log("receive:", e.data);
      console.log(message);
    };
  }, []);

  function sendToBackend(data: string) {
    console.log("send   :", data);
    bookWS.current.send(data);
  }

  // end book ws

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

      <button
        onClick={() => {
          sendToBackend("test to backend ");
        }}
      >
        {"Send Message"}
      </button>

      <Greeting name="stranger" />
      <HackerNewsSearch />

      <BookForm />

      <BookList />
    </div>
  );
}

export default App;
