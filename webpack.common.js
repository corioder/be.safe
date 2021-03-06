const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: {
    app: path.resolve(__dirname, "app/index.js")
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app")
    }
  }
};
