"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READER;
const recommendByFriend = async (userName) => {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    try {
        let data = await g.V().hasLabel('person').has('userName', userName).out('friend').out('recommendedRestaurant').toList();
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
exports.default = recommendByFriend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmVjb21tZW5kQnlGcmllbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRSZWNvbW1lbmRCeUZyaWVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVsQyxNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUE7QUFDcEUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUE7QUFDckMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUE7QUFLOUIsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsUUFBZSxFQUFFLEVBQUU7SUFDaEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQy9ELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7SUFDekIsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMxQyxJQUFJO1FBQ0YsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3RILElBQUksS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFBO1FBRW5CLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3BCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDekQsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUM1QixPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUNOLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtZQUNkLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDakI7UUFFRCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDVixPQUFPLEtBQUssQ0FBQTtLQUNiO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN6QixPQUFPLElBQUksQ0FBQTtLQUNkO0FBQ0wsQ0FBQyxDQUFBO0FBSUQsa0JBQWUsaUJBQWlCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBncmVtbGluID0gcmVxdWlyZSgnZ3JlbWxpbicpXHJcblxyXG5jb25zdCBEcml2ZXJSZW1vdGVDb25uZWN0aW9uID0gZ3JlbWxpbi5kcml2ZXIuRHJpdmVyUmVtb3RlQ29ubmVjdGlvblxyXG5jb25zdCBHcmFwaCA9IGdyZW1saW4uc3RydWN0dXJlLkdyYXBoXHJcbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52LlJFQURFUlxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgcmVjb21tZW5kQnlGcmllbmQgPSBhc3luYyAodXNlck5hbWU6U3RyaW5nKSA9PiB7XHJcbiAgICBsZXQgZGMgPSBuZXcgRHJpdmVyUmVtb3RlQ29ubmVjdGlvbihgd3NzOi8vJHt1cml9L2dyZW1saW5gLCB7fSlcclxuICAgIGNvbnN0IGdyYXBoID0gbmV3IEdyYXBoKClcclxuICAgIGNvbnN0IGcgPSBncmFwaC50cmF2ZXJzYWwoKS53aXRoUmVtb3RlKGRjKVxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBnLlYoKS5oYXNMYWJlbCgncGVyc29uJykuaGFzKCd1c2VyTmFtZScsdXNlck5hbWUpLm91dCgnZnJpZW5kJykub3V0KCdyZWNvbW1lbmRlZFJlc3RhdXJhbnQnKS50b0xpc3QoKVxyXG4gICAgICBsZXQgcG9zdHMgPSBBcnJheSgpXHJcblxyXG4gICAgICBmb3IgKGNvbnN0IHYgb2YgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IF9wcm9wZXJ0aWVzID0gYXdhaXQgZy5WKHYuaWQpLnByb3BlcnRpZXMoKS50b0xpc3QoKVxyXG4gICAgICAgIGxldCBwb3N0ID0gX3Byb3BlcnRpZXMucmVkdWNlKChhY2MsIG5leHQpID0+IHtcclxuICAgICAgICAgIGFjY1tuZXh0LmxhYmVsXSA9IG5leHQudmFsdWVcclxuICAgICAgICAgIHJldHVybiBhY2NcclxuICAgICAgICB9LCB7fSlcclxuICAgICAgICBwb3N0LmlkID0gdi5pZFxyXG4gICAgICAgIHBvc3RzLnB1c2gocG9zdClcclxuICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgIGRjLmNsb3NlKClcclxuICAgICAgcmV0dXJuIHBvc3RzXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRVJST1InLCBlcnIpXHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWNvbW1lbmRCeUZyaWVuZCJdfQ==