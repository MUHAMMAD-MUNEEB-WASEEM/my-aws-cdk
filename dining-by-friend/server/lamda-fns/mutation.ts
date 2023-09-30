const gremlin = require('gremlin')
// import User from './Post'


type User={
    userName:String;
    id:String;
}
type Review={
    id:String;
    restaurantName:String;
    text: String;
	rating: number;
    city:String;
    restaurantId:String;
    personId:String;
    date:string;
}
type Restaurant={
    name: String;
	city: String;
    rating: number;
	cuisine: String;
	id: String;
}
type Friendship={
    id:String;
    friendFrom:String;
    friendWith:String;
  }



const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
const Graph = gremlin.structure.Graph
const uri = process.env.WRITER


//Verices
async function addUser(user: User) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addV('person').property('userName',user.userName).next()
    dc.close()
    return user
}

async function addReviews(review: Review) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)
    //for order we are using date and time fucction
    const date = new Date();
    const time = date.getTime();

    await g.addV('review').property('text', review.text).property('rating' , review.rating).property('personId',review.personId).property("restaurantId", review.restaurantId).property('restaurantName',review.restaurantName).property('city', review.city).property('date',date).property('time',time).next()
    dc.close()
    return review
}

async function addRestaurant(restaurant: Restaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addV('restaurant').property('name',restaurant.name).property('city',restaurant.city).property('cuisine',restaurant.cuisine).property('rating', restaurant.rating).next()
    dc.close()
    return restaurant
}

//Edges

async function createFriendShip(friendship:Friendship) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addE('friend').from_(g.V().hasLabel('person').has('userName',friendship.friendFrom)).to(g.V().hasLabel('person').has('userName',friendship.friendWith)).elementMap().toList()
    dc.close()
    return friendship
}

async function addReview(user:User) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addE('addReview').from_(g.V().hasLabel('person').has('userName',user.userName)).to(g.V().hasLabel('review')).next()
    dc.close()
    return user
}

async function recommendRestaurant(user:User,restaurant:Restaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addE('recommendedRestaurant').from_(g.V().hasLabel('person').has('userName',user.userName)).to(g.V().hasLabel('restaurant').has('name',restaurant.name)).elementMap().toList()
    dc.close()
    return restaurant
}

async function about(restaurant:Restaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addE('about').from_(g.V().hasLabel('review')).to(g.V().hasLabel('restaurant').has('name',restaurant.name)).elementMap().toList()
    dc.close()
    return restaurant
}



export  { addUser, addReviews, addRestaurant, createFriendShip, addReview, recommendRestaurant,about};