#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { Infrastructure } from '../lib/infrastructure';

const app = new cdk.App();
new Infrastructure(app, 'TraderflowDeploymentStack', {
    env: { account: '766787173436', region: 'ap-southeast-2' },
});