"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseTemplate = exports.requestTemplate = exports.EVENT_SOURCE = void 0;
exports.EVENT_SOURCE = "TodoEvents";
exports.requestTemplate = (details, detailType) => {
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
                  "DetailType":"${detailType}",
                  "Source":"${exports.EVENT_SOURCE}",
                  "EventBusName": "default",
                  "Detail": "{${details}}"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QtcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBRTVCLFFBQUEsZUFBZSxHQUFHLENBQUMsT0FBZSxFQUFFLFVBQWtCLEVBQUUsRUFBRTtJQUNuRSxPQUFPOzs7Ozs7Ozs7Ozs7a0NBWXVCLFVBQVU7OEJBQ2Qsb0JBQVk7O2dDQUVWLE9BQU87Ozs7O1VBSzdCLENBQUM7QUFDWCxDQUFDLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUNqQyxPQUFPOzs7Ozs7Ozs7OztPQVdKLENBQUM7QUFDUixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRVZFTlRfU09VUkNFID0gXCJUb2RvRXZlbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcmVxdWVzdFRlbXBsYXRlID0gKGRldGFpbHM6IHN0cmluZywgZGV0YWlsVHlwZTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gYHtcclxuICAgICAgICAgIFwidmVyc2lvblwiOiBcIjIwMTgtMDUtMjlcIixcclxuICAgICAgICAgIFwibWV0aG9kXCI6IFwiUE9TVFwiLCBcclxuICAgICAgICAgIFwicmVzb3VyY2VQYXRoXCI6IFwiL1wiLFxyXG4gICAgICAgICAgXCJwYXJhbXNcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC1hbXotanNvbi0xLjFcIixcclxuICAgICAgICAgICAgICBcIngtYW16LXRhcmdldFwiOlwiQVdTRXZlbnRzLlB1dEV2ZW50c1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgICAgXCJFbnRyaWVzXCI6W1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBcIkRldGFpbFR5cGVcIjpcIiR7ZGV0YWlsVHlwZX1cIixcclxuICAgICAgICAgICAgICAgICAgXCJTb3VyY2VcIjpcIiR7RVZFTlRfU09VUkNFfVwiLFxyXG4gICAgICAgICAgICAgICAgICBcIkV2ZW50QnVzTmFtZVwiOiBcImRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgICAgXCJEZXRhaWxcIjogXCJ7JHtkZXRhaWxzfX1cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1gO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlVGVtcGxhdGUgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgI2lmKCRjdHguZXJyb3IpXHJcbiAgICAgICAgICAgICAgJHV0aWwuZXJyb3IoJGN0eC5lcnJvci5tZXNzYWdlLCAkY3R4LmVycm9yLnR5cGUpXHJcbiAgICAgICAgICAjZW5kXHJcbiAgICAgICAgICAjaWYoJGN0eC5yZXN1bHQuc3RhdHVzQ29kZSA9PSAyMDApXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJyZXN1bHRcIjogXCIkdXRpbC5wYXJzZUpzb24oJGN0eC5yZXN1bHQuYm9keSlcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgI2Vsc2VcclxuICAgICAgICAgICAgICAkdXRpbHMuYXBwZW5kRXJyb3IoJGN0eC5yZXN1bHQuYm9keSwgJGN0eC5yZXN1bHQuc3RhdHVzQ29kZSlcclxuICAgICAgICAgICNlbmRcclxuICAgICAgYDtcclxufTsiXX0=