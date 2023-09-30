Feature: SOCIAL MEDIA MUTATIONS

  Background:

    * url API_URL
    # And header x-api-key = API_KEY
    And header Authorization = ACCESS_TOKEN
    * def jsonData = read('../../../data.json')
    * def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}
    * def entity = {city: '#? _ == "karachi" || _ == ""', country: '#? _ == "pakistan" || _ == ""', id: '#(jsonData.entity.userId)', picture_url: "", profileStatus: '#? _ == "UNPUBLISHED" || _ == "PUBLISHED"', total_followers: "#number"}
    * def followEntity = {city: '#? _ == "karachi" || _ == ""', country: '#? _ == "pakistan" || _ == ""', id:'#(jsonData.followEntity.id)', picture_url: "", profileStatus: '#? _ == "UNPUBLISHED" || _ == "PUBLISHED"', total_followers: "#number"}

Scenario: "follow entity"

* text mutation = 
   """mutation followEntity($input: followEntityInput!) {
  followEntity(input: $input) {
    entity {
      id
      city
      country
      picture_url
      profileStatus
      total_followers
    }
    followEntity {
      city
      country
      id
      picture_url
      profileStatus
      total_followers
    }
  }
}"""

  * def variables = { input : {entityId:'#(entity.userId)' , followEntityId: '#(followEntity.id)'}}
  And request { query: '#(mutation)' , variables:'#(variables)' }
  When method POST
  * match karate.range(200, 210) contains responseStatus
  * print response
  * print jsonData.entity.name 
  * match responseType == 'json'  
  * def data = response.data
  * print data
  * match data.followEntity.followEntity == followEntity
  * match data.followEntity.entity == entity

Scenario: "unfollow an entity"

* text mutation =
"""mutation unFollowEntity($input:unFollowEntityInput!) {
  unFollowEntity(input: $input){
    entity {
      city
      country
      id
      picture_url
      profileStatus
      total_followers
    }
    unFollowEntity {
      city
      country
      id
      picture_url
      profileStatus
      total_followers
    }
  }
}"""

  * def variables = { input : {entityId:'#(entity.id)' , unFollowEntityId: '#(followEntity.id)'}}
  And request { query: '#(mutation)' , variables:'#(variables)' }
  When method POST
  * print jsonData.entity.name 
  * match karate.range(200, 210) contains responseStatus
  * print response
  * match responseType == 'json'  
  * def data = response.data
  * print data
  * match data.unFollowEntity.unFollowEntity == followEntity
  * match data.unFollowEntity.entity == entity


Scenario: "publish Social Media post"

* text mutation = 
"""mutation publishSocialMediaPost($input:SocialMediaPostInput!) {
  publishSocialMediaPost(input:$input) {
    id
    createdAt
    imageUrl
    text
    numOfLikes
    latestComments {
      id
      text
      createdAt
      postId
      by {
        id
        picture_url
      }
    }
    by {
      id
      picture_url
    }
    totalComments
  }
}"""

  And request { query: '#(mutation)' , variables: { input : { by: '#(jsonData.post.id)' , text: '#(jsonData.post.text)' , imageUrl: '#(jsonData.post.imageUrl)'}}}
  When method POST
  * match karate.range(200, 210) contains responseStatus
  * print response
  * match responseType == 'json'  
  * def data = response.data.publishSocialMediaPost
  * print data
  * def resultObj = { id : '#uuid' , createdAt:"#string" , imageUrl:'#(jsonData.post.imageUrl)',text : '#(jsonData.post.text)' , numOfLikes:"#number" , latestComments:'#[]' , by : {id:'#(jsonData.post.id)' , picture_url:"#string"} , totalComments:"#number"}
  * match data == resultObj