Feature: API MUTATIONS

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
    # And header x-api-key = API_KEY
    * def jsonData = read('../../../resources/testData/data.json')
    * def entity = jsonData.entity
    #* def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}
      
# Scenario: "create open api "

#  * text mutation = 
# """mutation createOpenApi($input: createOpenApiInput!) {
#     createOpenApi(input: $input) {
#       apiId
#       apiKind
#       apiType
#       latest_published_version {
#         dateCreated
#         datePublished
#         versionId
#         releaseNotes
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           apiUrl
#           dateCreated
#           graphQlSchema
#           datePublished
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           apiRootUrl
#           dateCreated
#           datePublished
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       status
#       shortDescription
#       title
#     }
# }"""

#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)', title: '#(openAPiBasicInfo.title)', apiType: '#(openAPiBasicInfo.apiType)', apiRootUrl:'#(openAPiBasicInfo.latest_unpublished_version.apiRootUrl)', openApiDef: '#(openAPiBasicInfo.latest_unpublished_version.openApiDef)', longDescription: '#(openAPiBasicInfo.longDescription)', shortDescription: '#(openAPiBasicInfo.shortDescription)', releaseNotes: '#(openAPiBasicInfo.latest_unpublished_version.releaseNotes)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createOpenApi
#   * print data
#   * match data == openAPiBasicInfo

# Scenario: "create open api for delete api"

#   * text mutation = 
#  """mutation createOpenApi($input: createOpenApiInput!) {
#      createOpenApi(input: $input) {
#        apiId
#        apiKind
#        apiType
#        latest_published_version {
#          dateCreated
#          datePublished
#          versionId
#          releaseNotes
#          versionNumber
#          versionStatus
#          ... on graphQlVersionBasicInfo {
#            apiUrl
#            dateCreated
#            graphQlSchema
#            datePublished
#            releaseNotes
#            versionId
#            versionNumber
#            versionStatus
#          }
#          ... on openApiVersionBasicInfo {
#            datePublished
#            apiRootUrl
#            dateCreated
#            openApiDef
#            releaseNotes
#            versionId
#            versionNumber
#            versionStatus
#          }
#        }
#        latest_unpublished_version {
#          dateCreated
#          datePublished
#          releaseNotes
#          versionId
#          versionNumber
#          versionStatus
#          ... on graphQlVersionBasicInfo {
#            datePublished
#            apiUrl
#            dateCreated
#            graphQlSchema
#            releaseNotes
#            versionId
#            versionNumber
#            versionStatus
#          }
#          ... on openApiVersionBasicInfo {
#            apiRootUrl
#            dateCreated
#            datePublished
#            openApiDef
#            releaseNotes
#            versionId
#            versionNumber
#            versionStatus
#          }
#        }
#        longDescription
#        status
#        shortDescription
#        title
#      }
#  }"""
 
#    * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#    * set openAPiBasicInfo.apiId = openAPiBasicInfo.apiId + "-d"
#    And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)', title: '#(openAPiBasicInfo.title)', apiType: '#(openAPiBasicInfo.apiType)', apiRootUrl:'#(openAPiBasicInfo.latest_unpublished_version.apiRootUrl)', openApiDef: '#(openAPiBasicInfo.latest_unpublished_version.openApiDef)', longDescription: '#(openAPiBasicInfo.longDescription)', shortDescription: '#(openAPiBasicInfo.shortDescription)', releaseNotes: '#(openAPiBasicInfo.latest_unpublished_version.releaseNotes)'}}}
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.createOpenApi
#    * print data
#    * match data == openAPiBasicInfo
# Scenario: "update open api info"

#   * text mutation = 
#  """mutation updateApiInfo($input: updateApiInfoInput!) {
#      updateApiInfo(input: $input) {
#       apiId
#       apiKind
#       apiType
#       latest_published_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           releaseNotes
#           graphQlSchema
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           dateCreated
#           apiRootUrl
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       shortDescription
#       status
#       title
#    }
#  }"""
 
#    * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#    * set openAPiBasicInfo.apiType = ["EDUCATION"]
#    * set openAPiBasicInfo.apiId = "113"
#    And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)', title: '#(openAPiBasicInfo.title)', apiType: '#(openAPiBasicInfo.apiType)', longDescription: '#(openAPiBasicInfo.longDescription)', shortDescription: '#(openAPiBasicInfo.shortDescription)'}}}
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.updateApiInfo
#    * print data
#    * match data == openAPiBasicInfo 
 

# Scenario: "publish open api"

#   * text mutation = 
#  """mutation publishApi($input: publishApiInput!) {
#     publishApi(input: $input) {
#       apiKind
#       apiId
#       apiType
#       latest_published_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           apiUrl
#           dateCreated
#           graphQlSchema
#           datePublished
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           apiRootUrl
#           dateCreated
#           datePublished
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       shortDescription
#       status
#       title
#      }
#  }"""
#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#   * set openAPiBasicInfo.latest_published_version = openAPiBasicInfo.latest_unpublished_version
#   * set openAPiBasicInfo.latest_published_version.datePublished = "#string"
#   * set openAPiBasicInfo.latest_published_version.versionStatus = "PUBLISHED"
#   * set openAPiBasicInfo.status = "PRIVATE" 
#    And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)'}}}
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.publishApi
#    * print data
#    * set openAPiBasicInfo.latest_unpublished_version = null
#    * set openAPiBasicInfo.shortDescription = "#string"
#    * match data == openAPiBasicInfo   

# Scenario: "create open api version"

#   * text mutation = 
#  """mutation createOpenApiVersion($input: createOpenApiVersionInput!) {
#     createOpenApiVersion(input: $input) {
#       testingSubscriptions {
#       status
#       subscriptionCreationDate
#       subscriptionId
#     }
#     versionDetails {
#       apiRootUrl
#       dateCreated
#       datePublished
#       openApiDef
#       releaseNotes
#       versionId
#       versionNumber
#       versionStatus
#     }
#      }
#  }"""
  
