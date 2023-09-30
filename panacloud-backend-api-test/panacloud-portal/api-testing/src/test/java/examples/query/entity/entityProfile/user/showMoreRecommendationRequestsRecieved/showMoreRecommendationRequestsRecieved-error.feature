Feature: ENTITY QUERIES
  Background:

    * url API_URL
    * def result = callonce read('../../../../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON

# Scenario Outline: CREATE NEW SHOW MORE RECOMMENDATION REQUESTS RECIEVED QUERY ERROR WHEN userId= <userId> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query showMorerecommendationRequestsReceived($input:showMorerecommendationRequestsReceivedInput!) {
#   showMorerecommendationRequestsReceived(input: $input) {
#       count
#     requests {
#       id
#       message
#       requestedBy {
#         id
#         lastName
#         firstName
#         picture_url
#       }
#       requestedFrom {
#         firstName
#         id
#         lastName
#         picture_url
#       }
#       timeStamp
#     }
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {userId: '#(userId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | userId!    | pageSize!  | pageNumber! | expected!                                                                |
#        | ""         | 1          |    1        | `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`   |
#        | "uzair"    | 0          |    1        | `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`   |
#        | "uzair"    | 1          |    0        | `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`   |
#        | "uzair"    | 1          |    -1       | `the page number starts from 1`                                          |
#        | "tanzeel"  | 1          |    1        | "the user is not permitted to perform this action"                       |
#        | "ahmed"    | 1          |    1        | "user not found"                                                       |


