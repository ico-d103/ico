module.exports = {
  module: {
    rules: [
      {
        test: /\/node_modules\/@nivo\/(.*?)\.js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};