#   * def openApiVersion = jsonData.openApiVersion
#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi 
#    And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)', apiRootUrl:'#(openApiVersion.versionDetails.apiRootUrl)', openApiDef: '#(openApiVersion.versionDetails.openApiDef)', releaseNotes: '#(openApiVersion.versionDetails.releaseNotes)'}}}
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.createOpenApiVersion
#    * print data
#    * match data == openApiVersion

# Scenario: "delete open api version"

#   * text mutation = 
#   """mutation deleteApiVersion($input: deleteApiVersionInput!) {
#     deleteApiVersion(input: $input) {
#       dateCreated
#       datePublished
#       releaseNotes
#       versionId
#       versionNumber
#       versionStatus
#       ... on graphQlVersionBasicInfo {
#         datePublished
#         apiUrl
#         dateCreated
#         graphQlSchema
#         releaseNotes
#         versionNumber
#         versionId
#         versionStatus
#       }
#       ... on openApiVersionBasicInfo {
#         apiRootUrl
#         dateCreated
#         datePublished
#         openApiDef
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#       }
#       }
#   }"""
    
#     * def openApiVersion = jsonData.openApiVersion
#     * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#     * set openApiVersion.versionId = openAPiBasicInfo.apiId + "-2" 
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', versionId: '#(openApiVersion.versionId)' }}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteApiVersion
#     * print data
#     * match data == openApiVersion.versionDetails
  
   
# Scenario: "update open api version"

#   * text mutation = 
#  """mutation updateOpenApiVersion($input: updateOpenApiVersionInput!) {
#     updateOpenApiVersion(input: $input) {
#       apiRootUrl
#       dateCreated
#       datePublished
#       openApiDef
#       releaseNotes
#       versionId
#       versionNumber
#       versionStatus
#      }
#  }"""
  
#   * def openApiVersion = jsonData.openApiVersion
#   * set openApiVersion.versionId = "b2bcebac-affc-5162-270a-88ca57dcd32c"
#   * set openApiVersion.releaseNotes = "test latest release"
#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi 
#    And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', versionId: '#(openApiVersion.versionId)', apiRootUrl:'#(openApiVersion.apiRootUrl)', openApiDef: '#(openApiVersion.openApiDef)', releaseNotes: '#(openApiVersion.releaseNotes)'}}}
#    When method POST
#    * match karate.range(200,210) contains responseStatus
#    * print response
#    * match responseType == 'json'  
#    * def data = response.data.updateOpenApiVersion
#    * print data
#    * set openApiVersion.versionDetails.datePublished = response.data.updateOpenApiVersion.datePublished
#    * set openApiVersion.versionDetails.releaseNotes = "test latest release"
#    * match data == openApiVersion.versionDetails

# Scenario: "delete open api"

#   * text mutation = 
#   """mutation deleteApi($input: deleteApiInput!) {
#       deleteApi(input: $input) {
#       apiId
#       apiKind
#       apiType
#       latest_published_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionStatus
#           versionNumber
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           versionId
#           releaseNotes
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           dateCreated
#           apiUrl
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       shortDescription
#       status
#       title
#       }
#   }"""
  
#     * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#     * set openAPiBasicInfo.apiId = openAPiBasicInfo.apiId + "-d"
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteApi
#     * print data
#     * match data == openAPiBasicInfo
   

# Scenario: "create graphql api"

#   * text mutation = 
#   """mutation createGraphQlApi($input: createGraphQLApiInput!) {
#     createGraphQlApi(input: $input) {
#       apiId
#       apiType
#       apiKind
#       latest_published_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionStatus
#         versionNumber
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       shortDescription
#       status
#       title
#       }
#   }"""
#   * def openAPiBasicInfo = jsonData.apiBasicInfoGraphql
#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)', title: '#(openAPiBasicInfo.title)', apiType: '#(openAPiBasicInfo.apiType)', apiUrl:'#(openAPiBasicInfo.latest_unpublished_version.apiUrl)', graphQlSchema: '#(openAPiBasicInfo.latest_unpublished_version.graphQlSchema)', longDescription: '#(openAPiBasicInfo.longDescription)', shortDescription: '#(openAPiBasicInfo.shortDescription)', releaseNotes: '#(openAPiBasicInfo.latest_unpublished_version.releaseNotes)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createGraphQlApi
#   * print data
#   * match data == openAPiBasicInfo

# Scenario: "create graphql api for delete api"

#   * text mutation = 
#   """mutation createGraphQlApi($input: createGraphQLApiInput!) {
#     createGraphQlApi(input: $input) {
#       apiId
#       apiType
#       apiKind
#       latest_published_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionStatus
#         versionNumber
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       shortDescription
#       status
#       title
#       }
#   }"""
#   * def openAPiBasicInfo = jsonData.apiBasicInfoGraphql
#   * set openAPiBasicInfo.apiId = openAPiBasicInfo.apiId + "-d"
#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)', title: '#(openAPiBasicInfo.title)', apiType: '#(openAPiBasicInfo.apiType)', apiUrl:'#(openAPiBasicInfo.latest_unpublished_version.apiUrl)', graphQlSchema: '#(openAPiBasicInfo.latest_unpublished_version.graphQlSchema)', longDescription: '#(openAPiBasicInfo.longDescription)', shortDescription: '#(openAPiBasicInfo.shortDescription)', releaseNotes: '#(openAPiBasicInfo.latest_unpublished_version.releaseNotes)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createGraphQlApi
#   * print data
#   * match data == openAPiBasicInfo


# Scenario: "update graphql api info"

