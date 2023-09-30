"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.about = exports.recommendRestaurant = exports.addReview = exports.createFriendShip = exports.addRestaurant = exports.addReviews = exports.addUser = void 0;
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITER;
//Verices
async function addUser(user) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    await g.addV('person').property('userName', user.userName).next();
    dc.close();
    return user;
}
exports.addUser = addUser;
async function addReviews(review) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    //for order we are using date and time fucction
    const date = new Date();
    const time = date.getTime();
    await g.addV('review').property('text', review.text).property('rating', review.rating).property('personId', review.personId).property("restaurantId", review.restaurantId).property('restaurantName', review.restaurantName).property('city', review.city).property('date', date).property('time', time).next();
    dc.close();
    return review;
}
exports.addReviews = addReviews;
async function addRestaurant(restaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    await g.addV('restaurant').property('name', restaurant.name).property('city', restaurant.city).property('cuisine', restaurant.cuisine).property('rating', restaurant.rating).next();
    dc.close();
    return restaurant;
}
exports.addRestaurant = addRestaurant;
//Edges
async function createFriendShip(friendship) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    await g.addE('friend').from_(g.V().hasLabel('person').has('userName', friendship.friendFrom)).to(g.V().hasLabel('person').has('userName', friendship.friendWith)).elementMap().toList();
    dc.close();
    return friendship;
}
exports.createFriendShip = createFriendShip;
async function addReview(user) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    await g.addE('addReview').from_(g.V().hasLabel('person').has('userName', user.userName)).to(g.V().hasLabel('review')).next();
    dc.close();
    return user;
}
exports.addReview = addReview;
async function recommendRestaurant(user, restaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    await g.addE('recommendedRestaurant').from_(g.V().hasLabel('person').has('userName', user.userName)).to(g.V().hasLabel('restaurant').has('name', restaurant.name)).elementMap().toList();
    dc.close();
    return restaurant;
}
exports.recommendRestaurant = recommendRestaurant;
async function about(restaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);
    await g.addE('about').from_(g.V().hasLabel('review')).to(g.V().hasLabel('restaurant').has('name', restaurant.name)).elementMap().toList();
    dc.close();
    return restaurant;
}
exports.about = about;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtdXRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7QUFpQ2xDLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQTtBQUNwRSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQTtBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQTtBQUc5QixTQUFTO0FBQ1QsS0FBSyxVQUFVLE9BQU8sQ0FBQyxJQUFVO0lBQzdCLElBQUksRUFBRSxHQUFHLElBQUksc0JBQXNCLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFMUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2hFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNWLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQXFFUywwQkFBTztBQW5FakIsS0FBSyxVQUFVLFVBQVUsQ0FBQyxNQUFjO0lBQ3BDLElBQUksRUFBRSxHQUFHLElBQUksc0JBQXNCLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUMvRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FB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LFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDdEwsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1YsT0FBTyxVQUFVLENBQUE7QUFDckIsQ0FBQztBQWMwRSxrREFBbUI7QUFaOUYsS0FBSyxVQUFVLEtBQUssQ0FBQyxVQUFxQjtJQUN0QyxJQUFJLEVBQUUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLFNBQVMsR0FBRyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtJQUN6QixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDeEksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1YsT0FBTyxVQUFVLENBQUE7QUFDckIsQ0FBQztBQUk4RixzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdyZW1saW4gPSByZXF1aXJlKCdncmVtbGluJylcclxuLy8gaW1wb3J0IFVzZXIgZnJvbSAnLi9Qb3N0J1xyXG5cclxuXHJcbnR5cGUgVXNlcj17XHJcbiAgICB1c2VyTmFtZTpTdHJpbmc7XHJcbiAgICBpZDpTdHJpbmc7XHJcbn1cclxudHlwZSBSZXZpZXc9e1xyXG4gICAgaWQ6U3RyaW5nO1xyXG4gICAgcmVzdGF1cmFudE5hbWU6U3RyaW5nO1xyXG4gICAgdGV4dDogU3RyaW5nO1xyXG5cdHJhdGluZzogbnVtYmVyO1xyXG4gICAgY2l0eTpTdHJpbmc7XHJcbiAgICByZXN0YXVyYW50SWQ6U3RyaW5nO1xyXG4gICAgcGVyc29uSWQ6U3RyaW5nO1xyXG4gICAgZGF0ZTpzdHJpbmc7XHJcbn1cclxudHlwZSBSZXN0YXVyYW50PXtcclxuICAgIG5hbWU6IFN0cmluZztcclxuXHRjaXR5OiBTdHJpbmc7XHJcbiAgICByYXRpbmc6IG51bWJlcjtcclxuXHRjdWlzaW5lOiBTdHJpbmc7XHJcblx0aWQ6IFN0cmluZztcclxufVxyXG50eXBlIEZyaWVuZHNoaXA9e1xyXG4gICAgaWQ6U3RyaW5nO1xyXG4gICAgZnJpZW5kRnJvbTpTdHJpbmc7XHJcbiAgICBmcmllbmRXaXRoOlN0cmluZztcclxuICB9XHJcblxyXG5cclxuXHJcbmNvbnN0IERyaXZlclJlbW90ZUNvbm5lY3Rpb24gPSBncmVtbGluLmRyaXZlci5Ecml2ZXJSZW1vdGVDb25uZWN0aW9uXHJcbmNvbnN0IEdyYXBoID0gZ3JlbWxpbi5zdHJ1Y3R1cmUuR3JhcGhcclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuV1JJVEVSXHJcblxyXG5cclxuLy9WZXJpY2VzXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZFVzZXIodXNlcjogVXNlcikge1xyXG4gICAgbGV0IGRjID0gbmV3IERyaXZlclJlbW90ZUNvbm5lY3Rpb24oYHdzczovLyR7dXJpfS9ncmVtbGluYCwge30pXHJcbiAgICBjb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpXHJcbiAgICBjb25zdCBnID0gZ3JhcGgudHJhdmVyc2FsKCkud2l0aFJlbW90ZShkYylcclxuXHJcbiAgICBhd2FpdCBnLmFkZFYoJ3BlcnNvbicpLnByb3BlcnR5KCd1c2VyTmFtZScsdXNlci51c2VyTmFtZSkubmV4dCgpXHJcbiAgICBkYy5jbG9zZSgpXHJcbiAgICByZXR1cm4gdXNlclxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhZGRSZXZpZXdzKHJldmlldzogUmV2aWV3KSB7XHJcbiAgICBsZXQgZGMgPSBuZXcgRHJpdmVyUmVtb3RlQ29ubmVjdGlvbihgd3NzOi8vJHt1cml9L2dyZW1saW5gLCB7fSlcclxuICAgIGNvbnN0IGdyYXBoID0gbmV3IEdyYXBoKClcclxuICAgIGNvbnN0IGcgPSBncmFwaC50cmF2ZXJzYWwoKS53aXRoUmVtb3RlKGRjKVxyXG4gICAgLy9mb3Igb3JkZXIgd2UgYXJlIHVzaW5nIGRhdGUgYW5kIHRpbWUgZnVjY3Rpb25cclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgdGltZSA9IGRhdGUuZ2V0VGltZSgpO1xyXG5cclxuICAgIGF3YWl0IGcuYWRkVigncmV2aWV3JykucHJvcGVydHkoJ3RleHQnLCByZXZpZXcudGV4dCkucHJvcGVydHkoJ3JhdGluZycgLCByZXZpZXcucmF0aW5nKS5wcm9wZXJ0eSgncGVyc29uSWQnLHJldmlldy5wZXJzb25JZCkucHJvcGVydHkoXCJyZXN0YXVyYW50SWRcIiwgcmV2aWV3LnJlc3RhdXJhbnRJZCkucHJvcGVydHkoJ3Jlc3RhdXJhbnROYW1lJyxyZXZpZXcucmVzdGF1cmFudE5hbWUpLnByb3BlcnR5KCdjaXR5JywgcmV2aWV3LmNpdHkpLnByb3BlcnR5KCdkYXRlJyxkYXRlKS5wcm9wZXJ0eSgndGltZScsdGltZSkubmV4dCgpXHJcbiAgICBkYy5jbG9zZSgpXHJcbiAgICByZXR1cm4gcmV2aWV3XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZFJlc3RhdXJhbnQocmVzdGF1cmFudDogUmVzdGF1cmFudCkge1xyXG4gICAgbGV0IGRjID0gbmV3IERyaXZlclJlbW90ZUNvbm5lY3Rpb24oYHdzczovLyR7dXJpfS9ncmVtbGluYCwge30pXHJcbiAgICBjb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpXHJcbiAgICBjb25zdCBnID0gZ3JhcGgudHJhdmVyc2FsKCkud2l0aFJlbW90ZShkYylcclxuXHJcbiAgICBhd2FpdCBnLmFkZFYoJ3Jlc3RhdXJhbnQnKS5wcm9wZXJ0eSgnbmFtZScscmVzdGF1cmFudC5uYW1lKS5wcm9wZXJ0eSgnY2l0eScscmVzdGF1cmFudC5jaXR5KS5wcm9wZXJ0eSgnY3Vpc2luZScscmVzdGF1cmFudC5jdWlzaW5lKS5wcm9wZXJ0eSgncmF0aW5nJywgcmVzdGF1cmFudC5yYXRpbmcpLm5leHQoKVxyXG4gICAgZGMuY2xvc2UoKVxyXG4gICAgcmV0dXJuIHJlc3RhdXJhbnRcclxufVxyXG5cclxuLy9FZGdlc1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRnJpZW5kU2hpcChmcmllbmRzaGlwOkZyaWVuZHNoaXApIHtcclxuICAgIGxldCBkYyA9IG5ldyBEcml2ZXJSZW1vdGVDb25uZWN0aW9uKGB3c3M6Ly8ke3VyaX0vZ3JlbWxpbmAsIHt9KVxyXG4gICAgY29uc3QgZ3JhcGggPSBuZXcgR3JhcGgoKVxyXG4gICAgY29uc3QgZyA9IGdyYXBoLnRyYXZlcnNhbCgpLndpdGhSZW1vdGUoZGMpXHJcblxyXG4gICAgYXdhaXQgZy5hZGRFKCdmcmllbmQnKS5mcm9tXyhnLlYoKS5oYXNMYWJlbCgncGVyc29uJykuaGFzKCd1c2VyTmFtZScsZnJpZW5kc2hpcC5mcmllbmRGcm9tKSkudG8oZy5WKCkuaGFzTGFiZWwoJ3BlcnNvbicpLmhhcygndXNlck5hbWUnLGZyaWVuZHNoaXAuZnJpZW5kV2l0aCkpLmVsZW1lbnRNYXAoKS50b0xpc3QoKVxyXG4gICAgZGMuY2xvc2UoKVxyXG4gICAgcmV0dXJuIGZyaWVuZHNoaXBcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gYWRkUmV2aWV3KHVzZXI6VXNlcikge1xyXG4gICAgbGV0IGRjID0gbmV3IERyaXZlclJlbW90ZUNvbm5lY3Rpb24oYHdzczovLyR7dXJpfS9ncmVtbGluYCwge30pXHJcbiAgICBjb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpXHJcbiAgICBjb25zdCBnID0gZ3JhcGgudHJhdmVyc2FsKCkud2l0aFJlbW90ZShkYylcclxuXHJcbiAgICBhd2FpdCBnLmFkZEUoJ2FkZFJldmlldycpLmZyb21fKGcuVigpLmhhc0xhYmVsKCdwZXJzb24nKS5oYXMoJ3VzZXJOYW1lJyx1c2VyLnVzZXJOYW1lKSkudG8oZy5WKCkuaGFzTGFiZWwoJ3JldmlldycpKS5uZXh0KClcclxuICAgIGRjLmNsb3NlKClcclxuICAgIHJldHVybiB1c2VyXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlY29tbWVuZFJlc3RhdXJhbnQodXNlcjpVc2VyLHJlc3RhdXJhbnQ6UmVzdGF1cmFudCkge1xyXG4gICAgbGV0IGRjID0gbmV3IERyaXZlclJlbW90ZUNvbm5lY3Rpb24oYHdzczovLyR7dXJpfS9ncmVtbGluYCwge30pXHJcbiAgICBjb25zdCBncmFwaCA9IG5ldyBHcmFwaCgpXHJcbiAgICBjb25zdCBnID0gZ3JhcGgudHJhdmVyc2FsKCkud2l0aFJlbW90ZShkYylcclxuXHJcbiAgICBhd2FpdCBnLmFkZEUoJ3JlY29tbWVuZGVkUmVzdGF1cmFudCcpLmZyb21fKGcuVigpLmhhc0xhYmVsKCdwZXJzb24nKS5oYXMoJ3VzZXJOYW1lJyx1c2VyLnVzZXJOYW1lKSkudG8oZy5WKCkuaGFzTGFiZWwoJ3Jlc3RhdXJhbnQnKS5oYXMoJ25hbWUnLHJlc3RhdXJhbnQubmFtZSkpLmVsZW1lbnRNYXAoKS50b0xpc3QoKVxyXG4gICAgZGMuY2xvc2UoKVxyXG4gICAgcmV0dXJuIHJlc3RhdXJhbnRcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gYWJvdXQocmVzdGF1cmFudDpSZXN0YXVyYW50KSB7XHJcbiAgICBsZXQgZGMgPSBuZXcgRHJpdmVyUmVtb3RlQ29ubmVjdGlvbihgd3NzOi8vJHt1cml9L2dyZW1saW5gLCB7fSlcclxuICAgIGNvbnN0IGdyYXBoID0gbmV3IEdyYXBoKClcclxuICAgIGNvbnN0IGcgPSBncmFwaC50cmF2ZXJzYWwoKS53aXRoUmVtb3RlKGRjKVxyXG5cclxuICAgIGF3YWl0IGcuYWRkRSgnYWJvdXQnKS5mcm9tXyhnLlYoKS5oYXNMYWJlbCgncmV2aWV3JykpLnRvKGcuVigpLmhhc0xhYmVsKCdyZXN0YXVyYW50JykuaGFzKCduYW1lJyxyZXN0YXVyYW50Lm5hbWUpKS5lbGVtZW50TWFwKCkudG9MaXN0KClcclxuICAgIGRjLmNsb3NlKClcclxuICAgIHJldHVybiByZXN0YXVyYW50XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0ICB7IGFkZFVzZXIsIGFkZFJldmlld3MsIGFkZFJlc3RhdXJhbnQsIGNyZWF0ZUZyaWVuZFNoaXAsIGFkZFJldmlldywgcmVjb21tZW5kUmVzdGF1cmFudCxhYm91dH07Il19