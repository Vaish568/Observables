var path = require("path");

module.exports = {
  entry: {
    app: "./src/testrx.js",
  },
  output: {
    path: path.resolve("public"),
    filename: "main_bundle.js",
  },
  mode: "development",
  devtool: "eval-cheap-source-map",

  devServer: {
    port: "3001",
    // static: ["./dev"],
    // historyApiFallback: true,
    open: true,
    hot: true,
    liveReload: true,
  },
  //   resolve: {
  //     extensions: [".js", ".json"],
  //   },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "singletonStyleTag" },
          },
          "css-loader",
        ],
      },
    ],
  },
};
