import * as cdk from '@aws-cdk/core';
import * as bank_api_gateway_service from '../lib/bank-api-gateway-service';


export class BankApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new bank_api_gateway_service.BankApiGatewayService(this, 'Accounts');
    // The code that defines your stack goes here
  }
}
