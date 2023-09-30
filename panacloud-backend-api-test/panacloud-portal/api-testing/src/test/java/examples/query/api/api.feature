Feature: API QUERIES

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
    #And header x-api-key = "da2-tmrd52l74rgzzgygzrfypbcbgm"
    * def jsonData = read('../../../resources/testData/queryData.json')
    * def entity = jsonData.entity
    * def company = jsonData.company
    #def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}

# Scenario: "fetch my api token"

#  * text query = 
# """query fetchMyApiToken($input:fetchMyApiTokenInput!) {
#    fetchMyApiToken(input: $input) {
#     api_token
#     apiId
#     entityId
#   }
# }"""
#   * def apiTokenInfo = jsonData.apiTokenInfo
#   And request { query: '#(query)' , variables:{input : {entityId:'#(apiTokenInfo.entityId)', apiId:'#(apiTokenInfo.apiId)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.fetchMyApiToken
#   * print data
#   * match data == apiTokenInfo

# # Scenario: "fetch my underdevelopment apis user"

# #  * text query = 
# # """query fetchMyUnderDevelopmentApis($input:fetchMyUnderDevelopmentApisInput!) {
# #    fetchMyUnderDevelopmentApis(input: $input) {
# #     apis {
# #       apiId
# #       apiKind
# #       apiType
# #       numOfSubscribers
# #       imageUrl
# #       owner {
# #         id
# #         picture_url
# #         ... on userIdentifier {
# #           id
# #           firstName
# #           lastName
# #           picture_url
# #         }
# #       }
# #       shortDescription
# #       status
# #       subscribed
# #       title
# #     }
# #     count
# #   }
# # }"""
# #   * def fetchMyUnderdevelopmentApisOutput = jsonData.fetchMyUnderdevelopmentApisOutputUser
# #   And request { query: '#(query)' , variables:{input : {entityId:'#(fetchMyUnderdevelopmentApisOutput.apis[0].owner.id)', apiType:'#(fetchMyUnderdevelopmentApisOutput.apis[0].apiType)', pageNumber:'#(fetchMyUnderdevelopmentApisOutput.pageNumber)', pageSize:'#(fetchMyUnderdevelopmentApisOutput.pageSize)'}}}
# #   When method POST
# #   * match karate.range(200,210) contains responseStatus
# #   * print response
# #   * match responseType == 'json'  
# #   * def data = response.data.fetchMyUnderDevelopmentApis
# #   * print data
# #   * remove fetchMyUnderdevelopmentApisOutput.pageNumber
# #   * remove fetchMyUnderdevelopmentApisOutput.pageSize
# #   * match data == fetchMyUnderdevelopmentApisOutput

# Scenario Outline: CREATE NEW FETCH MY UNDERDEVELOPMENT API QUERY USER WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

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
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchMyUnderDevelopmentApis.apis[0]
#   * print data
#   * match response.data.fetchMyUnderDevelopmentApis.apis[0] == jsonData.fetchMyUnderdevelopmentApisOutputUser.apis[__num]

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! |
#        | "uzair"    | "CRM"        | 1          |    1        |
#        | "uzair"    | "CRM"        | 1          |    2        |


# Scenario Outline: CREATE NEW FETCH MY UNDERDEVELOPMENT API QUERY COMPANY WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

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
#          ... on companyIdentifier {
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
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchMyUnderDevelopmentApis.apis[0]
#   * print data
#   * match response.data.fetchMyUnderDevelopmentApis.apis[0] == jsonData.fetchMyUnderdevelopmentApisOutputCompany.apis[__num]

#   Examples:
#        | entityId!                                  | apiType!     | pageSize!  | pageNumber! |
#        | "515969afd7-5c73-4b03-9155-65a5f1cfcd30"   | "CRM"        | 1          |    1        |
#        | "515969afd7-5c73-4b03-9155-65a5f1cfcd30"   | "CRM"        | 1          |    2        |


# # Scenario: "fetch my underdevelopment apis company"