#   * text mutation = 
#   """mutation updateApiInfo($input: updateApiInfoInput!) {
#       updateApiInfo(input: $input) {
#         apiId
#     apiKind
#     apiType
#     latest_published_version {
#       dateCreated
#       datePublished
#       releaseNotes
#       versionId
#       versionNumber
#       versionStatus
#       ... on graphQlVersionBasicInfo {
#         datePublished
#         apiUrl
#         dateCreated
#         releaseNotes
#         graphQlSchema
#         versionId
#         versionNumber
#         versionStatus
#       }
#       ... on openApiVersionBasicInfo {
#         datePublished
#         dateCreated
#         apiRootUrl
#         openApiDef
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#       }
#     }
#     latest_unpublished_version {
#       dateCreated
#       datePublished
#       releaseNotes
#       versionId
#       versionNumber
#       versionStatus
#       ... on graphQlVersionBasicInfo {
#         datePublished
#         apiUrl
#         dateCreated
#         graphQlSchema
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#       }
#       ... on openApiVersionBasicInfo {
#         datePublished
#         apiRootUrl
#         dateCreated
#         openApiDef
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#       }
#     }
#     longDescription
#     shortDescription
#     status
#     title
#     }
#   }"""
  
#     * def openAPiBasicInfo = jsonData.apiBasicInfoGraphql
#     * set openAPiBasicInfo.apiType = ["EDUCATION"]
#     * set openAPiBasicInfo.apiId = "123"
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)', title: '#(openAPiBasicInfo.title)', apiType: '#(openAPiBasicInfo.apiType)', longDescription: '#(openAPiBasicInfo.longDescription)', shortDescription: '#(openAPiBasicInfo.shortDescription)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.updateApiInfo
#     * print data
#     * match data == openAPiBasicInfo 
  
# Scenario: "publish graphql api"

#   * text mutation = 
#   """mutation publishApi($input: publishApiInput!) {
#     publishApi(input: $input) {
#       apiKind
#       apiId
#       apiType
#       latest_published_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           apiUrl
#           dateCreated
#           graphQlSchema
#           datePublished
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           apiRootUrl
#           dateCreated
#           datePublished
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       shortDescription
#       status
#       title
#       }
#   }"""
#   * def openAPiBasicInfo = jsonData.apiBasicInfoGraphql 
#   * set openAPiBasicInfo.latest_published_version = openAPiBasicInfo.latest_unpublished_version
#   * set openAPiBasicInfo.latest_published_version.datePublished = "#string"
#   * set openAPiBasicInfo.latest_published_version.versionStatus = "PUBLISHED"
#   * set openAPiBasicInfo.status = "PRIVATE" 
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.publishApi
#     * print data
#     * set openAPiBasicInfo.latest_unpublished_version = null
#     * set openAPiBasicInfo.shortDescription = "#string"
#     * match data == openAPiBasicInfo   
  
# Scenario: "create graphql api version"

#     * text mutation = 
#    """mutation createGraphQlApiVersion($input: createGraphQlApiVersionInput!) {
#     createGraphQlApiVersion(input: $input) {
#       testingSubscriptions {
#         status
#         subscriptionCreationDate
#         subscriptionId
#       }
#       versionDetails {
#         apiUrl
#         dateCreated
#         datePublished
#         graphQlSchema
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#       }
#        }
#    }"""
    
#     * def graphqlApiVersion = jsonData.openApiVersion
#     * def openAPiBasicInfo = jsonData.apiBasicInfoGraphql 
#     * remove graphqlApiVersion.versionDetails.openApiDef
#     * set graphqlApiVersion.versionDetails.graphQlSchema = openAPiBasicInfo.latest_unpublished_version.graphQlSchema
#     * set graphqlApiVersion.versionDetails.apiUrl = graphqlApiVersion.versionDetails.apiRootUrl
#     * remove graphqlApiVersion.versionDetails.apiRootUrl
#     * set graphqlApiVersion.apiId = openAPiBasicInfo.apiId
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(graphqlApiVersion.apiId)', apiUrl:'#(graphqlApiVersion.versionDetails.apiUrl)', graphQlSchema: '#(graphqlApiVersion.versionDetails.graphQlSchema)', releaseNotes: '#(graphqlApiVersion.versionDetails.releaseNotes)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.createGraphQlApiVersion
#     * print data
#     * remove graphqlApiVersion.apiId
#     * match data == graphqlApiVersion

# Scenario: "update graphql api version"

#     * text mutation = 
#    """mutation updateGraphQlApiVersion($input: updateGraphQlApiVersionInput!) {
#     updateGraphQlApiVersion(input: $input) {
#       dateCreated
#       apiUrl
#       datePublished
#       graphQlSchema
#       releaseNotes
#       versionId
#       versionNumber
#       versionStatus
#        }
#    }"""
    
#     * def graphqlApiVersion = jsonData.openApiVersion
#     * remove graphqlApiVersion.versionDetails.openApiDef
#     * set graphqlApiVersion.versionDetails.apiUrl = graphqlApiVersion.versionDetails.apiRootUrl
#     * remove graphqlApiVersion.versionDetails.apiRootUrl
#     * set graphqlApiVersion.versionDetails.graphQlSchema = "test latest schema"
#     * set graphqlApiVersion.versionDetails.versionId = "dcbcebc6-37eb-8194-0984-952eb3544c09"
#     * set graphqlApiVersion.versionDetails.releaseNotes = "test latest release"
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', versionId: '#(graphqlApiVersion.versionDetails.versionId)', apiUrl:'#(graphqlApiVersion.versionDetails.apiUrl)', graphQlSchema: '#(graphqlApiVersion.versionDetails.graphQlSchema)', releaseNotes: '#(graphqlApiVersion.versionDetails.releaseNotes)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.updateGraphQlApiVersion
#     * print data
#     * set graphqlApiVersion.versionDetails.datePublished = response.data.updateGraphQlApiVersion.datePublished
#     * set graphqlApiVersion.versionDetails.releaseNotes = "test latest release"
#     * match data == graphqlApiVersion.versionDetails


#   Scenario: "delete graphql api version"

#     * text mutation = 
#     """mutation deleteApiVersion($input: deleteApiVersionInput!) {
#       deleteApiVersion(input: $input) {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionNumber
#           versionId
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           apiRootUrl
#           dateCreated
#           datePublished
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         }
#     }"""
      
