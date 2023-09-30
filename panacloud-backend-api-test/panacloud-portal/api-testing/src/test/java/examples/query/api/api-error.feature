Feature: API QUERIES

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
  
# #Create fetch my api token error testing

# Scenario Outline: FETCH MY API TOKEN QUERY ERROR WHEN entityId= <entityId> and apiId= <apiId> 

#  * text query = 
# """query fetchMyApiToken($input:fetchMyApiTokenInput!) {
#   fetchMyApiToken(input: $input) {
#     apiId
#     api_token
#     entityId
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId! | expected!                                                                                     
#         | ""                | ""     | `inputs "entityId" and "apiId" cannot be empty strings`       |
#         | "uzair"           | "902"  | 'either the api doesnt exist or the entity doesnt own it'     |
#         | "tanzeel"         | "902"  | "the user is not permitted to perform this action"            |
#         | "ahmed"           | "902"  | "entity not found"                                            |

# Scenario Outline: CREATE NEW FETCH MY UNDERDEVELOPMENT API QUERY ERROR WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchMyUnderDevelopmentApis($input:fetchMyUnderDevelopmentApisInput!) {
#    fetchMyUnderDevelopmentApis(input: $input) {
#     apis {
#       apiId
#       apiKind
#       apiType
#       numOfSubscribers
#       imageUrl
#       owner {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           lastName
#           picture_url
#         }
#         ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       shortDescription
#       status
#       subscribed
#       title
#     }
#     count
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiType: '#(apiType)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#     When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! | expected!                                                         |
#        | "uzair"    | "CRM"        | 0          |    0        | `inputs "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "uzair"    | "CRM"        | 1          |    -1       | `the page number starts from 1`                                   |
#        | ""         | "CRM"        | 1          |    1        | "please enter the entityId"                                       |
#        | "tanzeel"  | "CRM"        | 1          |    1        | "the user is not permitted to perform this action"                |
#        | "ahmed"    | "CRM"        | 1          |    1        | "entity not found"                                                |

# Scenario Outline: CREATE NEW FETCH MY PUBLIC APIS QUERY ERROR WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchMyPublicApis($input:fetchMyPublicApisInput!) {
#   fetchMyPublicApis(input: $input) {
#       apis {
#         apiId
#         apiKind
#         apiType
#         imageUrl
#         numOfSubscribers
#         owner {
#           id
#           picture_url
#           ... on userIdentifier {
#             id
#             firstName
#             lastName
#             picture_url
#           }
#           ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       shortDescription
#       status
#       subscribed
#       title
#     }
#     count
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiType: '#(apiType)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! | expected!                                                         |
#        | "uzair"    | "CRM"        | 0          |    0        | `inputs "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "uzair"    | "CRM"        | 1          |    -1       | `the page number starts from 1`                                   |
#        | ""         | "CRM"        | 1          |    1        | "please enter the entityId"                                       |
#        | "tanzeel"  | "CRM"        | 1          |    1        | "the user is not permitted to perform this action"                |
#        | "ahmed"    | "CRM"        | 1          |    1        | "entity not found"                                                |

# Scenario Outline: CREATE NEW FETCH MY PRIVATE APIS QUERY ERROR WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchMyPrivateApis($input:fetchMyPrivateApisInput!) {
#   fetchMyPrivateApis(input: $input) {
#        apis {
#         apiId
#         apiKind
#         apiType
#         imageUrl
#         numOfSubscribers
#         owner {
#           id
#           picture_url
#           ... on userIdentifier {
#             id
#             firstName
#             lastName
#             picture_url
#           }
#           ... on companyIdentifier {
#           id
#           name
#           picture_url
#           }
#         }
#       shortDescription
#       status
#       subscribed
#       title
#     }
#     count
#   }
# }"""
#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiType: '#(apiType)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! | expected!                                                         |
#        | "uzair"    | "CRM"        | 0          |    0        | `inputs "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "uzair"    | "CRM"        | 1          |    -1       | `the page number starts from 1`                                   |
#        | ""         | "CRM"        | 1          |    1        | "please enter the entityId"                                       |
#        | "tanzeel"  | "CRM"        | 1          |    1        | "the user is not permitted to perform this action"                |
#        | "ahmed"    | "CRM"        | 1          |    1        | "entity not found"                                                |

# Scenario Outline: CREATE NEW FETCH ALL PUBLIC APIS QUERY ERROR WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchAllPublicApis($input:fetchAllPublicApisInput!) {
#   fetchAllPublicApis(input: $input) {
#       apis {
#       apiKind
#       apiId
#       imageUrl
#       apiType
#       numOfSubscribers
#       owner {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           picture_url
#           lastName
#         }
#         ... on companyIdentifier {
#           name
#           id
#           picture_url
#         }
#       }
#       shortDescription
#       status
#       subscribed
#       title
#     }
#     count
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiType: '#(apiType)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! | expected!                                                         |
#        | "uzair"    | "CRM"        | 0          |    0        | `inputs "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "uzair"    | "CRM"        | 1          |    -1       | `the page number starts from 1`                                   |
#        | ""         | "CRM"        | 1          |    1        | "please enter the entityId"                                       |
#        | "tanzeel"  | "CRM"        | 1          |    1        | "the user is not permitted to perform this action"                |
#        | "ahmed"    | "CRM"        | 1          |    1        | "entity not found"   

