"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READER;
const restaurantRatedByFriend = async (userName) => {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    try {
        let data = await g.V().hasLabel('person').has('userName', userName).out('friend').out('addReview').out('about').toList();
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
exports.default = restaurantRatedByFriend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmVzdGF1cmFudFJhdGVkQnlGcmllbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRSZXN0YXVyYW50UmF0ZWRCeUZyaWVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUVsQyxNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUE7QUFDcEUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUE7QUFDckMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUE7QUFLOUIsTUFBTSx1QkFBdUIsR0FBRyxLQUFLLEVBQUUsUUFBZSxFQUFFLEVBQUU7SUFDdEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQy9ELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7SUFDekIsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMxQyxJQUFJO1FBQ0YsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDeEgsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUE7UUFFbkIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDcEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUN6RCxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7Z0JBQzVCLE9BQU8sR0FBRyxDQUFBO1lBQ1osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNqQjtRQUVELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNWLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDTCxDQUFDLENBQUE7QUFJRCxrQkFBZSx1QkFBdUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdyZW1saW4gPSByZXF1aXJlKCdncmVtbGluJylcclxuXHJcbmNvbnN0IERyaXZlclJlbW90ZUNvbm5lY3Rpb24gPSBncmVtbGluLmRyaXZlci5Ecml2ZXJSZW1vdGVDb25uZWN0aW9uXHJcbmNvbnN0IEdyYXBoID0gZ3JlbWxpbi5zdHJ1Y3R1cmUuR3JhcGhcclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuUkVBREVSXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCByZXN0YXVyYW50UmF0ZWRCeUZyaWVuZCA9IGFzeW5jICh1c2VyTmFtZTpTdHJpbmcpID0+IHtcclxuICAgIGxldCBkYyA9IG5ldyBEcml2ZXJSZW1vdGVDb25uZWN0aW9uKGB3c3M6Ly8ke3VyaX0vZ3JlbWxpbmAsIHt9KVxyXG4gICAgY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKVxyXG4gICAgY29uc3QgZyA9IGdyYXBoLnRyYXZlcnNhbCgpLndpdGhSZW1vdGUoZGMpXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGcuVigpLmhhc0xhYmVsKCdwZXJzb24nKS5oYXMoJ3VzZXJOYW1lJywgdXNlck5hbWUpLm91dCgnZnJpZW5kJykub3V0KCdhZGRSZXZpZXcnKS5vdXQoJ2Fib3V0JykudG9MaXN0KClcclxuICAgICAgbGV0IHBvc3RzID0gQXJyYXkoKVxyXG5cclxuICAgICAgZm9yIChjb25zdCB2IG9mIGRhdGEpIHtcclxuICAgICAgICBjb25zdCBfcHJvcGVydGllcyA9IGF3YWl0IGcuVih2LmlkKS5wcm9wZXJ0aWVzKCkudG9MaXN0KClcclxuICAgICAgICBsZXQgcG9zdCA9IF9wcm9wZXJ0aWVzLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgICBhY2NbbmV4dC5sYWJlbF0gPSBuZXh0LnZhbHVlXHJcbiAgICAgICAgICByZXR1cm4gYWNjXHJcbiAgICAgICAgfSwge30pXHJcbiAgICAgICAgcG9zdC5pZCA9IHYuaWRcclxuICAgICAgICBwb3N0cy5wdXNoKHBvc3QpXHJcbiAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICBkYy5jbG9zZSgpXHJcbiAgICAgIHJldHVybiBwb3N0c1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SJywgZXJyKVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVzdGF1cmFudFJhdGVkQnlGcmllbmQiXX0=