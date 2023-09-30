"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
async function addBookmark(bookmark) {
    const params = {
        TableName: process.env.BOOKMARK_TABLE,
        Item: bookmark
    };
    try {
        await docClient.put(params).promise();
        return bookmark;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}
exports.default = addBookmark;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQm9va21hcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRCb29rbWFyay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUUvQixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFHcEQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxRQUFrQjtJQUN6QyxNQUFNLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7UUFDckMsSUFBSSxFQUFFLFFBQVE7S0FDakIsQ0FBQTtJQUNELElBQUk7UUFDQSxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsT0FBTyxRQUFRLENBQUM7S0FDbkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFFRCxrQkFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XHJcbmltcG9ydCB7IEV2ZW50QnJpZGdlRXZlbnQsIENvbnRleHQgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5jb25zdCBkb2NDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XHJcbmltcG9ydCBCb29rbWFyayBmcm9tICcuL2Jvb2ttYXJrJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZEJvb2ttYXJrKGJvb2ttYXJrOiBCb29rbWFyaykge1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuQk9PS01BUktfVEFCTEUsXHJcbiAgICAgICAgSXRlbTogYm9va21hcmtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZG9jQ2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcclxuICAgICAgICByZXR1cm4gYm9va21hcms7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRHluYW1vREIgZXJyb3I6ICcsIGVycik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFkZEJvb2ttYXJrOyJdfQ==