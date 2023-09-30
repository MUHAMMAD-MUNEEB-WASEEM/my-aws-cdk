Feature: SUBSCRIPTION MUTATIONS

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
  
# #Create new testing subscription error testing

# Scenario Outline: CREATE NEW TESTING SUBSCRIPTION MUTATION ERROR WHEN entityId= <entityId> and apiId= <apiId> 

#  * text mutation = 
# """mutation createNewTestingSubscription($input:createNewTestingSubscriptionInput!) {
#   createNewTestingSubscription(input: $input) {
#     api{
#       id 
#       imageUrl
#       title
#     }
#     subscriptionId
#     subscriptionCreationDate
#     paymentDayEveryMonth
#     subscription_token
#     status
#     type
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId!  | expected!                                                                                     
#         | ""                | ""      | `inputs "apiId" and "entityId" cannot be empty strings` |
#         | "uzair"           | "901"   | "either the api doesnt exist or the user doesnt own it" |
#         | "tanzeel"         | "901"   | "the user is not permitted to perform this action"      |               
#         | "ahmed"           | "901"   | "entity not found"                                      |

# #Subscribe to api error testing

# Scenario Outline: SUBSCRIBE TO API MUTATION ERROR WHEN entityId= <entityId> and apiId= <apiId> 

#    * def result = callonce read('../../../resources/authFeature/auth.feature') { username: 'tanzeel', password: 'T@nzeel123' }
#    And json convertJSON = result.response

#  * text mutation = 
# """mutation subscribeToApi($input: subscribeToApiInput!) {
#   subscribeToApi(input: $input) {
#     subscriptionId
#     subscriptionCreationDate
#     paymentDayEveryMonth
#     api{
#         id
#         title
#         imageUrl
#     }
#     subscription_token
#     status
#     type
#   }
# }"""


#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId!  | expected!                                                                                     
#         | ""                | ""      | `inputs "apiId" and "entityId" cannot be empty strings`                                         |
#         | "tanzeel"         | "901"   | "api doesnt Exist"                                                                              |        
#         | "tanzeel"         | "188"   | 'the entity has already subscribed to this api'                                                 |
#         | "tanzeel"         | "194"   | 'the user owns this api. To create more test subscriptions please use "createTestSubscription"' |
#         | "uzair"           | "194"   | "the user is not permitted to perform this action"                                              |
#         | "ahmed"           | "194"   | "entity not found"                                                                              |          

# #change subscription status error testing

# Scenario Outline: CHANGE SUBSCRIPTION STATUS MUTATION ERROR WHEN subscriptionId= <subscriptionId> and status= <status> and entityId=<entityId>

#  * text mutation = 
# """mutation changeSubscriptionStatus($input: changeSubscriptionStatusInput!) {
#   changeSubscriptionStatus(input: $input) {
#     api{
#       id 
#       imageUrl
#       title
#     }
#     subscriptionId
#     subscriptionCreationDate
#     paymentDayEveryMonth
#     subscription_token
#     status
#     type
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', subscriptionId: '#(subscriptionId)', status:'#(status)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | subscriptionId!                         | status!      | expected!                                                                                     
#         | ""                | ""                                      | "INACTIVE"   | `inputs "subscriptionId" and "entityId" cannot be empty strings` |
#         | "uzair"           | "55f0c34d-061e-4ee4-af40-f7a84f6b0d04"  | "ACTIVE"     | 'this subscription is already ACTIVE'                            |
#         | "uzair"           | "02dd7e75-a6c2-4f5c-91f6-6b5d2a7b989a"  | "ACTIVE"     | 'the subscription doesnt exist'                                  |
#         | "uzair"           | "48d1e724-b16c-4e44-aa49-bd1eec44e612"  | "ACTIVE"     | `the entity doesnt have access to this subscription`             |
#         | "tanzeel"         | "7cb9da8d-713e-4049-9cd3-a55243b80da0"  | "ACTIVE"     | "the user is not permitted to perform this action"               |
#         | "ahmed"           | "7cb9da8d-713e-4049-9cd3-a55243b80da0"  | "ACTIVE"     | "entity not found"                                               |

        