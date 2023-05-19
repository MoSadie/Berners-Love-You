import { useState } from 'react';
import RedditEmbed from './components/RedditEmbed';
import TwitterEmbed from './components/TwitterEmbed';
import posts from './posts.json';
import './App.css';

function getPostComponent(post) {
  switch (post.platform) {
    case 'reddit':
      return <RedditEmbed key={post.url} url={post.url} />;

    case 'twitter':
      return <TwitterEmbed key={post.url} url={post.url} />;

    default:
      return <p>An error has occurred, please try again later!</p>
  }
}

console.log("Fun fact! There are currently " + posts.length + " possible posts that can appear!");

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
      {getPostComponent(post)}
      </div>

      <p>Link to original post:</p>
      <p>
        <a href={post.url}>{post.url}</a>
      </p>
      <p>Encountered a broken post? Report it <a href="https://github.com/MoSadie/Berners-Love-You/issues">here!</a></p>
    </div>
  );
}

export default App;
