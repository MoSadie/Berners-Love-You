import { useState } from 'react';
import RedditEmbed from './components/RedditEmbed';
import TwitterEmbed from './components/TwitterEmbed';
import posts from './posts.json';
import './App.css';

function isRedditPost(url) {
  return url.startsWith("https://reddit.com") || url.startsWith("https://www.reddit.com");
}

function isTwitterPost(url) {
  return url.startsWith("https://twitter.com") || url.startsWith("https://www.twitter.com");
}

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
      {isRedditPost(post) && <RedditEmbed key={post} url={post} />}
      {isTwitterPost(post) && <TwitterEmbed key={post} url={post} />}
      </div>

      <p>Link to original post:</p>
      <p>
        <a href={post}>{post}</a>
      </p>
      <p>Encountered a broken post? Report it <a href="https://github.com/MoSadie/Berners-Love-You/issues">here!</a></p>
    </div>
  );
}

export default App;
