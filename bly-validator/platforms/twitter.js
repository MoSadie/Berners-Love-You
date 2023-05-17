const twitter = {
    validate: (post) => {
        // Check if post begins with https://twitter.com/ or https://www.twitter.com/
        // and ends with /status/*
        // If so, return true
        // Otherwise, return false

        const regex = /^https?:\/\/(www\.)?twitter\.com\/.*\/status\/.*$/;

        return regex.test(post);
    }
}

module.exports = twitter;