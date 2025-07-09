import { SSTConfig } from "sst";
import { NextjsSite, Bucket } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "nextjs-s3-upload",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(({ stack }) => {
      // S3 bucket for file uploads
      const uploadBucket = new Bucket(stack, "UploadBucket", {
        cors: true
      });

      // Next.js app deploy
      const site = new NextjsSite(stack, "NextSite", {
        path: ".",
        environment: {
          NEXT_PUBLIC_UPLOAD_BUCKET: uploadBucket.bucketName
        }
      });

      // Permissions for app to write to S3
      site.attachPermissions([uploadBucket]);

      stack.addOutputs({
        SiteURL: site.url,
        UploadBucket: uploadBucket.bucketName
      });
    });
  }
} satisfies SSTConfig;
