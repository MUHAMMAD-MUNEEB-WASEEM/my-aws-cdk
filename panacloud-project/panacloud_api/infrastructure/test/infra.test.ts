import { expect, haveResource, countResourcesLike } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { InfrastructureStack } from "../lib/infrastructure-stack";

describe("Infrastructure Existence Tests", () => {
  const app = new cdk.App();
  const myStack = new InfrastructureStack(app, "MyStack");

  test("DynamoDB Master Table Exists", () => {
    expect(myStack).to(
      haveResource("AWS::DynamoDB::Table", {
        TableName: "masterTable",
      })
    );
  });

  test("Dependencies Lambda Layer Exists", () => {
    expect(myStack).to(
      haveResource("AWS::Lambda::LayerVersion", {
        LayerName: "onboardingDependencies",
      })
    );
  });

  test("API Publishing Handler Exists", () => {
    expect(myStack).to(
      haveResource("AWS::Lambda::Function", {
        FunctionName: "publishApiFn",
      })
    );
  });

  test("API Subscription handler Exists", () => {
    expect(myStack).to(
      haveResource("AWS::Lambda::Function", {
        FunctionName: "subscribeToApiFn",
      })
    );
  });

  test("API Creation handler Exists", () => {
    expect(myStack).to(
      haveResource("AWS::Lambda::Function", {
        FunctionName: "createApiFn",
      })
    );
  });

  test("Post Confirmation Lambda handler Exists", () => {
    expect(myStack).to(
      haveResource("AWS::Lambda::Function", {
        FunctionName: "postConfirmationLambda",
      })
    );
  });

  test("Appsync API Exists", () => {
    expect(myStack).to(
      haveResource("AWS::AppSync::GraphQLApi", {
        Name: "tenantOnboarding",
      })
    );
  });

  test("Dev User Pool Exists", () => {
    expect(myStack).to(
      haveResource("AWS::Cognito::UserPool", {
        UserPoolName: "devUserPool",
      })
    );
  });

  test("Userpool Client Exists", () => {
    expect(myStack).to(haveResource("AWS::Cognito::UserPoolClient"));
  });
});

describe("Infrastructure Policy and Config Tests", () => {
  const app = new cdk.App();
  const stack = new InfrastructureStack(app, "MyStack");

  describe("Lambda Configs", () => {
    test("should have dependency layer on all 6 Lambdas", () => {
      expect(stack).to(
        countResourcesLike("AWS::Lambda::Function", 6, {
          Layers: [
            {
              Ref: "dependenciesC953CF80",
            },
          ],
        })
      );
    });

    test("should have NODEJS12 Runtime with 1024 memory on all 6 Lambdas", () => {
      expect(stack).to(
        countResourcesLike("AWS::Lambda::Function", 6, {
          Runtime: "nodejs12.x",
          MemorySize: 1024,
        })
      );
    });

    test("should have master table in environment for all 6 Lambdas", () => {
      expect(stack).to(
        countResourcesLike("AWS::Lambda::Function", 6, {
          Environment: {
            Variables: {
              TENANT_TABLE: {
                Ref: "masterTable29DBE7B9",
              },
            },
          },
        })
      );
    });
  });

  describe("DynamoDB Configs", () => {
    test("should be in pay per request billing mode", () => {
      expect(stack).to(
        haveResource("AWS::DynamoDB::Table", {
          BillingMode: "PAY_PER_REQUEST",
        })
      );
    });

    test("should have 2 GSIs", () => {
      expect(stack).to(
        haveResource("AWS::DynamoDB::Table", {
          GlobalSecondaryIndexes: [
            {
              IndexName: "GSI1",
              KeySchema: [
                {
                  AttributeName: "pk1",
                  KeyType: "HASH",
                },
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
            {
              IndexName: "sk-index",
              KeySchema: [
                {
                  AttributeName: "sk",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "pk",
                  KeyType: "RANGE",
                },
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
          ],
        })
      );
    });

    test("should have correct Primary Index", () => {
      expect(stack).to(
        haveResource("AWS::DynamoDB::Table", {
          KeySchema: [
            {
              AttributeName: "pk",
              KeyType: "HASH",
            },
            {
              AttributeName: "sk",
              KeyType: "RANGE",
            },
          ],
        })
      );
    });
  });

  describe("Cognito Configs", () => {
    test("should have expected Schema", () => {
      expect(stack).to(
        haveResource("AWS::Cognito::UserPool", {
          Schema: [
            {
              Mutable: true,
              Name: "email",
              Required: true,
            },
            {
              Mutable: true,
              Name: "name",
              Required: true,
            },
            {
              Mutable: true,
              Name: "phone_number",
              Required: true,
            },
            {
              Mutable: true,
              Name: "picture",
              Required: false,
            },
            {
              Mutable: true,
              Name: "address",
              Required: true,
            },
          ],
        })
      );
    });

    test("should allow users to signup", () => {
      expect(stack).to(
        haveResource("AWS::Cognito::UserPool", {
          AdminCreateUserConfig: {
            AllowAdminCreateUserOnly: false,
          },
        })
      );
    });
  });
});
