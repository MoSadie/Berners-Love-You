const axios = require('axios');

const reddit = {
    validate: async (post) => {
        // Check if post begins with https://www.reddit.com/r/ or https://reddit.com/r/
        // and ends with /comments/*

        const regex = /^https?:\/\/(www\.)?reddit\.com\/r\/.*\/comments\/.*$/;
        const regexResult = regex.test(post);

        if (!regexResult) {
            return false;
        }

        var isDeleted = await reddit.isDeleted(post);

        if (isDeleted === null || isDeleted) {
            return false;
        }

        return true;
    },

    isDeleted: async (post) => {
        // Check if post is deleted,
        // Returns true if deleted or
        // null if an error occurred (ex invalid url)

        // Check if post begins with https://www.reddit.com/r/ or https://reddit.com/r/
        // and ends with /comments/*

        const regex = /^https?:\/\/(www\.)?reddit\.com\/r\/.*\/comments\/.*$/;
        const regexResult = regex.test(post);

        if (!regexResult) {
            return null;
        }

        // Fetch the post from Reddit by appending .json to the end of the URL
        
        var url = post + '.json';
        var response = await axios.get(url).then(response => { return response.data }).catch(error => { console.log(error); return null; });

        console.log(response);
        
        // If the response is null, return null
        if (!response) {
            console.log("Invalid Response");
            return null;
        }

        // Get the post from the response
        var postData;

        try {
            postData = response[0].data.children[0].data;
        } catch (error) {
            console.log("Error getting post data");
            console.log(error);
            return null;
        }

        // Check if the post is deleted/removed
        // If so, return false

        if (postData.selftext === '[deleted]' || postData.selftext === '[removed]') {
            return true;
        } else if (postData.title === '[deleted]' || postData.title === '[removed]') {
            return true;
        } else if (postData.removed_by_category != null) {
            console.log(postData.removed_by_category);
            return true;
        }

        return false;
    }
}

module.exports = reddit;