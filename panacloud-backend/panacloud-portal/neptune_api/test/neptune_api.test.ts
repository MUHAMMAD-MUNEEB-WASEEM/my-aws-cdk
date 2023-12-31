import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as NeptuneApi from '../lib/neptune_api-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NeptuneApi.NeptuneApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
