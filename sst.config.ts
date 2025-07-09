import { NextjsSite, Bucket } from "sst";

export default {
  config(_app) {
    return {
      name: "car-mech-sst-deploy",
      region: "ap-south-1",
    };
  },

  stacks(app) {
    app.stack(function SiteStack({ stack }) {
      const bucket = new Bucket(stack, "Uploads");

      new NextjsSite(stack, "Site", {
        path: ".",
        environment: {
          UPLOAD_BUCKET_NAME: bucket.bucketName,
        },
      });
    });
  },
};
