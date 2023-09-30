import * as gremlin from "gremlin";
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
import {APIGatewayProxyEvent,APIGatewayProxyResult,Context} from "aws-lambda";

declare var process: {
  env: {
    NEPTUNE_ENDPOINT: string;
  };
};

export async function handler(event: any, context: Context, callback: any) {
  console.log(event);

  try {
    const dc = new DriverRemoteConnection(
      `wss://${process.env.NEPTUNE_ENDPOINT}:8182/gremlin`,
      {}
    );
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    const __ = gremlin.process.statics;
    
    const result= g.V().constant("hello world")
    console.log(result)

} catch (error) {
    console.log(error);
  }
}
