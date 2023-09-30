#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NeptuneApiStack } from '../lib/neptune_api-stack';

const deployEnv = process.env.DEPLOY_ENV || "dev";

const app = new cdk.App();

new NeptuneApiStack(app, deployEnv + "-NeptuneApiStack", {prod: deployEnv});
