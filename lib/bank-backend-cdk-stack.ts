import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as lb from "@aws-cdk/aws-elasticloadbalancing";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import { LoadBalancerTarget } from '@aws-cdk/aws-ecs';

export class BankBackendCdkStack extends cdk.Stack {
  // Create a readonly property to reference on an instance.
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "big-blue-bank-vpc", {
      maxAzs: 3 // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, "big-blue-bank-Cluster", {
      vpc: vpc
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: ecs_patterns.ApplicationLoadBalancedFargateService.loadBalancer.loadBalancerDnsName
    });
    const repository =  ecr.Repository.fromRepositoryArn(this, id,"arn:aws:ecr:us-east-1:860928392976:repository/big-blue-bank" )
    

    // Create a load-balanced Fargate service and make it public
    const bankBackendFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "big-blue-bank-fargate-service", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 1, // Default is 1
      taskImageOptions: { image: ecs.ContainerImage.fromEcrRepository(repository,"latest") },
      memoryLimitMiB: 1024, // Default is 512
      publicLoadBalancer: true // Default is false
    });
    //this.loadBalancerURL = bankBackendFargateService.loadBalancer.loadBalancerDnsName.toString();
  }

  
}
