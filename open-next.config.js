module.exports = {
  outDir: ".open-next", // where OpenNext will output the built files
  redirects: [
    {
      source: "/old",
      destination: "/",
      permanent: true
    }
  ],
  cache: {
    static: "31536000",  // 1 year cache for static files
    dynamic: "86400"     // 1 day cache for SSR responses
  }
};
