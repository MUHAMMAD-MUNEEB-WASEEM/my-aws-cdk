declare type User = {
    userName: String;
    id: String;
};
declare type Review = {
    id: String;
    restaurantName: String;
    text: String;
    rating: number;
    city: String;
    restaurantId: String;
    personId: String;
    date: string;
};
declare type Restaurant = {
    name: String;
    city: String;
    rating: number;
    cuisine: String;
    id: String;
};
declare type Friendship = {
    id: String;
    friendFrom: String;
    friendWith: String;
};
declare function addUser(user: User): Promise<User>;
declare function addReviews(review: Review): Promise<Review>;
declare function addRestaurant(restaurant: Restaurant): Promise<Restaurant>;
declare function createFriendShip(friendship: Friendship): Promise<Friendship>;
declare function addReview(user: User): Promise<User>;
declare function recommendRestaurant(user: User, restaurant: Restaurant): Promise<Restaurant>;
declare function about(restaurant: Restaurant): Promise<Restaurant>;
export { addUser, addReviews, addRestaurant, createFriendShip, addReview, recommendRestaurant, about };
