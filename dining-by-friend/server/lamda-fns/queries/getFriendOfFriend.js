"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READER;
const friendofFriend = async (userName) => {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    try {
        let data = await g.V().hasLabel('person').has('userName', userName).out('friend').out('friend').toList();
        let posts = Array();
        for (const v of data) {
            const _properties = await g.V(v.id).properties().toList();
            let post = _properties.reduce((acc, next) => {
                acc[next.label] = next.value;
                return acc;
            }, {});
            post.id = v.id;
            posts.push(post);
        }
        dc.close();
        return posts;
    }
    catch (err) {
        console.log('ERROR', err);
        return null;
    }
};
exports.default = friendofFriend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RnJpZW5kT2ZGcmllbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRGcmllbmRPZkZyaWVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVsQyxNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUE7QUFDcEUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUE7QUFDckMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUE7QUFLOUIsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLFFBQWUsRUFBRSxFQUFFO0lBQzdDLElBQUksRUFBRSxHQUFHLElBQUksc0JBQXNCLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDMUMsSUFBSTtRQUNGLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdkcsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUE7UUFFbkIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDcEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUN6RCxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7Z0JBQzVCLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNqQjtRQUVELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNWLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDTCxDQUFDLENBQUE7QUFJRCxrQkFBZSxjQUFjLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBncmVtbGluID0gcmVxdWlyZSgnZ3JlbWxpbicpXHJcblxyXG5jb25zdCBEcml2ZXJSZW1vdGVDb25uZWN0aW9uID0gZ3JlbWxpbi5kcml2ZXIuRHJpdmVyUmVtb3RlQ29ubmVjdGlvblxyXG5jb25zdCBHcmFwaCA9IGdyZW1saW4uc3RydWN0dXJlLkdyYXBoXHJcbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52LlJFQURFUlxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgZnJpZW5kb2ZGcmllbmQgPSBhc3luYyAodXNlck5hbWU6U3RyaW5nKSA9PiB7XHJcbiAgICBsZXQgZGMgPSBuZXcgRHJpdmVyUmVtb3RlQ29ubmVjdGlvbihgd3NzOi8vJHt1cml9L2dyZW1saW5gLCB7fSlcclxuICAgIGNvbnN0IGdyYXBoID0gbmV3IEdyYXBoKClcclxuICAgIGNvbnN0IGcgPSBncmFwaC50cmF2ZXJzYWwoKS53aXRoUmVtb3RlKGRjKVxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBnLlYoKS5oYXNMYWJlbCgncGVyc29uJykuaGFzKCd1c2VyTmFtZScsdXNlck5hbWUpLm91dCgnZnJpZW5kJykub3V0KCdmcmllbmQnKS50b0xpc3QoKVxyXG4gICAgICBsZXQgcG9zdHMgPSBBcnJheSgpXHJcblxyXG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IF9wcm9wZXJ0aWVzID0gYXdhaXQgZy5WKHYuaWQpLnByb3BlcnRpZXMoKS50b0xpc3QoKVxyXG4gICAgICAgIGxldCBwb3N0ID0gX3Byb3BlcnRpZXMucmVkdWNlKChhY2MsIG5leHQpID0+IHtcclxuICAgICAgICAgIGFjY1tuZXh0LmxhYmVsXSA9IG5leHQudmFsdWVcclxuICAgICAgICAgIHJldHVybiBhY2NcclxuICAgICAgICB9LCB7fSlcclxuICAgICAgICBwb3N0LmlkID0gdi5pZFxyXG4gICAgICAgIHBvc3RzLnB1c2gocG9zdClcclxuICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgIGRjLmNsb3NlKClcclxuICAgICAgcmV0dXJuIHBvc3RzXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRVJST1InLCBlcnIpXHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmcmllbmRvZkZyaWVuZCJdfQ==