# #  * text query = 
# # """query fetchMyUnderDevelopmentApis($input:fetchMyUnderDevelopmentApisInput!) {
# #    fetchMyUnderDevelopmentApis(input: $input) {
# #      apis {
# #         apiId
# #         apiKind
# #         apiType
# #         imageUrl
# #         numOfSubscribers
# #         owner {
# #         ... on companyIdentifier {
# #               id
# #               name
# #               picture_url
# #           }
# #           id
# #           picture_url
# #       }
# #       shortDescription
# #       status
# #       subscribed
# #       title
# #     }
# #     count
# #   }
# # }"""
# #   * def fetchMyUnderdevelopmentApisOutput = jsonData.fetchMyUnderdevelopmentApisOutputCompany
# #   And request { query: '#(query)' , variables:{input : {entityId:'#(fetchMyUnderdevelopmentApisOutput.apis[0].owner.id)', apiType:'#(fetchMyUnderdevelopmentApisOutput.apis[0].apiType)', pageNumber:'#(fetchMyUnderdevelopmentApisOutput.pageNumber)', pageSize:'#(fetchMyUnderdevelopmentApisOutput.pageSize)'}}}
# #   When method POST
# #   * match karate.range(200,210) contains responseStatus
# #   * print response
# #   * match responseType == 'json'  
# #   * def data = response.data.fetchMyUnderDevelopmentApis
# #   * print data
# #   * remove fetchMyUnderdevelopmentApisOutput.pageNumber
# #   * remove fetchMyUnderdevelopmentApisOutput.pageSize
# #   * match data == fetchMyUnderdevelopmentApisOutput

# Scenario Outline: CREATE NEW FETCH MY PUBLIC APIS QUERY USER WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

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
#       }
#       shortDescription
#       status
#       subscribed
#       title
#     }
#     count
#   }
# }"""

#    And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiType: '#(apiType)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchMyPublicApis.apis[0]
#   * print data
#   * match response.data.fetchMyPublicApis.apis[0] == jsonData.fetchMyPublicApisOutputUser.apis[__num]

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! |
#        | "uzair"    | "CRM"        | 1          |    1        |
#        | "uzair"    | "CRM"        | 1          |    2        |


# Scenario Outline: CREATE NEW FETCH MY PUBLIC APIS QUERY COMPANY WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

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
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchMyPublicApis.apis[0]
#   * print data
#   * match response.data.fetchMyPublicApis.apis[0] == jsonData.fetchMyPublicApisOutputCompany.apis[__num]

#   Examples:
#        | entityId!                                  | apiType!     | pageSize!  | pageNumber! |
#        | "515969afd7-5c73-4b03-9155-65a5f1cfcd30"   | "CRM"        | 1          |    1        |
#        | "515969afd7-5c73-4b03-9155-65a5f1cfcd30"   | "CRM"        | 1          |    2        |



# # Scenario: "fetch my public apis company"

# #  * text query = 
# # """query fetchMyPublicApis($input:fetchMyPublicApisInput!) {
# #   fetchMyPublicApis(input: $input) {
# #       apis {
# #         apiId
# #         apiKind
# #         apiType
# #         imageUrl
# #         numOfSubscribers
# #         owner {
# #           id
# #           picture_url
# #           ... on companyIdentifier {
# #             id
# #             name
# #             picture_url
# #           }
# #       }
# #       shortDescription
# #       status
# #       subscribed
# #       title
# #     }
# #     count
# #   }
# # }"""
# #   * def fetchMyPublicApisOutput = jsonData.fetchMyPublicApisOutputCompany
# #   And request { query: '#(query)' , variables:{input : {entityId:'#(fetchMyPublicApisOutput.apis[0].owner.id)', apiType:'#(fetchMyPublicApisOutput.apis[0].apiType)', pageNumber:'#(fetchMyPublicApisOutput.pageNumber)', pageSize:'#(fetchMyPublicApisOutput.pageSize)'}}}
# #   When method POST
# #   * match karate.range(200,210) contains responseStatus
# #   * print response
# #   * match responseType == 'json'  
# #   * def data = response.data.fetchMyPublicApis
# #   * print data
# #   * remove fetchMyPublicApisOutput.pageNumber
# #   * remove fetchMyPublicApisOutput.pageSize
# #   * match data == fetchMyPublicApisOutput


# Scenario Outline: CREATE NEW FETCH MY PRIVATE APIS QUERY USER WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

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
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchMyPrivateApis.apis[0]
#   * print data
#   * match response.data.fetchMyPrivateApis.apis[0] == jsonData.fetchMyPrivateApisOutputUser.apis[__num]

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! |
#        | "uzair"    | "CRM"        | 1          |    1        |
#        | "uzair"    | "CRM"        | 1          |    2        |


# Scenario Outline: CREATE NEW FETCH MY PRIVATE APIS QUERY COMPANY WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

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
#         ... on companyIdentifier {
#             id
#             name
#             picture_url
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
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchMyPrivateApis.apis[0]
#   * print data
#   * match response.data.fetchMyPrivateApis.apis[0] == jsonData.fetchMyPrivateApisOutputCompany.apis[__num]

