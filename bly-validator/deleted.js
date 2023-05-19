const args = require('args');

args
    .option('post', 'The URL of the post to check if deleted')
    .option('platform', 'The platform to validate the post for')
    .option('existing', 'The file with existing posts to update.')
    .option('output', 'The output file to write the results to')

const flags = args.parse(process.argv);

if (!flags.post || !flags.platform || !flags.existing || !flags.output) {
    args.showHelp();
}

const fs = require('fs');
const path = require('path');

const existingPath = path.resolve(flags.existing);
const outputPath = path.resolve(flags.output);

const existing = require(existingPath);

if (!existing) {
    console.log('Invalid existing posts file');
    process.exit(1);
}

const platforms = {
    'twitter': require('./platforms/twitter'),
    'reddit': require('./platforms/reddit'),
}

const platform = platforms[flags.platform];

if (!platform) {
    console.log('Invalid platform');
    process.exit(1);
}

const post = flags.post;

const existingPost = existing.find(p => p.url === post);

if (!existingPost) {
    console.log('Post does not exist');
    process.exit(1);
}

platform.isDeleted(post).then(deleted => {

if (deleted == false) {
    console.log('Post is not deleted.');
    process.exit(1);
} else if (deleted === null) {
    console.log('Something went wrong.');
    process.exit(1);
}

// Remove the post from the existing posts
const combined = existing.filter(p => p.url !== post);

// Write the combined posts to the output file
fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2));

console.log('Post removed successfully');
});