Feature: SUBSCRIPTION MUTATIONS

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
    # And header x-api-key = API_KEY
    * def jsonData = read('../../../resources/testData/data.json')
    * def entity = jsonData.entity
    #* def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}

# Scenario: "create new test subscription"

#  * text mutation = 
# """mutation createNewTestingSubscription($input:createNewTestingSubscriptionInput!) {
#   createNewTestingSubscription(input: $input) {
#     paymentDayEveryMonth
#     api {
#       id
#       picture_url
#       title
#       versionId
#       versionNumber
#     }
#     status
#     subscriptionCreationDate
#     subscriptionId
#     subscription_token
#     type
#   }
# }"""
#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#   * def apiSubscription = jsonData.apiSubscription
#   * set apiSubscription.type = 'TESTING'
#   * set apiSubscription.api.versionId = openAPiBasicInfo.apiId + "-1"
#   * set apiSubscription.api.id = openAPiBasicInfo.apiId
#   And request { query: '#(mutation)' , variables:{input : {entityId: '#(entity.entityId)', versionId: '#(apiSubscription.api.versionId)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createNewTestingSubscription
#   * print data
#   * match data == apiSubscription

# Scenario: "change api subscription status"

#   * text mutation = 
#  """mutation changeSubscriptionStatus($input: changeSubscriptionStatusInput!) {
#    changeSubscriptionStatus(input: $input) {
#      api {
#        id
#        picture_url
#        title
#        versionId
#        versionNumber
#      }
#      paymentDayEveryMonth
#      status
#      subscriptionCreationDate
#      subscriptionId
#      subscription_token
#      type
#      }
#  }"""
 
#    * def changeSubsStatus = jsonData.changeSubscriptionStatusInput
#    And request { query: '#(mutation)' , variables:{input : {entityId: '#(entity.entityId)', subscriptionId: '#(changeSubsStatus.subscriptionId)', status: '#(changeSubsStatus.status)'}}}
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.changeSubscriptionStatus
#    * print data
#    * match data == changeSubsStatus

# Scenario Outline: SUBSCRIBE TO API MUTATION WHEN entityId= <entityId> 

#    * def result = callonce read('../../../resources/authFeature/auth.feature') { username: <username>, password: <password>}
#    And json convertJSON = result.response

#  * text mutation = 
# """mutation subscribeToApi($input: subscribeToApiInput!) {
#   subscribeToApi(input: $input) {
#     subscription_token
#     subscriptionId
#     api {
#       id
#       picture_url
#       title
#       versionId
#       versionNumber
#     }
#     paymentDayEveryMonth
#     status
#     subscriptionCreationDate
#     type
#   }
# }"""

#   * def apiSubscription = jsonData.apiSubscription
#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#   * set apiSubscription.api.versionId = openAPiBasicInfo.apiId + "-1"
#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', versionId: '#(apiSubscription.api.versionId)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * def subscribeData = response.data.subscribeToApi
#   * set apiSubscription.api.id = openAPiBasicInfo.apiId
#   * match subscribeData == expected

#     Examples:
#         | username  | password      | entityId!                                 | expected!                                                                                                                          |
#         | 'muneeb'  | 'Muneeb12345!'| "muneeb"                                  | '#(apiSubscription)'
#         | 'uzair'   | 'Uzair12345!' | "515969afd7-5c73-4b03-9155-65a5f1cfcd30"  | '#(apiSubscription)'                                                                             |        


# Scenario: "create api review by user and delete api review by user"

#    * def result = callonce read('../../../resources/authFeature/auth.feature') { username: 'muneeb', password: 'Muneeb12345!' }
#    And json convertJSON = result.response

#  * text mutation = 
# """mutation createApiReview($input: createApiReviewInput!) {
#   createApiReview(input: $input) {
#     by {
#       id
#       picture_url
#       ... on userIdentifier {
#         id
#         firstName
#         lastName
#         picture_url
#       }
#     }
#     apiId
#     dateCreated
#     reviewId
#     stars
#     text
#     title
#   }
# }"""
#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#   * def apiReview = jsonData.apiReview
#   * set apiReview.apiId = openAPiBasicInfo.apiId
#   And request { query: '#(mutation)' , variables:{input : {apiId:'#(apiReview.apiId)', stars:'#(apiReview.stars)', text:'#(apiReview.text)', title:'#(apiReview.title)', by:'#(apiReview.by.id)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def apiData = response.data.createApiReview
#   * print apiData
#   * match apiData == apiReview

#   * text mutation = 
#   """mutation deleteApiReview($input: deleteApiReviewInput!) {
#     deleteApiReview(input: $input) {
#       apiId
#       by {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           lastName
#           picture_url
#         }
#       }
#       dateCreated
#       reviewId
#       text
#       stars
#       title
#    }
#   }"""
#    * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#    * set apiReview.apiId = openAPiBasicInfo.apiId
#    * def apiReview = jsonData.apiReview
#    * set apiReview.reviewId = apiData.reviewId
#    And request { query: '#(mutation)' , variables:{input : {apiReviewId:'#(apiReview.reviewId)', entityId:'#(apiReview.by.id)'}}}
#    And header Authorization = convertJSON
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.deleteApiReview
#    * print data
#    * match data == apiReview
  

# Scenario: "create api review by company and delete api review by company"

#  * text mutation = 
# """mutation createApiReview($input: createApiReviewInput!) {
#   createApiReview(input: $input) {
#     by {
#       id
#       picture_url
#       ... on companyIdentifier {
#         id
#         name
#         picture_url
#       }
#     }
#     apiId
#     dateCreated
#     reviewId
#     stars
#     text
#     title
#   }
# }"""
#   * def apiReview = jsonData.apiReview
#   * def apiReviewCompany = jsonData.apiReviewCompany
#   * set apiReview.by = apiReviewCompany.by 
#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#   * set apiReview.apiId = openAPiBasicInfo.apiId
#   And request { query: '#(mutation)' , variables:{input : {apiId:'#(apiReview.apiId)', stars:'#(apiReview.stars)', text:'#(apiReview.text)', title:'#(apiReview.title)', by:'#(apiReview.by.id)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def apiData = response.data.createApiReview
#   * print apiData
#   * match apiData == apiReview

#   * text mutation = 
#   """mutation deleteApiReview($input: deleteApiReviewInput!) {
#     deleteApiReview(input: $input) {
#       apiId
#       by {
#         id
#         picture_url
#         ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       dateCreated
#       reviewId
#       text
#       stars
#       title
#    }
#   }"""
#    * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#    * def apiReview = jsonData.apiReview
#    * def apiReviewCompany = jsonData.apiReviewCompany
#    * set apiReview.by = apiReviewCompany.by 
#    * set apiReview.apiId = openAPiBasicInfo.apiId
#    * set apiReview.reviewId = apiData.reviewId
#    And request { query: '#(mutation)' , variables:{input : {apiReviewId:'#(apiReview.reviewId)', entityId:'#(apiReview.by.id)'}}}
#    And header Authorization = convertJSON
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.deleteApiReview
#    * print data
#   * match data == apiReview
  





