  
import {addUser, addReviews, addRestaurant, createFriendShip, addReview, recommendRestaurant, about} from './mutation';
import userFriendList from './queries/getUserFriendList';
import getReview from './queries/getReview';
import getRestaurant from './queries/getRestaurant';
import friendofFriend from './queries/getFriendOfFriend'
import recommendByFriend from './queries/getRecommendByFriend'
import restaurantRatedByFriend from './queries/getRestaurantRatedByFriend'
import restaurantBycuisine from './queries/getRestaurantBycuisine'
import newestReview from './queries/getNewestReview'
import nearestHRRestaurant from './queries/getNearestHRRestaurant'
import pastXDays from './queries/getPastXdays'

// import User from './Post';

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
  cuisine: String;
  rating: number;
  id: String;
}
type Friendship={
  id:String;
  friendFrom:String;
  friendWith:String;
}


type AppSyncEvent = {
  info: {
    fieldName: string
  },
  arguments: {
    user: User
    userName:String
    review: Review
    restaurant:Restaurant
    friendship:Friendship
    cuisine: String;
    restaurantName:String;
    city:String;
    date:string;
  }
}

exports.handler = async (event:AppSyncEvent) => {
  switch (event.info.fieldName) {
    
    //Vertices
    case "addUser":
      return await addUser(event.arguments.user);
    case "addReviews":
      return await addReviews(event.arguments.review);
    case "addRestaurant":
      return await addRestaurant(event.arguments.restaurant);
    
    //Edges
    case "createFriendShip":
      return await createFriendShip(event.arguments.friendship);
    case "addReview":
      return await addReview(event.arguments.user);
    case "recommendRestaurant":
       return await recommendRestaurant(event.arguments.user,event.arguments.restaurant);
    case "about":
      return await about(event.arguments.restaurant);
    
    //Query
    case "userFriendList":
      return await userFriendList(event.arguments.userName);
    case "friendofFriend":
      return await friendofFriend(event.arguments.userName);
    case "recommendByFriend":
      return await recommendByFriend(event.arguments.userName);
    case "restaurantRatedByFriend":
      return await restaurantRatedByFriend(event.arguments.userName);
    case "restaurantBycuisine":
      return await restaurantBycuisine(event.arguments.cuisine);
    case "newestReview":
      return await newestReview(event.arguments.restaurantName);
    case "nearestHRRestaurant":
      return await nearestHRRestaurant(event.arguments.city);
    // case "pastXDays":
    //   return await pastXDays(event.arguments.userName, event.arguments.date);

    //test queries
    case "getReview":
      return await getReview();
    case "getRestaurant":
      return await getRestaurant();
    default:
      return null;
  }
}