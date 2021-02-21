import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import { CustomResourceProvider } from "@aws-cdk/core";


export class BankApiGatewayService extends core.Construct {
    constructor(scope: core.Construct, id: string) {
        super(scope, id);

        const api = new apigateway.RestApi(this, "bank-api", {
            restApiName: "Bank API Service",
            description: "This service serves API from bank Backend."
        });

        //apigateway.Re resourceOptions =
        const accountResource = api.root.addResource("account");
        const bankBackendbaseUrl = 'http://bankb-bigbl-1wx58wk4eou7a-1886738708.us-east-1.elb.amazonaws.com'

        const accountByIdResource = api.root.resourceForPath("/account/{accountId}");
        const userRegisterResource = api.root.resourceForPath("/user/register");
        const userLoginResource = api.root.resourceForPath("/user/login");
        const transactionResource = api.root.resourceForPath("/account/transactions/{accountId}");

        const integrationProps = { httpMethod: 'POST' };
        const methodOptions = {
            apiKeyRequired: true, requestParameters: {
                "method.request.path.accountId": true
            }
        }
        accountResource.addMethod("POST", new apigateway.HttpIntegration(`${bankBackendbaseUrl}/account`, integrationProps), methodOptions);
        accountResource.addMethod("GET", new apigateway.HttpIntegration(`${bankBackendbaseUrl}/account`), methodOptions);

        accountByIdResource.addMethod("GET",
            createNewHttpIntegration(`${bankBackendbaseUrl}/account/` + '{accountId}', 'GET'),
            methodOptions);
        accountByIdResource.addMethod("DELETE", createNewHttpIntegration(`${bankBackendbaseUrl}/account/` + '{accountId}', 'DELETE'), methodOptions);


        transactionResource.addMethod("GET", createNewHttpIntegration(`${bankBackendbaseUrl}/account/` + '{accountId}', 'GET'), methodOptions);
        transactionResource.addMethod("POST",
            createNewHttpIntegration(`${bankBackendbaseUrl}/account/` + '{accountId}', 'POST'), methodOptions);

        userRegisterResource.addMethod("POST", new apigateway.HttpIntegration(`${bankBackendbaseUrl}/user/register`, integrationProps),methodOptions);
        userLoginResource.addMethod("POST", new apigateway.HttpIntegration(`${bankBackendbaseUrl}/user/login`, integrationProps),methodOptions);


    }
}

function createNewHttpIntegration(url: string, method: string): apigateway.Integration | undefined {
    return new apigateway.HttpIntegration(url,
        {
            proxy: true,
            httpMethod: method,
            options: {
                requestParameters: {
                    "integration.request.path.accountId": "method.request.path.accountId"
                }
            }
        });
}
