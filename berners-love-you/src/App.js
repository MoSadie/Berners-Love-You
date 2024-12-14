import { useState } from 'react';
import RedditEmbed from './components/RedditEmbed';
import TwitterEmbed from './components/TwitterEmbed';
import posts from './posts.json';
import snoowrap from 'snoowrap';
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

  // Check if query contains "reddit"
  if (window.location.search.includes("reddit")) {
    // If parameter state is set, attempt to show Reddit Saved tool instead
    if (window.location.search.includes("access_token")) {
      var r = new snoowrap({
        userAgent: 'Berners-Love-You',
        clientId: "FIXME", //FIXME
        clientSecret: "",
        accessToken: window.location.search.split("access_token=")[1].split("&")[0]
      });

      // Get saved posts to export as JSON
      r.getMe().getSavedContent().fetchAll({skipReplies: true}).then((posts) => {
        var savedPosts = [];
        posts.forEach((post) => {
          savedPosts.push({
            platform: "reddit",
            url: post.url
          });
        });

        console.log(JSON.stringify(savedPosts));
        alert("Saved posts have been exported to the console. Please check the console for the JSON output.");
      });

      return (
        <div className="App">
          <h1>Exporting Reddit Saved Posts...</h1>
        </div>
      );
    } else {
      // Redirect to Reddit OAuth
      window.location.href = snoowrap.getAuthUrl({
        clientId: "FIXME", //FIXME
        scope: ['history', 'identity'],
        permanent: false,
        redirectUri: window.location,
        state: "redditdogs"
      });

      return (
        <div className="App">
          <h1>Redirecting to Reddit...</h1>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <h1>Berners loves you!</h1>
      <h3>Here is a Bernese Mountain Dog post to make you smile! 😄</h3>
      <button type='button' onClick={() => setPost(getRandomPost())} style={{fontSize:16}}>Next Post</button>
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
