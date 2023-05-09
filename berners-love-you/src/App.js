import logo from './logo.svg';
import { useState } from 'react';
import RedditEmbed from './components/RedditEmbed';
import TwitterEmbed from './components/TwitterEmbed';
import posts from './posts.json';
import './App.css';

function App() {
  function getRandomPost() {
    return posts[Math.floor(Math.random() * posts.length)];
  }

  const [post, setPost] = useState(getRandomPost());

  return (
    <div className="App">
      <h1>Berners loves you!</h1>
      <h3>Here is a Bernese Mountain Dog post to make you smile! 😄</h3>
      <button type='button' onClick={() => setPost(getRandomPost())} style={{fontSize:16}}>New Post</button>
      <br />
      <div style={{padding: "10px"}}>
      {post.startsWith("https://reddit.com") && <RedditEmbed key={post} url={post} />}
      {post.startsWith("https://twitter.com") && <TwitterEmbed key={post} url={post} />}
      </div>

      <p>Link to original post:</p>
      <p>
        <a href={post}>{post}</a>
      </p>
      {/* {visible && <RedditEmbed url="https://reddit.com/r/bernesemountaindogs/comments/ngfs33/im_wimth_friemd/" />}
      {!visible && <TwitterEmbed url="https://twitter.com/bunsenbernerbmd/status/1511328624191844353" />} */}
    </div>
  );
}

export default App;
