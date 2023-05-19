const { isDeleted } = require("./reddit");

const twitter = {
    validate: async (post) => {
        // Check if post begins with https://twitter.com/ or https://www.twitter.com/
        // and ends with /status/*
        // If so, return true
        // Otherwise, return false

        const regex = /^https?:\/\/(www\.)?twitter\.com\/.*\/status\/.*$/;

        const regexResult = regex.test(post);

        if (!regexResult) {
            return false;
        }

        // Commented out so validator can work at all, blame Twitter's API.
        // var isDeleted = await twitter.isDeleted(post);

        return true;
    },

    isDeleted: async (post) => {
        // Check if post is deleted,
        // Returns true if deleted or
        // null if an error occurred (ex invalid url)

        // Check if post begins with https://twitter.com/ or https://www.twitter.com/
        // and ends with /status/*

        const regex = /^https?:\/\/(www\.)?twitter\.com\/.*\/status\/.*$/;
        const regexResult = regex.test(post);

        if (!regexResult) {
            return null;
        }

        console.log("Unfortunately, Twitter's API does not allow me to check if a post is deleted for free, sorry.");

        return null;
    }
}

module.exports = twitter;