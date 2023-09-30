export const EVENT_SOURCE = "BookmarkEvents";

export const requestTemplate = () => {
    return `{
          "version": "2018-05-29",
          "method": "POST", 
          "resourcePath": "/",
          "params": {
            "headers": {
              "content-type": "application/x-amz-json-1.1",
              "x-amz-target":"AWSEvents.PutEvents"
            },
            "body": {
              "Entries":[
                {
                  "DetailType":"addBookmark",
                  "Source":"BookmarkEvents",
                  "EventBusName": "default",
                  "Detail": "{
                    \"titile\": \"$ctx.args.bookmark.title\",
                    \"url\" \"$ctx.args.bookmark.title\"
                  }"
                }
              ]
            }
          }
        }`;
};

export const responseTemplate = () => {
    return `
          #if($ctx.error)
              $util.error($ctx.error.message, $ctx.error.type)
          #end
          #if($ctx.result.statusCode == 200)
          {
              "result": "$util.parseJson($ctx.result.body)"
          }
          #else
              $utils.appendError($ctx.result.body, $ctx.result.statusCode)
          #end
      `;
};