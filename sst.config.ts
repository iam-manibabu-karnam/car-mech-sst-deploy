import { NextjsSite, Bucket } from "sst/constructs";

export default {
  config(_app) {
    return {
      name: "car-mech-sst-deploy",
      region: "ap-south-1"
    };
  },

  stacks(app) {
    app.stack(function SiteStack({ stack }) {
      const uploadsBucket = new Bucket(stack, "Uploads");

      new NextjsSite(stack, "Site", {
        path: ".",
        environment: {
          UPLOAD_BUCKET_NAME: uploadsBucket.bucketName,
        },
      });
    });
  },
};
