const args = require("args");

args
  .option("post", "The URL of the post to validate")
  .option("platform", "The platform to validate the post for")
  .option("json", "Parsed JSON of a GitHub Issue body")
  .option("existing", "The file with existing posts to update.")
  .option("output", "The output file to write the results to");

const flags = args.parse(process.argv);

if (((!flags.post || !flags.platform) || !flags.json ) || !flags.existing || !flags.output) {
  args.showHelp();
}

if (flags.json) {
  // Parse the JSON
  console.log("Using JSON input")
  flags.platform = flags.json.platform.text;
  flags.post = flags.json.link.text;

  console.log("Platform: " + flags.platform);
  console.log("Post: " + flags.post);
}

const fs = require("fs");
const path = require("path");

const existingPath = path.resolve(flags.existing);
const outputPath = path.resolve(flags.output);

const existing = require(existingPath);

if (!existing) {
  console.log("Invalid existing posts file");
  process.exit(1);
}

const platforms = {
  twitter: require("./platforms/twitter"),
  reddit: require("./platforms/reddit"),
};

const platform = platforms[flags.platform];

if (!platform) {
  console.log("Invalid platform");
  process.exit(1);
}

const post = flags.post;

platform.validate(post).then((validated) => {
  if (!validated) {
    console.log("Post is not valid");
    process.exit(1);
  }

  const existingPost = existing.find((p) => p.url === post);

  if (existingPost) {
    console.log("Post already exists");
    process.exit(1);
  }

  // Combine the validated post with the existing posts
  const postData = {
    url: post,
    platform: flags.platform,
  };

  const combined = [...existing, postData];

  // Write the combined posts to the output file
  fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2));

  console.log("Post added successfully");
});