#     * def graphqlApiVersion = jsonData.openApiVersion
#     * def openAPiBasicInfo = jsonData.apiBasicInfoGraphql 
#     * remove graphqlApiVersion.versionDetails.openApiDef
#     * set graphqlApiVersion.versionDetails.graphQlSchema = openAPiBasicInfo.latest_unpublished_version.graphQlSchema
#     * set graphqlApiVersion.versionDetails.apiUrl = graphqlApiVersion.versionDetails.apiRootUrl
#     * remove graphqlApiVersion.versionDetails.apiRootUrl
#     * set graphqlApiVersion.versionDetails.versionId = openAPiBasicInfo.apiId + "-2" 
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', versionId: '#(graphqlApiVersion.versionDetails.versionId)' }}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteApiVersion
#     * print data
#     * match data == graphqlApiVersion.versionDetails
    
# Scenario: "delete graphql api"

#   * text mutation = 
#   """mutation deleteApi($input: deleteApiInput!) {
#       deleteApi(input: $input) {
#       apiId
#       apiKind
#       apiType
#       latest_published_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           apiUrl
#           dateCreated
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionStatus
#           versionNumber
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           versionId
#           releaseNotes
#           versionNumber
#           versionStatus
#         }
#       }
#       latest_unpublished_version {
#         dateCreated
#         datePublished
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#         ... on graphQlVersionBasicInfo {
#           datePublished
#           dateCreated
#           apiUrl
#           graphQlSchema
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#         ... on openApiVersionBasicInfo {
#           datePublished
#           apiRootUrl
#           dateCreated
#           openApiDef
#           releaseNotes
#           versionId
#           versionNumber
#           versionStatus
#         }
#       }
#       longDescription
#       shortDescription
#       status
#       title
#       }
#   }"""
  
#     * def openAPiBasicInfo = jsonData.apiBasicInfoGraphql
#     * set openAPiBasicInfo.apiId = openAPiBasicInfo.apiId + "-d"
#     And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId: '#(openAPiBasicInfo.apiId)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteApi
#     * print data
#     * match data == openAPiBasicInfo


# Scenario: "change api status"

#  * text mutation = 
# """mutation changeApiStatus($input: changeApiStatusInput!) {
#   changeApiStatus(input: $input) {
#     apiId
#     apiKind
#     apiType
#     latest_published_version {
#       dateCreated
#       datePublished
#       releaseNotes
#       versionId
#       versionNumber
#       versionStatus
#       ... on graphQlVersionBasicInfo {
#         datePublished
#         apiUrl
#         dateCreated
#         graphQlSchema
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#       }
#       ... on openApiVersionBasicInfo {
#         apiRootUrl
#         dateCreated
#         openApiDef
#         datePublished
#         releaseNotes
#         versionNumber
#         versionId
#         versionStatus
#       }
#     }
#     latest_unpublished_version {
#       dateCreated
#       datePublished
#       releaseNotes
#       versionId
#       versionStatus
#       ... on graphQlVersionBasicInfo {
#         datePublished
#         apiUrl
#         dateCreated
#         graphQlSchema
#         releaseNotes
#         versionId
#         versionNumber
#         versionStatus
#       }
#       versionNumber
#       ... on openApiVersionBasicInfo {
#         datePublished
#         dateCreated
#         apiRootUrl
#         openApiDef
#         versionId
#         releaseNotes
#         versionNumber
#         versionStatus
#       }
#     }
#     longDescription
#     shortDescription
#     status
#     title
#   }
# }"""

#   * def openAPiBasicInfo = jsonData.apiBasicInfoOpenApi
#   * def apiBasicInfochangeStatus = jsonData.apiBasicInfochangeStatus
#   * set apiBasicInfochangeStatus.apiId = openAPiBasicInfo.apiId
#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId:'#(apiBasicInfochangeStatus.apiId)', status: '#(apiBasicInfochangeStatus.status)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.changeApiStatus
#   * print data
#   * match data == apiBasicInfochangeStatus

# Scenario: "create api idea"

#   * text mutation = 
#   """mutation createApiIdea($input: createApiIdeaInput!) {
#     createApiIdea(input:$input) {
#       apiKind
#       apiType
#       description
#       id
#       title
#     }
#   }"""
  
#     * def apiIdeaBasicInfo = jsonData.apiIdeaBasicInfo
#     And request { query: '#(mutation)' , variables:{input :{entityId: '#(entity.entityId)', apiIdeaId:'#(apiIdeaBasicInfo.id)',title : '#(apiIdeaBasicInfo.title)' , apiType:'#(apiIdeaBasicInfo.apiType)',apiKind:'#(apiIdeaBasicInfo.apiKind)', description:'#(apiIdeaBasicInfo.description)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.createApiIdea
#     * print data
#     * match data == apiIdeaBasicInfo 

# Scenario: "update api idea"

#   * text mutation = 
# """mutation updateApiIdea($input: updateApiIdeaInput!) {
#   updateApiIdea(input:$input) {
#     apiKind
#     apiType
#     description
#     id
#     title
#   }
# }"""
#   * def apiIdeaBasicInfo = jsonData.apiIdeaBasicInfo
#   And request { query: '#(mutation)' , variables:{input :{entityId: '#(entity.entityId)', apiIdeaId:'#(apiIdeaBasicInfo.id)',title : '#(apiIdeaBasicInfo.title)' , description:'#(apiIdeaBasicInfo.description)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.updateApiIdea
#   * print data
#   * match data == apiIdeaBasicInfo

# Scenario: "react on api idea"

#   * text mutation = 
# """mutation reactOnApiIdea($input: reactOnApiIdeaInput!) {
#   reactOnApiIdea(input:$input) {
#     apiIdeaId
#     by
#     reaction
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : '#(reactOnApiIdeaOutput)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.reactOnApiIdea
#   * print data
#   * match data == reactOnApiIdeaOutput 
         
# Scenario: "delete api idea"