# Scenario Outline: CREATE NEW FETCH MY API INFO QUERY ERROR WHEN entityId= <entityId> and apiId= <apiId>

#  * text query = 
# """query fetchApiInfo($input:fetchApiInfoInput!) {
#   fetchApiInfo(input: $input) {
#     apiId
#     apiKind
#     apiType
#     creationDate
#     imageUrl
#     longDescription
#     numOfSubscribers
#     owner {
#       id
#       picture_url
#       ... on userIdentifier {
#         id
#         firstName
#         lastName
#         picture_url
#       }
#       ... on companyIdentifier {
#         id
#         name
#         picture_url
#       }
#     }
#     shortDescription
#     status
#     subscribed
#     title
#     ... on graphQlApiFullInfo {
#       subscribed
#       apiId
#       apiKind
#       apiType
#       apiUrl
#       creationDate
#       graphQlSchema
#       longDescription
#       imageUrl
#       numOfSubscribers
#       owner {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           lastName
#           picture_url
#         }
#         ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       shortDescription
#       status
#       title
#     }
#     ... on openApiFullInfo {
#       subscribed
#       apiId
#       apiKind
#       apiRootUrl
#       apiType
#       imageUrl
#       creationDate
#       longDescription
#       numOfSubscribers
#       openApiDef
#       shortDescription
#       owner {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           lastName
#           picture_url
#         }
#         ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       status
#       title
#     }
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiId: '#(apiId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiId!     | expected!                                                    |
#        | "uzair"    | ""         | `inputs "entityId" and "apiId" cannot be empty strings`      |
#        | "uzair"    | "904"      | 'api not found'                                              |
#        | ""         | "904"      | "please enter the EntityId"                                  |
#        #| "tanzeel"  | "904"      | 'the entity is not permitted to view the api info'          |
#        | "tanzeel"  | "CRM"      | "the user is not permitted to perform this action"           |
#        | "ahmed"    | "CRM"      | "entity not found"                                           |

# #in above, want to clear about 'the entity is not permitted to view the api info'       


# Scenario Outline: CREATE NEW FETCH MY SUBSCIRBED APIS QUERY ERROR WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchMySubscribedApis($input:fetchMySubscribedApisInput!) {
#   fetchMySubscribedApis(input: $input) {
#        apis {
#       apiId
#       apiKind
#       apiType
#       imageUrl
#       numOfSubscribers
#       owner {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           lastName
#           picture_url
#         }
#         ... on companyIdentifier {
#           id
#         }
#       }
#       shortDescription
#       status
#       subscribed
#       title
#     }
#     count
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiType: '#(apiType)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! | expected!                                                         |
#        | "uzair"    | "CRM"        | 0          |    1        | `inputs "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "uzair"    | "CRM"        | 1          |    0        | `inputs "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "uzair"    | "CRM"        | 1          |    -1       | `the page number starts from 1`                                   |
#        | ""         | "CRM"        | 1          |    1        | "please enter the entityId"                                       |
#        | "tanzeel"  | "CRM"        | 1          |    1        | "the user is not permitted to perform this action"                |
#        | "ahmed"    | "CRM"        | 1          |    1        | "entity not found"                                                |


# Scenario Outline: CREATE NEW FETCH API REVIEW QUERY ERROR WHEN entityId= <entityId> and apiId= <apiId> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchApiReviews($input:fetchApiReviewsInput!) {
#   fetchApiReviews(input: $input) {
#       reviews {
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
#         ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       dateCreated
#       reviewId
#       stars
#       text
#       title
#     }
#     count
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiId: '#(apiId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiId!       | pageSize!  | pageNumber! | expected!                                                                         |
#        | ""         | "902"        | 1          |    1        | `inputs "entityId", "pageNumber", "pageSize" and "apiId" cannot be empty strings` |
#        | "uzair"    | ""           | 1          |    1        | `inputs "entityId", "pageNumber", "pageSize" and "apiId" cannot be empty strings` |
#        | "uzair"    | "902"        | 0          |    1        | `inputs "entityId", "pageNumber", "pageSize" and "apiId" cannot be empty strings` |
#        | "uzair"    | "902"        | 1          |    0        | `inputs "entityId", "pageNumber", "pageSize" and "apiId" cannot be empty strings` |
#        | "uzair"    | "902"        | 1          |    -1       | `the page number starts from 1`                                                   |
#        | "uzair"    | "902"        | 1          |    1        | `api not found`                                                                   |
#        | "tanzeel"  | "902"        | 1          |    1        | "the user is not permitted to perform this action"                |
#        | "ahmed"    | "902"        | 1          |    1        | "entity not found"                                                |
          