#   Examples:
#        | entityId!                                  | apiType!     | pageSize!  | pageNumber! |
#        | "515969afd7-5c73-4b03-9155-65a5f1cfcd30"   | "CRM"        | 1          |    1        |
#        | "515969afd7-5c73-4b03-9155-65a5f1cfcd30"   | "CRM"        | 1          |    2        |
       
# # Scenario: "fetch my private apis company"

# #  * text query = 
# # """query fetchMyPrivateApis($input:fetchMyPrivateApisInput!) {
# #   fetchMyPrivateApis(input: $input) {
# #       apis {
# #         apiId
# #         apiKind
# #         apiType
# #         imageUrl
# #         numOfSubscribers
# #         owner {
# #           id
# #           picture_url
# #           ... on companyIdentifier {
# #             id
# #             name
# #             picture_url
# #           }
# #         }
# #       shortDescription
# #       status
# #       subscribed
# #       title
# #     }
# #     count
# #   }
# # }"""
# #   * def fetchMyPrivateApisOutput = jsonData.fetchMyPrivateApisOutputCompany
# #   And request { query: '#(query)' , variables:{input : {entityId:'#(fetchMyPrivateApisOutput.apis[0].owner.id)', apiType:'#(fetchMyPrivateApisOutput.apis[0].apiType)', pageNumber:'#(fetchMyPrivateApisOutput.pageNumber)', pageSize:'#(fetchMyPrivateApisOutput.pageSize)'}}}
# #   When method POST
# #   * match karate.range(200,210) contains responseStatus
# #   * print response
# #   * match responseType == 'json'  
# #   * def data = response.data.fetchMyPrivateApis
# #   * print data
# #   * remove fetchMyPrivateApisOutput.pageNumber
# #   * remove fetchMyPrivateApisOutput.pageSize
# #   * match data == fetchMyPrivateApisOutput

# Scenario: "fetch api review user"

#  * text query = 
# """query fetchApiReviews($input:fetchApiReviewsInput!) {
#   fetchApiReviews(input: $input) {
#     count
#     reviews {
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
#       stars
#       text
#       title
#     }
#   }
# }"""
#   * def fetchApiReviewsOutput = jsonData.fetchApiReviewsOutputUser
#   And request { query: '#(query)' , variables:{input : {entityId:'#(fetchApiReviewsOutput.reviews[0].by.id)', apiId:'#(fetchApiReviewsOutput.reviews[0].apiId)', pageNumber:'#(fetchApiReviewsOutput.pageNumber)', pageSize:'#(fetchApiReviewsOutput.pageSize)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.fetchApiReviews
#   * print data
#   * remove fetchApiReviewsOutput.pageNumber
#   * remove fetchApiReviewsOutput.pageSize
#   * match data == fetchApiReviewsOutput

# Scenario: "fetch api review company"

#  * text query = 
# """query fetchApiReviews($input:fetchApiReviewsInput!) {
#   fetchApiReviews(input: $input) {
#     count
#     reviews {
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
#       reviewId
#       dateCreated
#       stars
#       text
#       title
#     }
#   }
# }"""
#   * def fetchApiReviewsOutput = jsonData.fetchApiReviewsOutputCompany
#   And request { query: '#(query)' , variables:{input : {entityId:'#(fetchApiReviewsOutput.reviews[0].by.id)', apiId:'#(fetchApiReviewsOutput.reviews[0].apiId)', pageNumber:'#(fetchApiReviewsOutput.pageNumber)', pageSize:'#(fetchApiReviewsOutput.pageSize)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.fetchApiReviews
#   * print data
#   * remove fetchApiReviewsOutput.pageNumber
#   * remove fetchApiReviewsOutput.pageSize
#   * match data == fetchApiReviewsOutput

# Scenario Outline: CREATE FETCH ALL PUBLIC APIS QUERY WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchAllPublicApis($input:fetchAllPublicApisInput!) {
#   fetchAllPublicApis(input: $input) {
#       apis {
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
#   * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
#   And json convertJSON = result.response
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchAllPublicApis.apis[0]
#   * print data
#   * match response.data.fetchAllPublicApis.apis[0] == jsonData.fetchallPublicApisOutput.apis[__num]

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! |
#        | "uzair"    | "CRM"        | 1          |    1        |
#        | "uzair"    | "CRM"        | 1          |    2        |