#   * text mutation = 
#   """mutation deleteApiIdea($input: deleteApiIdeaInput!) {
#     deleteApiIdea(input:$input) {
#       apiKind
#       apiType
#       description
#       id
#       title
#     }
#   }"""
  
#     * def apiIdeaBasicInfo = jsonData.apiIdeaBasicInfo
#     And request { query: '#(mutation)' , variables:{input :{entityId: '#(entity.entityId)', apiIdeaId:'#(apiIdeaBasicInfo.id)'}}}
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteApiIdea
#     * print data
#     * match data == apiIdeaBasicInfo 

# Scenario: "join api idea page"

#   * def result = callonce read('../../../resources/authFeature/auth.feature') { username: 'muneeb', password: 'Muneeb12345!' }
#   And json convertJSON = result.response

#   * text mutation = 
# """mutation joinApiIdeaPage($input: joinApiIdeaPageInput!) {
#   joinApiIdeaPage(input:$input) {
#     apiIdeaId
#     entityId
#     joiningDate
#     joined
#   }
# }"""
#   * def joinApiIdeaPage = jsonData.joinApiIdeaPageOutput
#   And request { query: '#(mutation)' , variables:{input : {entityId: '#(joinApiIdeaPage.entityId)', action: '#(joinApiIdeaPage.action)', apiIdeaId: '#(joinApiIdeaPage.apiIdeaId)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.joinApiIdeaPage
#   * print data
#   * set joinApiIdeaPage.joiningDate = response.data.joinApiIdeaPage.joiningDate
#   * set joinApiIdeaPage.joined = response.data.joinApiIdeaPage.joined
#   * remove joinApiIdeaPage.action
#   * match data == joinApiIdeaPage

# Scenario: "create api question user and delete api question user"

#   * def result = callonce read('../../../resources/authFeature/auth.feature') { username: 'muneeb', password: 'Muneeb12345!' }
#   And json convertJSON = result.response

#   * text mutation = 
#   """mutation createApiQuestion($input: createApiQuestionInput!) {
#     createApiQuestion(input:$input) {
#       apiId
#       apiQuestionId
#       by {
#         id
#         picture_url
#         ... on userIdentifier {
#           id
#           firstName
#           picture_url
#           lastName
#         }
#       }
#       dateCreated
#       latest_published_version
#       text
#       latest_responses {
#         apiQuestionId
#         apiQuestionResponseId
#         by {
#           id
#           picture_url
#           ... on userIdentifier {
#             id
#             firstName
#             lastName
#             picture_url
#           }
#           ... on companyIdentifier {
#             id
#             name
#             picture_url
#           }
#         }
#         dateCreated
#         text
#       }
#       total_responses
#     }
#   }"""
  
#     * def apiQuestion = jsonData.apiQuestionUser
#     And request { query: '#(mutation)' , variables:{input :{by: '#(apiQuestion.by.id)', apiId:'#(apiQuestion.apiId)',text: '#(apiQuestion.text)'}}}
#     And header Authorization = convertJSON
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def apiData = response.data.createApiQuestion
#     * print apiData
#     * match apiData == apiQuestion  

#     * def result = callonce read('../../../resources/authFeature/auth.feature') { username: 'uzair', password: 'Uzair12345!' }
#     And json convertJSON = result.response

#     * text mutation = 
#     """mutation deleteApiQuestion($input: deleteApiQuestionInput!) {
#       deleteApiQuestion(input:$input) {
#         apiId
#         apiQuestionId
#         by {
#           id
#           picture_url
#           ... on userIdentifier {
#             id
#             firstName
#             lastName
#             picture_url
#           }
#         }
#         latest_published_version
#         dateCreated
#         latest_responses {
#           apiQuestionId
#           apiQuestionResponseId
#           by {
#             id
#             picture_url
#             ... on userIdentifier {
#               id
#               lastName
#               picture_url
#               firstName
#             }
#             ... on companyIdentifier {
#               id
#               name
#               picture_url
#             }
#           }
#           dateCreated
#           text
#         }
#         text
#         total_responses
#     }
#   }"""
    
#     * def apiQuestion = jsonData.apiQuestionUser
#     * set apiQuestion.apiQuestionId = apiData.apiQuestionId
#     And request { query: '#(mutation)' , variables:{input :{apiQuestionId: '#(apiQuestion.apiQuestionId)', entityId:'#(entity.entityId)'}}}
#     And header Authorization = convertJSON
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteApiQuestion
#     * print data
#     * match data == apiQuestion

# Scenario: "create api question company and delete api question company"

#  * text mutation = 
#   """mutation createApiQuestion($input: createApiQuestionInput!) {
#     createApiQuestion(input:$input) {
#       apiId
#       apiQuestionId
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
#       latest_published_version
#       latest_responses {
#         apiQuestionId
#         apiQuestionResponseId
#         by {
#           id
#           picture_url
#           ... on userIdentifier {
#             id
#             firstName
#             lastName
#             picture_url
#           }
#           ... on companyIdentifier {
#             id
#             name
#             picture_url
#           }
#         }
#         dateCreated
#         text
#       }
#       text
#       total_responses
#     }
#   }"""
  
#     * def apiQuestion = jsonData.apiQuestionCompany
#     And request { query: '#(mutation)' , variables:{input :{by: '#(apiQuestion.by.id)', apiId:'#(apiQuestion.apiId)',text: '#(apiQuestion.text)'}}}
#     And header Authorization = convertJSON
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def apiData = response.data.createApiQuestion
#     * print apiData
#     * match apiData == apiQuestion

#     * text mutation = 
#     """mutation deleteApiQuestion($input: deleteApiQuestionInput!) {
#       deleteApiQuestion(input:$input) {
#       apiId
#       apiQuestionId
#       by {
#         id
#         picture_url
#         ... on companyIdentifier {
#           id
#           name
#           picture_url
#         }
#       }
#       latest_published_version
#       dateCreated
#       latest_responses {
#         apiQuestionId
#         apiQuestionResponseId
#         by {
#           id
#           picture_url
#           ... on userIdentifier {
#             id
#             lastName
#             picture_url
#             firstName
#           }
#           ... on companyIdentifier {
#             id
#             name
#             picture_url
#           }
#         }
#         dateCreated
#         text
#       }
#       text
#       total_responses
#     }
#   }"""
  
