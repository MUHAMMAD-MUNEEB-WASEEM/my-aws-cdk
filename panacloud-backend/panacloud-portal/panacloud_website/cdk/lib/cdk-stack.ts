import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as path from 'path'
import * as origins from '@aws-cdk/aws-cloudfront-origins';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const frontBucket = new s3.Bucket(this, 'FrontendBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    });

    const distribution = new cloudfront.Distribution(this, 'myDist', {
      defaultBehavior: { origin: new origins.S3Origin(frontBucket) },
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.domainName
    })

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(
        path.join(__dirname, '..', '..','public')
      )],
      destinationBucket: frontBucket,
      distribution: distribution,
    }); 
   }
}