# Scenario Outline: CREATE FETCH ALL API IDEAS QUERY WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchAllApiIdeas($input:fetchAllApiIdeasInput!) {
#   fetchAllApiIdeas(input: $input) {
#       apiIdeas {
#       apiKind
#       apiType
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
#       id
#       imageUrl
#       num_of_dislikes
#       num_of_likes
#       title
#       total_proposals
#       viewerRelationWithApiIdea {
#         linkedApi
#         reaction
#         submittedProposal
#       }
#     }
#     count
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiType: '#(apiType)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
#   And json convertJSON = result.response
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchAllApiIdeas.apiIdeas[0]
#   * print data
#   * match response.data.fetchAllApiIdeas.apiIdeas[0] == jsonData.fetchAllApiIdeasOutput.apiIdeas[__num]

#   Examples:
#        | entityId!  | apiType!     | pageSize!  | pageNumber! |
#        | "uzair"    | "CRM"        | 1          |    1        |
#        | "uzair"    | "CRM"        | 1          |    2        |

# Scenario: "get api bazaar sidemenu"

#  * text query = 
# """query getApiBazaarSideMenu($input:getApiBazaarSideMenuInput!) {
#    getApiBazaarSideMenu(input: $input) {
#    allPublicApis {
#       api {
#         count
#         type
#       }
#       totalCount
#     }
#     myPublicApis {
#       api {
#         count
#         type
#       }
#       totalCount
#     }
#     privateApis {
#       api {
#         count
#         type
#       }
#       totalCount
#     }
#     subscribedApis {
#       api {
#         count
#         type
#       }
#       totalCount
#     }
#     underDevelopmentApis {
#       api {
#         count
#         type
#       }
#       totalCount
#     }
#   }
# }"""
#   * def getApiBazaarSideMenu = jsonData.getApiBazaarSideMenuOutput
#   And request { query: '#(query)' , variables:{input : {entityId:'#(entity.entityId)'}}}
#   * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
#   And json convertJSON = result.response
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.getApiBazaarSideMenu
#   * print data
#   * match data == getApiBazaarSideMenu

# Scenario: "get api idea sidemenu"

#  * text query = 
# """query getApiIdeaSideMenu($input:getApiIdeaSideMenuInput!) {
#    getApiIdeaSideMenu(input: $input) {
#    allPublicApiIdeas {
#       totalCount
#       apiIdeas {
#         count
#         type
#       }
#     }
#     apisLinkedToProposals {
#       approved {
#         apiIdeas {
#           count
#           type
#         }
#         totalCount
#       }
#       disapproved {
#         apiIdeas {
#           count
#           type
#         }
#         totalCount
#       }
#       pending {
#         apiIdeas {
#           type
#           count
#         }
#         totalCount
#       }
#     }
#     myApiIdeas {
#       apiIdeas {
#         count
#         type
#       }
#       totalCount
#     }
#     myProposals {
#       apiIdeas {
#         count
#         type
#       }
#       totalCount
#     }
#   }
# }"""
#   * def getApiIdeaSideMenu = jsonData.getApiIdeaSideMenuOutput
#   And request { query: '#(query)' , variables:{input : {entityId:'#(entity.entityId)'}}}
#   * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
#   And json convertJSON = result.response
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.getApiIdeaSideMenu
#   * print data
#   * match data == getApiIdeaSideMenu


# Scenario: "get api idea full info user"
# # error: add description
#  * text query = 
# """query getApiIdeaFullInfo($input:getApiIdeaFullInfoInput!) {
#    getApiIdeaFullInfo(input: $input) {
#    apiKind
#     apiType
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
#     dateCreated
#     graphQl_proposals
#     id
#     imageUrl
#     num_of_dislikes
#     num_of_likes
#     openApi_proposals
#     title
#     total_proposals
#     viewerRelationWithApiIdea {
#       linkedApi
#       reaction
#       submittedProposal
#     }
#   }
# }"""
#   * def apiIdeaFullInfo = jsonData.apiIdeaFullInfoUser
#   And request { query: '#(query)' , variables:{input : {entityId:'#(entity.entityId)', apiIdeaId:'#(apiIdeaFullInfo.id)'}}}
#   * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
#   And json convertJSON = result.response
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.getApiIdeaFullInfo
#   * print data
#   * match data == apiIdeaFullInfo

# Scenario: "get api idea full info company"
# #add description
#  * text query = 
# """query getApiIdeaFullInfo($input:getApiIdeaFullInfoInput!) {
#    getApiIdeaFullInfo(input: $input) {
#    apiKind
#     apiType
#     by {
#       id
#       picture_url
#       ... on companyIdentifier {
#         id
#         name
#         picture_url
#       }
#     }
#     dateCreated
#     graphQl_proposals
#     id
#     imageUrl
#     num_of_dislikes
#     num_of_likes
#     openApi_proposals
#     title
#     total_proposals
#     viewerRelationWithApiIdea {
#       linkedApi
#       reaction
#       submittedProposal
#     }
#   }
# }"""
#   * def apiIdeaFullInfo = jsonData.apiIdeaFullInfoCompany
#   And request { query: '#(query)' , variables:{input : {entityId:'#(company.companyId)', apiIdeaId:'#(apiIdeaFullInfo.id)'}}}
#   * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
#   And json convertJSON = result.response
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.getApiIdeaFullInfo
#   * print data
#   * match data == apiIdeaFullInfo

