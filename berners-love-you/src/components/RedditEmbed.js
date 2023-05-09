import React from 'react';
import { useEffect } from 'react';

function RedditEmbed({ url }) {
    // On load, create the script tag and insert it into the page
    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.reddit.com/widgets.js";
    script.async = true;
    script.id = "reddit-embed-script";
    document.body.appendChild(script);

    return () => {
        // Whatever you need to cleanup the widgets code
        document.getElementById("reddit-embed-script").remove();
    }
    }, []);
    

    return (
        <div>
        <div className="reddit-embed">
        <blockquote id="embed" className="reddit-embed">
        <a id="post" href={url}>{url}</a>
        </blockquote>
        </div>
        </div>
    );
}
    
export default RedditEmbed;