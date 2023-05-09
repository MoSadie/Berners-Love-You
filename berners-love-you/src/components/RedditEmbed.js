import React from 'react';
import { useEffect } from 'react';

// class RedditEmbed extends React.Component {
//     componentDidMount() {
//         const script = document.createElement("script");
//         script.src = "https://embed.redditmedia.com/widgets/platform.js";
//         script.async = true;
//         script.id = "reddit-embed-script";
//         document.body.appendChild(script);
//     }

//     render() {
//         return (
//                     <div className="reddit-embed">
//                         <blockquote id="embed" className="reddit-embed">
//                             <a id="post" href={url}>{url}</a>
//                         </blockquote>
//                     </div>
//                 );
//         }

//     componentWillUnmount() {
//         // Whatever you need to cleanup the widgets code
//         document.getElementById("reddit-embed-script").remove();
//     }
// }

function RedditEmbed({ url }) {
    // On load, create the script tag and insert it into the page
    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.redditmedia.com/widgets/platform.js";
    script.async = true;
    script.id = "reddit-embed-script";
    document.body.appendChild(script);
    
    //Cleanup code
    return () => {
        document.getElementById("reddit-embed-script").remove();
    }
    }, []);
    

    return (
        <><div className="reddit-embed">
        <blockquote id="embed" className="reddit-embed">
        <a id="post" href={url}>{url}</a>
        </blockquote>
        </div>
        <script src="https://embed.redditmedia.com/widgets/platform.js" charSet="UTF-8"></script>
        </>
    );
}
    
export default RedditEmbed;