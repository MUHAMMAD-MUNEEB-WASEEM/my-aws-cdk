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
        return (Responses._200({ message: 'The email has been sent' }));
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
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUE4QjtBQUU5QixNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO0FBU2YsS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUEyQixFQUFFLE9BQWdCO0lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBZSxDQUFDO0lBRS9FLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDbkMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSx5REFBeUQ7U0FDckUsQ0FBQyxDQUFDO0tBQ047SUFFRCxNQUFNLE1BQU0sR0FBRztRQUNYLFdBQVcsRUFBRTtZQUNULFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtTQUM3QjtRQUNELE1BQU0sRUFBRSxJQUFJO0tBQ2YsQ0FBQztJQUVGLElBQUk7UUFDQSxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbkU7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQztLQUNsRTtBQUdMLENBQUM7QUFqQ0QsMEJBaUNDO0FBSUQsTUFBTSxTQUFTLEdBQUc7SUFDZCxJQUFJLENBQUMsSUFBWTtRQUNiLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsOEJBQThCLEVBQUUsR0FBRztnQkFDbkMsNkJBQTZCLEVBQUUsR0FBRzthQUNyQztZQUNELFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBRTdCLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVk7UUFDYixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLDhCQUE4QixFQUFFLEdBQUc7Z0JBQ25DLDZCQUE2QixFQUFFLEdBQUc7YUFDckM7WUFDRCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUM3QixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0LCBDb250ZXh0IH0gZnJvbSAnYXdzLWxhbWJkYSc7XHJcbmltcG9ydCB7IFNFUyB9IGZyb20gXCJhd3Mtc2RrXCI7XHJcblxyXG5jb25zdCBzZXMgPSBuZXcgU0VTKCk7XHJcblxyXG5pbnRlcmZhY2UgRW1haWxQYXJhbSB7XHJcbiAgICB0bz86IHN0cmluZztcclxuICAgIGZyb20/OiBzdHJpbmc7XHJcbiAgICBzdWJqZWN0Pzogc3RyaW5nO1xyXG4gICAgdGV4dD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBjb250ZXh0OiBDb250ZXh0KTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiUkVRVUVTVCA9PT4+XCIsIGV2ZW50LmJvZHkpO1xyXG5cclxuICAgIGNvbnN0IHsgdG8sIGZyb20sIHN1YmplY3QsIHRleHQgfSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keXx8XCJ7fVwiKSBhcyBFbWFpbFBhcmFtO1xyXG5cclxuICAgIGlmICghdG8gfHwgIWZyb20gfHwgIXN1YmplY3QgfHwgIXRleHQpIHtcclxuICAgICAgICByZXR1cm4gUmVzcG9uc2VzLl80MDAoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAndG8sIGZyb20sIHN1YmplY3QgYW5kIHRleHQgYXJlIGFsbCByZXF1aXJlZCBpbiB0aGUgYm9keScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIERlc3RpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIFRvQWRkcmVzc2VzOiBbdG9dLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTWVzc2FnZToge1xyXG4gICAgICAgICAgICBCb2R5OiB7XHJcbiAgICAgICAgICAgICAgICBUZXh0OiB7IERhdGE6IHRleHQgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgU3ViamVjdDogeyBEYXRhOiBzdWJqZWN0IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTb3VyY2U6IGZyb20sXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgc2VzLnNlbmRFbWFpbChwYXJhbXMpLnByb21pc2UoKTtcclxuICAgICAgICByZXR1cm4gKFJlc3BvbnNlcy5fMjAwKHsgbWVzc2FnZTogJ1RoZSBlbWFpbCBoYXMgYmVlbiBzZW50JyB9KSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBzZW5kaW5nIGVtYWlsICcsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gUmVzcG9uc2VzLl80MDAoeyBtZXNzYWdlOiAnVGhlIGVtYWlsIGZhaWxlZCB0byBzZW5kJyB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcbmNvbnN0IFJlc3BvbnNlcyA9IHtcclxuICAgIF8yMDAoZGF0YTogT2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJyonLFxyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgXzQwMChkYXRhOiBPYmplY3QpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnKicsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG59OyJdfQ==