"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READER;
const getReview = async () => {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    try {
        let data = await g.V().hasLabel('review').toList();
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
exports.default = getReview;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0UmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRWxDLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQTtBQUNwRSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQTtBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQTtBQUk5QixNQUFNLFNBQVMsR0FBRyxLQUFLLElBQUksRUFBRTtJQUMzQixJQUFJLEVBQUUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLFNBQVMsR0FBRyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtJQUN6QixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzFDLElBQUk7UUFDRixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDbEQsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUE7UUFFbkIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDcEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUN6RCxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7Z0JBQzVCLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNqQjtRQUVELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNWLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDSCxDQUFDLENBQUE7QUFFRCxrQkFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBncmVtbGluID0gcmVxdWlyZSgnZ3JlbWxpbicpXHJcblxyXG5jb25zdCBEcml2ZXJSZW1vdGVDb25uZWN0aW9uID0gZ3JlbWxpbi5kcml2ZXIuRHJpdmVyUmVtb3RlQ29ubmVjdGlvblxyXG5jb25zdCBHcmFwaCA9IGdyZW1saW4uc3RydWN0dXJlLkdyYXBoXHJcbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52LlJFQURFUlxyXG5cclxuXHJcblxyXG5jb25zdCBnZXRSZXZpZXcgPSBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IGRjID0gbmV3IERyaXZlclJlbW90ZUNvbm5lY3Rpb24oYHdzczovLyR7dXJpfS9ncmVtbGluYCwge30pXHJcbiAgY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKVxyXG4gIGNvbnN0IGcgPSBncmFwaC50cmF2ZXJzYWwoKS53aXRoUmVtb3RlKGRjKVxyXG4gIHRyeSB7XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGcuVigpLmhhc0xhYmVsKCdyZXZpZXcnKS50b0xpc3QoKVxyXG4gICAgbGV0IHBvc3RzID0gQXJyYXkoKVxyXG5cclxuICAgIGZvciAoY29uc3QgdiBvZiBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IF9wcm9wZXJ0aWVzID0gYXdhaXQgZy5WKHYuaWQpLnByb3BlcnRpZXMoKS50b0xpc3QoKVxyXG4gICAgICBsZXQgcG9zdCA9IF9wcm9wZXJ0aWVzLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgYWNjW25leHQubGFiZWxdID0gbmV4dC52YWx1ZVxyXG4gICAgICAgIHJldHVybiBhY2NcclxuICAgICAgfSwge30pXHJcbiAgICAgIHBvc3QuaWQgPSB2LmlkXHJcbiAgICAgIHBvc3RzLnB1c2gocG9zdClcclxuICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgIGRjLmNsb3NlKClcclxuICAgIHJldHVybiBwb3N0c1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZygnRVJST1InLCBlcnIpXHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRSZXZpZXc7Il19