import React from 'react';
import { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

function TwitterEmbed({ url }) {
    // Extract tweet ID from URL
    let tweetID = url.split("/")[5];

    // if the screen is small, make the tweet smaller
    let width = 550;
    if (window.innerWidth < width) {
        width = window.innerWidth;
    }
    

    return (
        <div id="twitter-tweet-embed" style={{margin:"auto", width:width,}}>
            <TwitterTweetEmbed tweetId={tweetID} />
        </div>
    );
}
    
export default TwitterEmbed;