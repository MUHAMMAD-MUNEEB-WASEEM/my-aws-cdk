Feature: API IDEA QUERIES

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON


# Scenario Outline: CREATE NEW FETCH ALL API IDEAS QUERY ERROR WHEN entityId= <entityId> and apiId= <apiType> and pageNumber= <pageNumber> and pageSize= <pageSize>

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


# Scenario Outline: CREATE NEW FETCH ALL COMMENTS ON AN API IDEA QUERY ERROR WHEN  apiIdeaId= <apiIdeaId> and pageNumber= <pageNumber> and pageSize= <pageSize>

#  * text query = 
# """query fetchAllCommentsOnAnApiIdea($input:fetchAllCommentsOnAnApiIdeaInput!) {
#   fetchAllCommentsOnAnApiIdea(input: $input) {
#       apiIdeaComments {
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
#           name
#           id
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
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | apiIdeaId!     | pageSize!  | pageNumber! | expected!                                                                      |
#        | ""             | 1          | 1           | `inputs "apiIdeaId", "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "902"          | 0          | 1           | `inputs "apiIdeaId", "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "902"          | 1          | 0           | `inputs "apiIdeaId", "pageSize" and "pageNumber" cannot be empty strings`      |
#        | "902"          | 1          | -1          | `the page number starts from 1`                                                |
#        | "905"          | 1          | 1           | `apiIdea not found`                                                            |
       

# Scenario Outline: CREATE NEW GET API IDEA FULL INFO QUERY ERROR WHEN  apiIdeaId= <apiIdeaId> and entityId= <entityId>

