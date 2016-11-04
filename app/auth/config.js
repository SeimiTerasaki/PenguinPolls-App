var ids = {
  github: {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_KEY,
    callbackURL: "https://penguinpolls.herokuapp.com/auth/github/callback"
  },
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "https://penguinpolls.herokuapp.com/auth/facebook/callback"
  },
};

module.exports = ids;