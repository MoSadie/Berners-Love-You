const reddit = {
    validate: (post) => {
        // Check if post begins with https://www.reddit.com/r/ or https://reddit.com/r/
        // and ends with /comments/*
        // If so, return true

        const regex = /^https?:\/\/(www\.)?reddit\.com\/r\/.*\/comments\/.*$/;
        return regex.test(post);
    }
}

module.exports = reddit;