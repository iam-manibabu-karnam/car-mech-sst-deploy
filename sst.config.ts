export default {
  config(_app) {
    return {
      name: "car-mech-sst-deploy",
      region: "ap-south-1",
    };
  },
  async stacks(app) {
    const { NextjsSite, Bucket } = await import("sst/constructs");

    const site = new NextjsSite(app, "NextJsSite", {
      path: ".",
    });

    new Bucket(app, "UploadsBucket");

    app.addOutputs({
      SiteUrl: site.url,
    });
  }
};
