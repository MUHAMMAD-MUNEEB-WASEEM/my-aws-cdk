Feature: SUBSCRIPTION QUERIES

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
  
#Create new testing subscription error testing

# Scenario Outline: FETCH MY API TESTING SUBSCRIPTION QUERY ERROR WHEN entityId= <entityId> and apiId= <apiId> 

#  * text query = 
# """query fetchMyApiTestingSubscriptions($input:fetchMyApiTestingSubscriptionInput!) {
#   fetchMyApiTestingSubscriptions(input: $input) {
#     api {
#       id
#       imageUrl
#       title
#     }
#     paymentDayEveryMonth
#     status
#     subscriptionCreationDate
#     subscriptionId
#     subscription_token
#     type
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)', pageNumber:'#(pageNumber)', pageSize:'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId! | pageNumber | pageSize | expected!                                                                                     
#         | ""                | ""     | 1          | 1        | `inputs "entityId", "apiId", "pageNumber" and "pageSize" cannot be empty strings` |
#         | "uzair"           | "101"  | 1          | 1        | "the entity doesnt own this api"                                                  |
#         | "uzair"           | "901"  | 1          | 1        | 'api not found'                                                                   |
#         | "uzair"           | "103"  | -1         | 1        | `the page number starts from 1`                                                   |
#         | "muneeb"          | "901"  | 1          | 1        | "the user is not permitted to perform this action"                                |               
#         | "ahmed"           | "901"  | 1          | 1        | "entity not found"                                                                |

# Scenario Outline: FETCH MY API SUBSCRIPTION QUERY ERROR WHEN entityId= <entityId> and apiId= <apiId> 

#  * text query = 
# """query fetchMyApiSubscription($input:fetchMyApiSubscriptionInput!) {
#   fetchMyApiSubscription(input: $input) {
#     api {
#       id
#       imageUrl
#       title
#     }
#     paymentDayEveryMonth
#     status
#     subscriptionCreationDate
#     subscriptionId
#     subscription_token
#     type
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId! | expected!                                                                                     
#         | ""                | ""     | `inputs "entityId" and "apiId" cannot be empty strings`                                                    |
#         | "uzair"           | "104"  | 'the entity owns this api. To see your test subscriptions please run fetchMyApiTestingSubscriptions query' |
#         | "uzair"           | "901"  | 'api not found'                                                                                            |
#         | "uzair"           | "105"  | 'the entity has not subscribed to this api'                                                                |
#         | "muneeb"          | "901"  | "the user is not permitted to perform this action"                                                         |               
#         | "ahmed"           | "901"  | "entity not found"                                                                                         |