#     * def apiQuestion = jsonData.apiQuestionCompany
#     * set apiQuestion.apiQuestionId = apiData.apiQuestionId
#     And request { query: '#(mutation)' , variables:{input :{apiQuestionId: '#(apiQuestion.apiQuestionId)', entityId:'#(apiQuestion.by.id)'}}}
#     And header Authorization = convertJSON
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteApiQuestion
#     * print data
#     * match data == apiQuestion


# Scenario: "respond to api question and delete response to api question user"

# * text mutation = 
#   """mutation respondToApiQuestion($input: respondToApiQuestionInput!) {
#     respondToApiQuestion(input:$input) {
#       apiQuestionId
#       apiQuestionResponseId
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
#       text
#     }
#   }"""
  
#   * def apiQuestionResponse = jsonData.apiQuestionResponseUser
#   And request { query: '#(mutation)' , variables:{input :{by: '#(apiQuestionResponse.by.id)', apiQuestionId:'#(apiQuestionResponse.apiQuestionId)',text: '#(apiQuestionResponse.text)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def responseData = response.data.respondToApiQuestion
#   * print responseData
#   * match responseData == apiQuestionResponse
  
#   * text mutation = 
#   """mutation deleteResponseToApiQuestion($input: deleteResponseToApiQuestionInput!) {
#     deleteResponseToApiQuestion(input:$input) {
#       apiQuestionId
#     apiQuestionResponseId
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
#     text
#     }
# }"""
#   * def apiQuestionResponse = jsonData.apiQuestionResponseUser
#   * set apiQuestionResponse.apiQuestionResponseId = responseData.apiQuestionResponseId
#   And request { query: '#(mutation)' , variables:{input :{entityId: '#(apiQuestionResponse.by.id)', apiQuestionResponseId:'#(apiQuestionResponse.apiQuestionResponseId)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.deleteResponseToApiQuestion
#   * print data
#   * match data == apiQuestionResponse
      
# Scenario: "respond to api question and delete response to api question company"

#   * text mutation = 
#     """mutation respondToApiQuestion($input: respondToApiQuestionInput!) {
#       respondToApiQuestion(input:$input) {
#         apiQuestionId
#         apiQuestionResponseId
#         by {
#           id
#           picture_url
#           ... on companyIdentifier {
#             id
#             name
#             picture_url
#           }
#         }
#         dateCreated
#         text
#       }
#     }"""
    
#     * def apiQuestionResponse = jsonData.apiQuestionResponseCompany
#     And request { query: '#(mutation)' , variables:{input :{by: '#(apiQuestionResponse.by.id)', apiQuestionId:'#(apiQuestionResponse.apiQuestionId)',text: '#(apiQuestionResponse.text)'}}}
#     And header Authorization = convertJSON
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def responseData = response.data.respondToApiQuestion
#     * print responseData
#     * match responseData == apiQuestionResponse  

#     * text mutation = 
#     """mutation deleteResponseToApiQuestion($input: deleteResponseToApiQuestionInput!) {
#       deleteResponseToApiQuestion(input:$input) {
#         apiQuestionId
#         apiQuestionResponseId
#         by {
#           id
#           picture_url
#           ... on companyIdentifier {
#             id
#             name
#             picture_url
#           }
#         }
#         dateCreated
#         text
#       }
#   }"""
#     * def apiQuestionResponse = jsonData.apiQuestionResponseCompany
#     * set apiQuestionResponse.apiQuestionResponseId = responseData.apiQuestionResponseId
#     And request { query: '#(mutation)' , variables:{input :{entityId: '#(apiQuestionResponse.by.id)', apiQuestionResponseId:'#(apiQuestionResponse.apiQuestionResponseId)'}}}
#     And header Authorization = convertJSON
#     When method POST
#     * match karate.range(200,210) contains responseStatus
#     * print response
#     * match responseType == 'json'  
#     * def data = response.data.deleteResponseToApiQuestion
#     * print data
#     * match data == apiQuestionResponse
  
          
  














# Scenario: "create api idea for openApi"

#  * text mutation = 
# """mutation createApiIdea($input: createApiIdeaInput!) {
#   createApiIdea(input:$input) {
#     apiKind
#     apiType
#     description
#     id
#     title
#     imageUrl
#   }
# }"""

#   * def apiIdea = jsonData.createApiIdeaApiInput
#   And request { query: '#(mutation)' , variables:{input : '#(apiIdea)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createApiIdea
#   * print data
#   * match data == {id:'#(apiIdea.apiIdeaId)',title : '#(apiIdea.title)' , apiType:'#([apiIdea.apiType])',apiKind:'#([apiIdea.apiKind])', description:'#(apiIdea.description)', imageUrl:'#string'} 

# Scenario: "create api idea for graphql"

#  * text mutation = 
# """mutation createApiIdea($input: createApiIdeaInput!) {
#   createApiIdea(input:$input) {
#     apiKind
#     apiType
#     description
#     id
#     title
#     imageUrl
#   }
# }"""

#   * def apiIdea = jsonData.createApiIdeaGraphqlInput
#   And request { query: '#(mutation)' , variables:{input : '#(apiIdea)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createApiIdea
#   * print data
#   * match data == {id:'#(apiIdea.apiIdeaId)',title : '#(apiIdea.title)' , apiType:'#([apiIdea.apiType])',apiKind:'#([apiIdea.apiKind])', description:'#(apiIdea.description)', imageUrl:'#string'} 


# Scenario: "update api idea"

#  * text mutation = 
# """mutation updateApiIdea($input: updateApiIdeaInput!) {
#   updateApiIdea(input:$input) {
#     apiKind
#     apiType
#     description
#     id
#     title
#     imageUrl
#   }
# }"""

