"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseTemplate = exports.requestTemplate = exports.EVENT_SOURCE = void 0;
exports.EVENT_SOURCE = "BookmarkEvents";
exports.requestTemplate = () => {
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
exports.responseTemplate = () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QtcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7QUFFaEMsUUFBQSxlQUFlLEdBQUcsR0FBRyxFQUFFO0lBQ2hDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBdUJELENBQUM7QUFDWCxDQUFDLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUNqQyxPQUFPOzs7Ozs7Ozs7OztPQVdKLENBQUM7QUFDUixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRVZFTlRfU09VUkNFID0gXCJCb29rbWFya0V2ZW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlcXVlc3RUZW1wbGF0ZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBge1xyXG4gICAgICAgICAgXCJ2ZXJzaW9uXCI6IFwiMjAxOC0wNS0yOVwiLFxyXG4gICAgICAgICAgXCJtZXRob2RcIjogXCJQT1NUXCIsIFxyXG4gICAgICAgICAgXCJyZXNvdXJjZVBhdGhcIjogXCIvXCIsXHJcbiAgICAgICAgICBcInBhcmFtc1wiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LWFtei1qc29uLTEuMVwiLFxyXG4gICAgICAgICAgICAgIFwieC1hbXotdGFyZ2V0XCI6XCJBV1NFdmVudHMuUHV0RXZlbnRzXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJib2R5XCI6IHtcclxuICAgICAgICAgICAgICBcIkVudHJpZXNcIjpbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIFwiRGV0YWlsVHlwZVwiOlwiYWRkQm9va21hcmtcIixcclxuICAgICAgICAgICAgICAgICAgXCJTb3VyY2VcIjpcIkJvb2ttYXJrRXZlbnRzXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiRXZlbnRCdXNOYW1lXCI6IFwiZGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgICBcIkRldGFpbFwiOiBcIntcclxuICAgICAgICAgICAgICAgICAgICBcXFwidGl0aWxlXFxcIjogXFxcIiRjdHguYXJncy5ib29rbWFyay50aXRsZVxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXFxcInVybFxcXCIgXFxcIiRjdHguYXJncy5ib29rbWFyay50aXRsZVxcXCJcclxuICAgICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzcG9uc2VUZW1wbGF0ZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAjaWYoJGN0eC5lcnJvcilcclxuICAgICAgICAgICAgICAkdXRpbC5lcnJvcigkY3R4LmVycm9yLm1lc3NhZ2UsICRjdHguZXJyb3IudHlwZSlcclxuICAgICAgICAgICNlbmRcclxuICAgICAgICAgICNpZigkY3R4LnJlc3VsdC5zdGF0dXNDb2RlID09IDIwMClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcInJlc3VsdFwiOiBcIiR1dGlsLnBhcnNlSnNvbigkY3R4LnJlc3VsdC5ib2R5KVwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAjZWxzZVxyXG4gICAgICAgICAgICAgICR1dGlscy5hcHBlbmRFcnJvcigkY3R4LnJlc3VsdC5ib2R5LCAkY3R4LnJlc3VsdC5zdGF0dXNDb2RlKVxyXG4gICAgICAgICAgI2VuZFxyXG4gICAgICBgO1xyXG59OyJdfQ==