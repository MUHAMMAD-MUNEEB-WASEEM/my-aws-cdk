import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as neptune from "@aws-cdk/aws-neptune";

interface VPCProps {
  prod: string
}

export class VPCNeptune extends cdk.Construct {

    public readonly VPCRef: ec2.Vpc;
    public readonly NeptuneRef: neptune.CfnDBCluster;
    public readonly SGRef: ec2.SecurityGroup;

    constructor(scope: cdk.Construct, id: string, props?: VPCProps) {
      super(scope, id);

      const vpc = new ec2.Vpc(this, "Vpc", {
        subnetConfiguration: [
          {
            cidrMask: 24, // Creates a size /24 IPv4 subnet (a range of 256 private IP addresses) in the VPC
            name: 'private',
            subnetType: ec2.SubnetType.PRIVATE,
          },
          {
            cidrMask: 24,
            name: 'public',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            cidrMask: 24,
            name: 'isolated',
            subnetType: ec2.SubnetType.ISOLATED,
          },
        ]
      });

      // Create a security group and subnetgroup to ensure lambda and neptune cluster deploy on the same vpc
      const sg1 = new ec2.SecurityGroup(this, "mySecurityGroup1", {
        vpc,
        allowAllOutbound: true,
        description: "security group 1",
        securityGroupName: "mySecurityGroup",
      });
      cdk.Tags.of(sg1).add("Name", "mySecurityGroup");

      sg1.addIngressRule(sg1, ec2.Port.tcp(8182), "MyRule");

      const neptuneSubnet = new neptune.CfnDBSubnetGroup(
        this,
        "neptuneSubnetGroup",
        {
          dbSubnetGroupDescription: "My Subnet",
          subnetIds: vpc.selectSubnets({ subnetType: ec2.SubnetType.ISOLATED })
            .subnetIds,
          dbSubnetGroupName: `${props?.prod}-mysubnetgroup`,
        }
      );

      // Creating neptune cluster
      const neptuneCluster = new neptune.CfnDBCluster(this, "MyCluster", {
        dbSubnetGroupName: neptuneSubnet.dbSubnetGroupName,
        dbClusterIdentifier: `${props?.prod}-myDbCluster`,
        vpcSecurityGroupIds: [sg1.securityGroupId],
      });
      neptuneCluster.addDependsOn(neptuneSubnet);


      // Creating neptune instance
      const neptuneInstance = new neptune.CfnDBInstance(this, "myinstance", {
        dbInstanceClass: "db.t3.medium",
        dbClusterIdentifier: neptuneCluster.dbClusterIdentifier,
        availabilityZone: vpc.availabilityZones[0],
      });
      neptuneInstance.addDependsOn(neptuneCluster);


      this.VPCRef = vpc;
      this.SGRef = sg1;
      this.NeptuneRef = neptuneCluster;

    }

}