#   * def updateIdea = jsonData.updateApiIdeaInput
#   * def apiKind = {apiKind: '#? _ == "GRAPHQL" || _ == "OPENAPI"'}
#   And request { query: '#(mutation)' , variables:{input : '#(updateIdea)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.updateApiIdea
#   * print data
#   * match data == {id:'#(updateIdea.apiIdeaId)',title : '#string' , apiType:'#array',apiKind:'#([apiKind.apiKind])', description:'#string', imageUrl:'#(updateIdea.imageUrl)'} 


# Scenario: "create open api idea proposal"

#  * text mutation = 
# """mutation createOpenApiIdeaProposal($input: createOpenApiIdeaProposalInput!) {
#   createOpenApiIdeaProposal(input:$input) {
#     definition
#     description
#     id
#   }
# }"""

#   * def openApiProposal = jsonData.createOpenApiIdeaProposalInput
#   And request { query: '#(mutation)' , variables:{input : '#(openApiProposal)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createOpenApiIdeaProposal
#   * print data
#   * match data == {id:'#string', definition: '#(openApiProposal.definition)', description:'#(openApiProposal.description)'} 

# Scenario: "create graphql idea proposal"

#  * text mutation = 
# """mutation createGraphQlIdeaProposal($input: createGraphQlIdeaProposalInput!) {
#   createGraphQlIdeaProposal(input:$input) {
#     description
#     schema
#     id
#   }
# }"""

#   * def graphqlApiProposal = jsonData.createGraphQlIdeaProposalInput
#   And request { query: '#(mutation)' , variables:{input : '#(graphqlApiProposal)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createGraphQlIdeaProposal
#   * print data
#   * match data == {id:'#string', schema: '#(graphqlApiProposal.schema)', description:'#(graphqlApiProposal.description)'} 

# Scenario: "link api to api proposal"

#  * text mutation = 
# """mutation linkApiToApiProposal($input: linkApiToApiProposalInput!) {
#   linkApiToApiProposal(input:$input) {
#     link_date
#     apiId
#     apiIdeaProposalId
#   }
# }"""

#   * def linkApiProposal = jsonData.linkApiToApiProposalInput
#   And request { query: '#(mutation)' , variables:{input : '#(linkApiProposal)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.linkApiToApiProposal
#   * print data
#   * match data == {link_date:'#string', apiId: '#(linkApiProposal.apiId)', apiIdeaProposalId:'#(linkApiProposal.apiIdeaProposalId)'} 

   

# Scenario: "changeApiStatusByUser"

#  * text mutation = 
# """mutation changeApiStatus($input: changeApiStatusInput!) {
#   changeApiStatus(input: $input) {
#       apiId
#       title
#       shortDescription
#       apiType
#       status
#       imageUrl
#       apiKind
#       numOfSubscribers
#       subscribed
#       owner{
#         id
#         picture_url
#       ... on userIdentifier {
#         id
#         firstName
#         lastName
#         picture_url
#       }
#       }
#   }
# }"""
   
#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(apiShowcaseInfoUser.owner.id)', apiId:'#(apiShowcaseInfoUser.apiId)', status: '#(apiShowcaseInfoUser.status)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.changeApiStatus
#   * print data
#   * match data == apiShowcaseInfoUser


# Scenario: "changeApiStatusByCompany"

#  * text mutation = 
# """mutation changeApiStatus($input: changeApiStatusInput!) {
#   changeApiStatus(input: $input) {
#       apiId
#       title
#       shortDescription
#       apiType
#       status
#       imageUrl
#       apiKind
#       numOfSubscribers
#       subscribed
#       owner{
#         id
#         picture_url
#       ... on companyIdentifier {
#         id
#         name
#         picture_url
#       }
#       }
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(apiShowcaseInfoCompany.owner.id)', apiId:'#(apiShowcaseInfoCompany.apiId)', status: '#(apiShowcaseInfoCompany.status)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.changeApiStatus
#   * print data
#   * match data == apiShowcaseInfoCompany

# Scenario: "create graphql api"

#  * text mutation = 
# """mutation createGraphQlApi($input: createGraphQLApiInput!) {
#     createGraphQlApi(input: $input) {
#       apiId
#       apiType
#       apiUrl
#       graphQlSchema
#       longDescription
#       picture_url
#       shortDescription
#       status
#       title
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId:'#(entity.entityId)', apiId:'#(graphQlBasicInfo.apiId)', apiType:'#(graphQlBasicInfo.apiType)', apiUrl:'#(graphQlBasicInfo.apiUrl)', graphQlSchema:'#(graphQlBasicInfo.graphQlSchema)', title:'#(graphQlBasicInfo.title)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createGraphQlApi
#   * print data
#   * match data == graphQlBasicInfo



# Scenario: "update graphql api"

#  * text mutation = 
# """mutation updateGraphQlApi($input: updateGraphQlInput!) {
#     updateGraphQlApi(input: $input) {
#       apiId
#       apiType
#       apiUrl
#       graphQlSchema
#       longDescription
#       picture_url
#       shortDescription
#       status
#       title
#   }
# }"""

#   * set graphQlBasicInfo.entityId = "uzair"
#   * set graphQlBasicInfo.apiType = ["EDUCATION"]
#   * remove graphQlBasicInfo.status 
#   And request { query: '#(mutation)' , variables:{input : '#(graphQlBasicInfo)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.updateGraphQlApi
#   * print data
#   * remove graphQlBasicInfo.entityId
#   * set graphQlBasicInfo.status = response.data.updateGraphQlApi.status
#   * match data == graphQlBasicInfo

# Scenario Outline: CREATE API IDEA MUTATION  WHEN entityId= "uzair" and apiIdeaId= <apiIdeaId> and title= <title> and apiType= <apiType> and apiKind= <apiKind> and description=<description>

#  * text mutation = 
# """mutation createApiIdea($input: createApiIdeaInput!) {
#   createApiIdea(input:$input) {
#     apiKind
#     apiType
#     description
#     id
#     title
#     imageUrl
#   }
# }"""

