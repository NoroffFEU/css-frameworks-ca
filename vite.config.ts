import * as path from "path";

/** @type {import('vite').UserConfig} */
export default {
  root: path.resolve(__dirname, "src"),
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        feed: path.resolve(__dirname, "src/feed/index.html"),
        profile: path.resolve(__dirname, "src/profile/index.html"),
      },
    },
  },
};
