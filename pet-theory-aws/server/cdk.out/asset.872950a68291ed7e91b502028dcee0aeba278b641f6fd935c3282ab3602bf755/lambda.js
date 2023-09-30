"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const ses = new aws_sdk_1.SES();
async function handler(event, context) {
    console.log("REQUEST ==>>", event.body);
    const { to, from, subject, text } = JSON.parse(event.body || "{}");
    if (!to || !from || !subject || !text) {
        return Responses._400({
            message: 'to, from, subject and text are all required in the body',
        });
    }
    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Text: { Data: text },
            },
            Subject: { Data: subject },
        },
        Source: from,
    };
    try {
        await ses.sendEmail(params).promise();
        return Responses._200({ message: 'The email has been sent' });
    }
    catch (error) {
        console.log('error sending email ', error);
        return Responses._400({ message: 'The email failed to send' });
    }
}
exports.handler = handler;
const Responses = {
    _200(data) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify(data),
            operationSuccessful: true
        };
    },
    _400(data) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify(data),
            operationSuccessful: false
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUE4QjtBQUU5QixNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO0FBU2YsS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUEyQixFQUFFLE9BQWdCO0lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBZSxDQUFDO0lBRS9FLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDbkMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSx5REFBeUQ7U0FDckUsQ0FBQyxDQUFDO0tBQ047SUFFRCxNQUFNLE1BQU0sR0FBRztRQUNYLFdBQVcsRUFBRTtZQUNULFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtTQUM3QjtRQUNELE1BQU0sRUFBRSxJQUFJO0tBQ2YsQ0FBQztJQUVGLElBQUk7UUFDQSxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQztLQUNqRTtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO0tBQ2xFO0FBR0wsQ0FBQztBQWpDRCwwQkFpQ0M7QUFJRCxNQUFNLFNBQVMsR0FBRztJQUNkLElBQUksQ0FBQyxJQUFZO1FBQ2IsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyw4QkFBOEIsRUFBRSxHQUFHO2dCQUNuQyw2QkFBNkIsRUFBRSxHQUFHO2FBQ3JDO1lBQ0QsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsbUJBQW1CLEVBQUUsSUFBSTtTQUU1QixDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2IsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyw4QkFBOEIsRUFBRSxHQUFHO2dCQUNuQyw2QkFBNkIsRUFBRSxHQUFHO2FBQ3JDO1lBQ0QsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsbUJBQW1CLEVBQUUsS0FBSztTQUM3QixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0LCBDb250ZXh0IH0gZnJvbSAnYXdzLWxhbWJkYSc7XHJcbmltcG9ydCB7IFNFUyB9IGZyb20gXCJhd3Mtc2RrXCI7XHJcblxyXG5jb25zdCBzZXMgPSBuZXcgU0VTKCk7XHJcblxyXG5pbnRlcmZhY2UgRW1haWxQYXJhbSB7XHJcbiAgICB0bz86IHN0cmluZztcclxuICAgIGZyb20/OiBzdHJpbmc7XHJcbiAgICBzdWJqZWN0Pzogc3RyaW5nO1xyXG4gICAgdGV4dD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBjb250ZXh0OiBDb250ZXh0KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiUkVRVUVTVCA9PT4+XCIsIGV2ZW50LmJvZHkpO1xyXG5cclxuICAgIGNvbnN0IHsgdG8sIGZyb20sIHN1YmplY3QsIHRleHQgfSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keXx8XCJ7fVwiKSBhcyBFbWFpbFBhcmFtO1xyXG5cclxuICAgIGlmICghdG8gfHwgIWZyb20gfHwgIXN1YmplY3QgfHwgIXRleHQpIHtcclxuICAgICAgICByZXR1cm4gUmVzcG9uc2VzLl80MDAoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAndG8sIGZyb20sIHN1YmplY3QgYW5kIHRleHQgYXJlIGFsbCByZXF1aXJlZCBpbiB0aGUgYm9keScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIERlc3RpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIFRvQWRkcmVzc2VzOiBbdG9dLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTWVzc2FnZToge1xyXG4gICAgICAgICAgICBCb2R5OiB7XHJcbiAgICAgICAgICAgICAgICBUZXh0OiB7IERhdGE6IHRleHQgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgU3ViamVjdDogeyBEYXRhOiBzdWJqZWN0IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTb3VyY2U6IGZyb20sXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgc2VzLnNlbmRFbWFpbChwYXJhbXMpLnByb21pc2UoKTtcclxuICAgICAgICByZXR1cm4gUmVzcG9uc2VzLl8yMDAoeyBtZXNzYWdlOiAnVGhlIGVtYWlsIGhhcyBiZWVuIHNlbnQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igc2VuZGluZyBlbWFpbCAnLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIFJlc3BvbnNlcy5fNDAwKHsgbWVzc2FnZTogJ1RoZSBlbWFpbCBmYWlsZWQgdG8gc2VuZCcgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5jb25zdCBSZXNwb25zZXMgPSB7XHJcbiAgICBfMjAwKGRhdGE6IE9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICcqJyxcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3NmdWw6IHRydWUgXHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIF80MDAoZGF0YTogT2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJyonLFxyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2Vzc2Z1bDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxufTsiXX0=