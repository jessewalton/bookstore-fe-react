import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import Greeting from "./Greeting";
import BookList from "./BookList";
import HackerNewsSearch from "./HackerNewsSearch";
import BookForm from "./BookForm";

function App() {
  // create echo ws

  const echoWS: any = useRef(null);

  useEffect(() => {
    echoWS.current = new WebSocket("wss://echo.websocket.org");
    echoWS.current.onopen = () => console.log("echo ws opened");
    echoWS.current.onclose = () => console.log("echo ws closed");

    return () => {
      echoWS.current.close();
    };
  }, []);

  useEffect(() => {
    if (!echoWS.current) {
      console.log("no websocket available");
      return;
    }

    echoWS.current.onmessage = (e: any) => {
      // const message = JSON.parse(e.data);
      console.log("receive:", e.data);
    };
  }, []);

  function sendToEcho(data: string) {
    console.log("send   :", data);
    echoWS.current.send(data);
  }

  // end echo ws

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
      // const message = JSON.parse(e.data);
      console.log("receive:", e.data);
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
          sendToEcho("test to echo");
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