#  * text query = 
# """query getApiIdeaFullInfo($input:getApiIdeaFullInfoInput!) {
#   getApiIdeaFullInfo(input: $input) {
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
#       ... on companyIdentifier {
#         id
#         name
#         picture_url
#       }
#     }
#     graphQl_proposals
#     id
#     imageUrl
#     num_of_dislikes
#     openApi_proposals
#     num_of_likes
#     title
#     total_proposals
#     viewerRelationWithApiIdea {
#       linkedApi
#       reaction
#       submittedProposal
#     }
#     dateCreated
#     description
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {apiIdeaId: '#(apiIdeaId)', "entityId":'#(entityId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | apiIdeaId!     | entityId!  | expected!                                          |
#        | ""             | "uzair"    | `input "apiIdeaId" cannot be empty an string`      |
#        | "902"          | ""         | "please enter the entityId"                        |
#        | "902"          | "uzair"    | "api idea not found"                               |
#        | "902"          | "tanzeel"  | "the user is not permitted to perform this action" |
#        | "902"          | "ahmed"    | "entity not found"                                 |


# Scenario Outline: CREATE NEW GET API IDEA FULL INFO QUERY ERROR WHEN  apiIdeaProposalId= <apiIdeaProposalId> and entityId= <entityId>

#  * text query = 
# """query getApiIdeaProposalFullInfo($input:getApiIdeaProposalFullInfoInput!) {
#   getApiIdeaProposalFullInfo(input: $input) {
#    approvedLinkedApis
#     dateCreated
#     description
#     disapprovedLinkedApis
#     id
#     kind
#     totalLinkedApis
#     pendingLinkedApis
#     by {
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
#     for {
#       id
#       imageUrl
#       title
#     }
#     viewerRelationWithApiIdeaProposal {
#       linkedApi
#     }
#     ... on graphQlIdeaProposalFullInfo {
#       id
#       approvedLinkedApis
#       by {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           picture_url
#           lastName
#         }
#         ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       dateCreated
#       description
#       disapprovedLinkedApis
#       for {
#         id
#         imageUrl
#         title
#       }
#       kind
#       pendingLinkedApis
#       schema
#       totalLinkedApis
#       viewerRelationWithApiIdeaProposal {
#         linkedApi
#       }
#     }
#     ... on openApiIdeaProposalFullInfo {
#       id
#       approvedLinkedApis
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
#       definition
#       description
#       disapprovedLinkedApis
#       for {
#         id
#         imageUrl
#         title
#       }
#       kind
#       pendingLinkedApis
#       totalLinkedApis
#       viewerRelationWithApiIdeaProposal {
#         linkedApi
#       }
#     }
#   }
# }"""

#   And request { query: '#(query)' , variables:{input : {apiIdeaProposalId: '#(apiIdeaProposalId)', "entityId":'#(entityId)'}}}

#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | apiIdeaProposalId!  | entityId!  | expected!                                             |
#        | ""                  | "ali"    | `input"apiIdeaProposalId" cannot be an empty string`  |
#        | "902"               | ""         | "please enter the entityId"                           |
#        | "902"               | "ali"    | `api idea proposal not found`                         |
#        | "902"               | ""         | "please enter the entityId"                           |
#        | "902"               | "tanzeel"  | "the user is not permitted to perform this action"    |
#        | "902"               | "ahmed"    | "entity not found"                                    |


# #not authorize error in above

# Scenario Outline: CREATE NEW GET LINKED APIS FOR API IDEA PROPOSAL QUERY ERROR WHEN entityId= <entityId> and apiIdeaProposalId= <apiIdeaProposalId> and pageNumber= <pageNumber> and pageSize= <pageSize> and linkedApiStatus= <linkedApiStatus>

#  * text query = 
# """query getLinkedApisForApiIdeaProposal($input:getLinkedApisForApiIdeaProposalInput!) {
#   getLinkedApisForApiIdeaProposal(input: $input) {
#     count
#     linkedApiShowcaseInfo {
#       apiKind
#       apiId
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

#   And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiIdeaProposalId: '#(apiIdeaProposalId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)', linkedApiStatus:'#(linkedApiStatus)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#   Examples:
#        | entityId!  | apiIdeaProposalId! | linkedApiStatus!     | pageSize!  | pageNumber! | expected!                                                                         |
#        | "uzair"    | ""                 | approved             | 1          |    1        | `inputs "apiIdeaProposalId", "pageSize" and "pageNumber" cannot be empty strings` |
#        | "uzair"    | "903"              | approved             | 0          |    1        | `inputs "apiIdeaProposalId", "pageSize" and "pageNumber" cannot be empty strings` |
#        | "uzair"    | "903"              | approved             | 1          |    0        |`inputs "apiIdeaProposalId", "pageSize" and "pageNumber" cannot be empty strings`  |
#        | "uzair"    | "902"              | approved             | 1          |    -1       | `the page number starts from 1`                                                   |
#        | "uzair"    | "902"              | approved             | 1          |    1        | "api idea proposal not found"                                                     |
#        | ""         | "902"              | approved             | 1          |    1        | "please enter the entityId"                                                       |
#        | "tanzeel"  | "902"              | approved             | 1          |    1        | "the user is not permitted to perform this action"                                | 
#        | "ahmed"    | "902"              | approved             | 1          |    1        | "entity not found"                                                                |

Scenario Outline: CREATE NEW FETCH PROPOSAL FOR AN IDEA QUERY ERROR WHEN entityId= <entityId> and apiIdeaId= <apiIdeaId> and pageNumber= <pageNumber> and pageSize= <pageSize> and ideaKind= <ideaKind>

 * text query = 
"""query fetchProposalsForAnIdea($input:fetchProposalsForAnIdeaInput!) {
  fetchProposalsForAnIdea(input: $input) {
count
    ideaProposals {
      approvedLinkedApis
      by {
        id
        picture_url
        ... on userIdentifier {
          id
          firstName
          lastName
          picture_url
        }
        ... on companyIdentifier {
          id
          name
          picture_url
        }
      }
      dateCreated
      for {
        id
        imageUrl
        title
      }
      id
      kind
      totalLinkedApis
      viewerRelationWithApiIdeaProposal {
        linkedApi
      }
      ... on graphQlIdeaProposalShowcaseInfo {
        approvedLinkedApis
        by {
          id
          picture_url
          ... on userIdentifier {
            id
            firstName
            lastName
            picture_url
          }
          ... on companyIdentifier {
            id
            name
            picture_url
          }
        }
        dateCreated
        for {
          id
          title
          imageUrl
        }
        id
        schema
        kind
        totalLinkedApis
        viewerRelationWithApiIdeaProposal {
          linkedApi
        }
      }
      ... on openApiIdeaProposalShowcaseInfo {
        approvedLinkedApis
        by {
          id
          ... on userIdentifier {
            id
            firstName
            picture_url
            lastName
          }
          picture_url
          ... on companyIdentifier {
            id
            name
            picture_url
          }
        }
        dateCreated
        definition
        for {
          id
          imageUrl
          title
        }
        id
        kind
        totalLinkedApis
        viewerRelationWithApiIdeaProposal {
          linkedApi
        }
      }
    }
  }
}"""

  And request { query: '#(query)' , variables:{input : {entityId: '#(entityId)', apiIdeaId: '#(apiIdeaId)', "pageNumber":'#(pageNumber)', "pageSize":'#(pageSize)', ideaKind:'#(ideaKind)'}}}
  #And header
  When method POST
  * match karate.range(200, 210) contains responseStatus
  * print response    
  * match response.errors[0].message == expected

  Examples:
       | entityId!  | apiIdeaId! | ideaKind!           | pageSize!  | pageNumber! | expected!                                                                         |
       | "uzair"    | ""         | GRAPHQL             | 1          |    1        | `inputs "apiIdeaId, "pageNumber" and "pageSize cannot be empty strings`    |
       | "uzair"    | "903"      | GRAPHQL             | 0          |    1        | `inputs "apiIdeaId, "pageNumber" and "pageSize cannot be empty strings`    |
       | "uzair"    | "903"      | GRAPHQL             | 1          |    0        | `inputs "apiIdeaId, "pageNumber" and "pageSize cannot be empty strings`    |
       | "uzair"    | "902"      | GRAPHQL             | 1          |    -1       | `the page number starts from 1`                                                   |
       | ""         | "902"      | GRAPHQL             | 1          |    1        | "please enter the entityId"                                                       |
       | "tanzeel"  | "902"      | GRAPHQL             | 1          |    1        | "the user is not permitted to perform this action"                                | 
       | "ahmed"    | "902"      | GRAPHQL             | 1          |    1        | "entity not found"                                                                |
