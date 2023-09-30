Feature: SUBSCRIPTION QUERIES

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
    # And header x-api-key = API_KEY
    * def jsonData = read('../../../resources/testData/queryData.json')
    * def entity = jsonData.entity
    #* def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}

# Scenario Outline: CREATE NEW MY API TESTING SUBSCRIPTION QUERY ERROR WHEN entityId= <entityId> and apiId= <apiId> and pageNumber= <pageNumber> and pageSize= <pageSize>

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
#   * def myTestingSubscriptions = jsonData.fetchMyApiTestingSubscriptions
#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiId: '#(apiId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchMyApiTestingSubscriptions[0]
#   * print data
#   * match response.data.fetchMyApiTestingSubscriptions[0] == jsonData.fetchMyApiTestingSubscriptions[__num]

#   Examples:
#        | entityId!  | apiId!     | pageSize!  | pageNumber! |
#        | "uzair"    | "104"      | 1          |    1        |
#        | "uzair"    | "104"      | 1          |    2        |

# Scenario: "fetch my api subscription"

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
#   * def myApiSubscriptions = jsonData.fetchMyApiSubscription
#   And request { query: '#(query)' , variables:{input : {entityId: '#(entity.entityId)', apiId: '#(myApiSubscriptions.api.id)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.fetchMyApiSubscription
#   * print data
#   * match data == myApiSubscriptions
