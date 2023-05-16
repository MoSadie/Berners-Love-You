const args = require('args');

args
    .option('post', 'The URL of the post to validate')
    .option('platform', 'The platform to validate the post for');

const flags = args.parse(process.argv);

if (!flags.post && !flags.platform) {
    args.showHelp();
}
console.log(flags);
if (!flags.post) {
    console.log("Please specify a post to validate");
    process.exit(1);
}

// const jsonData = require('../berners-love-you/src/posts.json');

// for (let i = 0; i < jsonData.length; i++) {
//     console.log(i + ": " + jsonData[i]);
// }