## User Authentication and Profile

#### User Signups
User Signups with email
User Signups with Github

#### User Type
User has default user_type type NORMAL
admin user type can be added manually by panacloud team.

#### User Roles
User has Roles
ROLES Vertices to be created at deployment
DEVELOPER
ENTREPRENEUR
INVESTOR 
EMPLOYER
APP_USER STAFF 

#### User Profile

Traverse from Normal to Profile and then profile to role to check the specific role.
To every role of a user a profile is attached.
User can publish or unpublish the profile and it will be connected to static vertices created by admin.
This profile has a one to many relation with Profile Entities like a profile has many qualifications, employment history, skillset.
These skillsets are connected with a static vertices that are created by admin. Like Javascript, React.

## User and Company

#### Company
User can create a company.
Company can have many developers.
Comapny can have otherEmployees other than developer.
Company can partner with other company or with a user.

#### Follows

User can follow company and company can follow user.
Based on the isPrivte property of user and company.
If the `isPrivate is true`, one of the entity can send a follow request to another creating an edge request between both. If the request is accepted we will replace the request edge with follows edge and if it is rejected request edge will be deleted.
if `isPrivate is false` then a follows edge will be created from one entity to other.

#### Credit Cards && Accounts
User or Company can have multiple Credit Cards and Payment Accounts added from which one is default.

## Social Platform

#### Posts
User and company, both can posts.

#### Comment
User and company, both can comment on a post.

#### Like
User and company, both can like a post and comment.

## API Store

#### Develop API 

User or company can create an API. API is of two types one is Open API and other is GraphQL API.
Has tree static statuses created by admin.
PublicAPI
PrivateAPI
UnderdevelopmentAPI

With publicAPI we will save the date of API publish. for that create an edge with `api_publish_month` with property `day` and that edge will be connected to Month Vertex and the month Vertex is directed to Year vertex.

This model will help us in easy filtering.

#### Project Team

An Api can have a Team of persons who are developing that API.
owner of the API can create a team and add users to it with the same requesting feature that we are using in follows.

#### Subscribe API

User or company can subscribe the API
Subscription can be active or inactive.

#### Subscription Bill

One subscription can have multiple bills.
Bills can only be genrated if subscription is active.
Bills have multiple BillLineItem which will be extracted from timestream database.

Each Bill is for a particular month and year. for bills filtering.

