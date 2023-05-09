import logo from './logo.svg';
import { useState } from 'react';
import RedditEmbed from './components/RedditEmbed';
import './App.css';

function App() {
  let [visible, setVisible] = useState(false);
  return (
    <div className="App">
      <h1>Berners loves you!</h1>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {visible && <RedditEmbed url="https://reddit.com/r/bernesemountaindogs/comments/ngfs33/im_wimth_friemd/" />}
    </div>
  );
}

export default App;