# Scenario Outline: CREATE FETCH ALL COMMENTS ON API IDEA QUERY WHEN apiIdeaId= <apiIdeaId> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchAllCommentsOnAnApiIdea($input:fetchAllCommentsOnAnApiIdeaInput!) {
#   fetchAllCommentsOnAnApiIdea(input: $input) {
#      apiIdeaComments {
#       apiIdeaId
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
#       createdAt
#       id
#       text
#     }
#     count
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {apiIdeaId: '#(apiIdeaId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
#   And json convertJSON = result.response
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.fetchAllCommentsOnAnApiIdea.apiIdeaComments[0]
#   * print data
#   * match response.data.fetchAllCommentsOnAnApiIdea.apiIdeaComments[0] == jsonData.fetchAllCommentsOnAnApiIdeaOutput.apiIdeaComments[__num]

#   Examples:
#        | apiIdeaId!   | pageSize!  | pageNumber! |
#        | "111"        | 1          |    1        |
#        | "111"        | 1          |    2        |  

# Scenario Outline: CREATE NEW GET LINKED APIS FOR API IDEA PROPOSAL USER WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query getLinkedApisForApiIdeaProposal($input:getLinkedApisForApiIdeaProposalInput!) {
#   getLinkedApisForApiIdeaProposal(input: $input) {
#       count
#       linkedApiShowcaseInfo {
#       apiId
#       apiKind
#       apiType
#       imageUrl
#       linkedApiStatus
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
#       }
#       shortDescription
#       status
#       subscribed
#       title
#     }
#   }
# }"""

#   * def getLinkedApisForApiIdeaProposal = jsonData.getLinkedApisForApiIdeaProposalOutputUser
#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', linkedApiStatus: '#(linkedApiStatus)',apiIdeaProposalId: '#(apiIdeaProposalId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.getLinkedApisForApiIdeaProposal.linkedApiShowcaseInfo[0]
#   * print data
#   * match response.data.getLinkedApisForApiIdeaProposal.linkedApiShowcaseInfo[0] == jsonData.getLinkedApisForApiIdeaProposalOutputUser.linkedApiShowcaseInfo[__num]

#   Examples:
#        | entityId!  | apiIdeaProposalId!                        | linkedApiStatus!    | pageSize!  | pageNumber! |
#        | "uzair"    | "d6bcd20c-e87d-faa3-36d9-995493eae0e1"    | approved            | 1          |    1        |
#        | "uzair"    | "d6bcd20c-e87d-faa3-36d9-995493eae0e1"    | approved            | 1          |    2        |

# Scenario Outline: CREATE NEW GET LINKED APIS FOR API IDEA PROPOSAL COMPANY WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query getLinkedApisForApiIdeaProposal($input:getLinkedApisForApiIdeaProposalInput!) {
#   getLinkedApisForApiIdeaProposal(input: $input) {
#       count
#       linkedApiShowcaseInfo {
#       apiId
#       apiKind
#       apiType
#       imageUrl
#       linkedApiStatus
#       numOfSubscribers
#       owner {
#         id
#         picture_url
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
#   }
# }"""

#   * def getLinkedApisForApiIdeaProposal = jsonData.getLinkedApisForApiIdeaProposalOutputCompany
#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', linkedApiStatus: '#(linkedApiStatus)',apiIdeaProposalId: '#(apiIdeaProposalId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response 
#   * def data = response.data.getLinkedApisForApiIdeaProposal.linkedApiShowcaseInfo[0]
#   * print data
#   * match response.data.getLinkedApisForApiIdeaProposal.linkedApiShowcaseInfo[0] == jsonData.getLinkedApisForApiIdeaProposalOutputCompany.linkedApiShowcaseInfo[__num]

#   Examples:
#        | entityId!  | apiIdeaProposalId!                        | linkedApiStatus!    | pageSize!  | pageNumber! |
#        | "uzair"    | "c2bcd23c-b0ae-4888-812e-f02a71a745ce"    | approved            | 1          |    1        |
#        | "uzair"    | "c2bcd23c-b0ae-4888-812e-f02a71a745ce"    | approved            | 1          |    2        |