#   * set apiIdeaBasicInfo.id = id
#   * set apiIdeaBasicInfo.apiKind = apiKind
#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entity.entityId)', apiIdeaId: '#(id)', title: '#(title)', apiType: '#(apiType)', apiKind:'#(apiKind)', description:'#(description)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response   
#   * match response.data.createApiIdea == expected

#     Examples:
#         | id!         | title!             | apiType!                 | apiKind!          | description!        | imageUrl!  | expected!                                                                                   
#         | "631"       | "test title"       | ["CRM"]                  | ["OPENAPI"]       | "test description"  | ""         | '#(apiIdeaBasicInfo)'
#         | "632"       | "test title"       | ["CRM"]                  | ["GRAPHQL"]       | "test description"  | ""         | '#(apiIdeaBasicInfo)'
       

# Scenario: "update api idea"

#  * text mutation = 
# """mutation updateApiIdea($input: updateApiIdeaInput!) {
#   updateApiIdea(input:$input) {
#     apiKind
#     apiType
#     description
#     id
#     title
#     imageUrl
#   }
# }"""

#   * set apiIdeaBasicInfo.imageUrl = "https://picture.com"
#   And request { query: '#(mutation)' , variables:{input : {entityId: '#(entity.entityId)', apiIdeaId: '#(apiIdeaBasicInfo.id)', imageUrl:'#(apiIdeaBasicInfo.imageUrl)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.updateApiIdea
#   * print data
#   * set apiIdeaBasicInfo.imageUrl = response.data.updateApiIdea.imageUrl
#   * match data == apiIdeaBasicInfo


# Scenario: "create open api idea proposal"

#  * text mutation = 
# """mutation createOpenApiIdeaProposal($input: createOpenApiIdeaProposalInput!) {
#   createOpenApiIdeaProposal(input:$input) {
#     definition
#     description
#     id
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{ input: {entityId:'#(entity.entityId)', description: '#(openApiIdeaProposalBasicInfo .description)', apiIdeaId:'#(openApiIdeaProposalBasicInfo .apiIdeaId)', definition:'#(openApiIdeaProposalBasicInfo .definition)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createOpenApiIdeaProposal
#   * print data
#   * remove openApiIdeaProposalBasicInfo.apiIdeaId
#   * match data == openApiIdeaProposalBasicInfo

# Scenario: "create graphql idea proposal"

#  * text mutation = 
# """mutation createGraphQlIdeaProposal($input: createGraphQlIdeaProposalInput!) {
#   createGraphQlIdeaProposal(input:$input) {
#     description
#     schema
#     id
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', description: '#(graphQlIdeaProposalBasicInfo.description)', apiIdeaId:'#(graphQlIdeaProposalBasicInfo.apiIdeaId)', schema:'#(graphQlIdeaProposalBasicInfo.schema)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createGraphQlIdeaProposal
#   * print data
#   * remove graphQlIdeaProposalBasicInfo.apiIdeaId
#   * match data == graphQlIdeaProposalBasicInfo

# Scenario: "link api to api proposal"

#  * text mutation = 
# """mutation linkApiToApiProposal($input: linkApiToApiProposalInput!) {
#   linkApiToApiProposal(input:$input) {
#     link_date
#     apiId
#     apiIdeaProposalId
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : {entityId:'#(entity.entityId)', apiId:'#(linkApiToApiProposalOutput.apiId)', apiIdeaProposalId:'#(linkApiToApiProposalOutput.apiIdeaProposalId)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.linkApiToApiProposal
#   * print data
#   * match data == linkApiToApiProposalOutput

# Scenario: "approves link api to api proposal"

#  * text mutation = 
# """mutation approveLinkApiToApiProposal($input: approveLinkApiToApiProposalInput!) {
#   approveLinkApiToApiProposal(input:$input) {
#     apiId
#     apiIdeaProposalId
#     approval
#     approvalDate
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : {entityId: '#(entity.entityId)', apiId: '#(approveApiProposal.apiId)', apiIdeaProposalId:'#(approveApiProposal.apiIdeaProposalId)', approval:'#(approveApiProposal.approval)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.approveLinkApiToApiProposal
#   * print data
#   * match data == approveApiProposal

# Scenario: "react on api idea"

#  * text mutation = 
# """mutation reactOnApiIdea($input: reactOnApiIdeaInput!) {
#   reactOnApiIdea(input:$input) {
#     apiIdeaId
#     by
#     reaction
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : '#(reactOnApiIdeaOutput)'}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.reactOnApiIdea
#   * print data
#   * match data == reactOnApiIdeaOutput 

# Scenario: "create api idea comment by user"

#  * text mutation = 
# """mutation createApiIdeaComment($input: createApiIdeaCommentInput!) {
#   createApiIdeaComment(input:$input) {
#     apiIdeaId
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
#     createdAt
#     id
#     text
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : {apiIdeaId:'#(apiIdeaCommentInfo.apiIdeaId)', by:'#(apiIdeaCommentInfo.by.id)', text:'#(apiIdeaCommentInfo.text)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createApiIdeaComment
#   * print data
#   * match data == apiIdeaCommentInfo 

# Scenario: "create api idea comment by company"

#  * text mutation = 
# """mutation createApiIdeaComment($input: createApiIdeaCommentInput!) {
#   createApiIdeaComment(input:$input) {
#    apiIdeaId
#     by {
#       id
#       picture_url
#       ... on companyIdentifier {
#         id
#         name
#         picture_url
#       }
#     }
#     createdAt
#     id
#     text
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : {apiIdeaId:'#(apiIdeaCommentInfoCompany.apiIdeaId)', by:'#(apiIdeaCommentInfoCompany.by.id)', text:'#(apiIdeaCommentInfoCompany.text)'}}}
#   When method POST
#   * match karate.range(200,210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.createApiIdeaComment
#   * print data
#   * match data == apiIdeaCommentInfoCompany
