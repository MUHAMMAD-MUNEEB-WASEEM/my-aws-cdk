Feature: ENTITY MUTATIONS

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
  
#write recommendation error testing

# Scenario Outline: WRITE RECOMMENDATION MUTATION ERROR WHEN recommendedBy= <recommendedBy> and apiId= <apiId> 

#  * text mutation = 
#    """mutation writeRecommendation($input: writeRecommendationInput!) {
#   writeRecommendation(input:$input){
#    id
#     recommendationFor {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     recommendedBy {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     timeStamp
#     text
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { recommendedBy: '#(recommendedBy)', recommendationFor: '#(recommendationFor)', text:'#(text)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | recommendedBy!    | recommendationFor! | text!             | expected!                                                                                     
#         | ""                | ""                 | ""                | `inputs "requesterUserId", "text" and "requestedUserId cannot be empty strings` |
#         | "uzair"           | "ahmed"            | "Recommended"     | "user to be recommended not found"                                              |
#         | "uzair"           | "uzair"            | "Recommended"     | "users cannot write recommendations for themeselves"                            |
#         | "uzair"           | "tanzeel"          | "Recommended"     | "the user has already written a recommendation for this user"                   |
#         | "tanzeel"         | "uzair"            | "Recommended"     | "the user is not permitted to perform this action"                              |
#         | "ahmed"           | "tanzeel"          | "Recommended"     | "user not found"                                                                |

# #cancel recommendation request error testing
# Scenario Outline: CANCEL RECOMMENDATION REQUEST MUTATION ERROR WHEN recommendationRequestId= <recommendationRequestId> and userId= <userId> 

#  * text mutation = 
#    """mutation cancelRecommendationRequest($input: cancelRecommendationRequestInput!) {
#   cancelRecommendationRequest(input:$input){
#     id
#     message
#     requestedBy {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     requestedFrom {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     timeStamp
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { recommendationRequestId: '#(recommendationRequestId)', userId: '#(userId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | recommendationRequestId!               | userId!        | expected!                                                                                     
#         | ""                                     | ""             | `inputs "userId"and "recommendationRequestId cannot be empty strings` |
#         | "cebc9617-45af-e2fe-84c5-e9cc819482d8" | "uzair"        | "recommndation request not found"                                     |
#         | "e2bcc1a0-2f8e-98f2-679e-8ea0f65b210c" | "uzair"        | "the user is not permitted to cancel the recommendation request"      |
#         | "0ebc992d-9317-34fc-1de6-e8725cd72f82" | "tanzeel"      | "the user is not permitted to perform this action"                    |
#         | "0ebc992d-9317-34fc-1de6-e8725cd72f82" | "ahmed"        | "user not found"                                                      |

# #delete recommendations error testing
# Scenario Outline: DELETE RECOMMENDATION MUTATION ERROR WHEN recommendationRequestId= <recommendationId> and userId= <userId> 

# * text mutation = 
#    """mutation deleteRecommendation($input: deleteRecommendationInput! ) {
#   deleteRecommendation(input:$input){
#     id
#     recommendationFor {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     recommendedBy {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     text
#     timeStamp
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { recommendationId: '#(recommendationId)', userId: '#(userId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | recommendationId!                      | userId!        | expected!                                                                                     
#         | ""                                     | ""             | `inputs "userId"and "recommendationId cannot be empty strings` |
#         | "cebc9617-45af-e2fe-84c5-e9cc819482d8" | "uzair"        | "recommndation not found"                                      |
#         | "debcc1a3-f710-3ca0-8995-f1f6962342dc" | "uzair"        | "the user is not permitted to delete the recommendation"       |
#         | "92bc9938-210d-9147-c0df-8636e02017d5" | "tanzeel"      | "the user is not permitted to perform this action"             |
#         | "92bc9938-210d-9147-c0df-8636e02017d5" | "ahmed"        | "user not found"                                               |

# #request recommendation error testing

# Scenario Outline: REQUEST RECOMMENDATION MUTATION ERROR WHEN requesterUserId= <requesterUserId> and requestedUserId= <requestedUserId> and message= <message>

#    * def result = callonce read('../../../resources/authFeature/auth.feature') { username: <username>, password: <password>}
#    And json convertJSON = result.response

#    * text mutation = 
#    """mutation requestRecommendation($input: requestRecommendationInput!) {
#   requestRecommendation(input:$input){
#     id
#     message
#     requestedBy {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     requestedFrom {
#       firstName
#       lastName
#       id
#       picture_url
#     }
#     timeStamp
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { requesterUserId: '#(requesterUserId)', requestedUserId: '#(requestedUserId)', message:'#(message)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | username  | password      | requesterUserId!  | requestedUserId!   | message!                | expected!                                                                                     
#         | 'uzair'   | 'Uzair12345!' | ""                | ""                 | "test Request"          | `inputs "requesterUserId" and "requestedUserId cannot be empty strings` |
#         | 'uzair'   | 'Uzair12345!' | "uzair"           | "ahmed"            | "test Request"          | "requested user id not found"                                           |
#         | 'uzair'   | 'Uzair12345!' | "uzair"           | "uzair"            | "test Request"          | "users cannot request recommendations from themeselves"                 |
#         | 'uzair'   | 'Uzair12345!' | "uzair"           | "tanzeel"          | "test Request"          | "the user has already requested a recommendation from this user"        |
#         | 'uzair'   | 'Uzair12345!' | "tanzeel"         | "uzair"            | "test Request"          | "the user is not permitted to perform this action"                      |
# #       | 'tanzeel' | 'T@nzeel123'  | "tanzeel"         | "uzair"            | 'Request Recommendation'| "the user has already recieved a recommendation from this user"         |
#         | 'uzair'   | 'Uzair12345!' | "ahmed"           | "uzair"            | "test Request"          | "user not found"                                                        |

# #request recommendation error testing
# Scenario: "Request Recommendation errorString6 for recieved recommendation"

#    * def result = callonce read('../../../resources/authFeature/auth.feature') { username: 'tanzeel', password: 'T@nzeel123' }
#    And json convertJSON = result.response

#    * text mutation = 
#    """mutation requestRecommendation($input: requestRecommendationInput!) {
#   requestRecommendation(input:$input){
#     id
#     message
#     requestedBy {
#       firstName
#       id
#       lastName
#       picture_url
#     }
#     requestedFrom {
#       firstName
#       lastName
#       id
#       picture_url
#     }
#     timeStamp
#   }
# }"""


#   And request { query: '#(mutation)' , variables:{input : { requesterUserId: 'tanzeel', requestedUserId: 'uzair', message:'Request Recommendation'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.errors[0].message
#   * print data
#   * match data == "the user has already recieved a recommendation from this user"