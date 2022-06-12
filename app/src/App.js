import { SkynetClient } from 'skynet-js';

import logo from './logo.svg';
import './App.css';

const portal = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

const client = new SkynetClient(portal);

function App() {
  const abra = 'abra';
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <br></br>
          {abra}
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
    </div>
  );
}

export default App;
