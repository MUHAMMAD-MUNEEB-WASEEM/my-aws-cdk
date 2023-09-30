Feature: API MUTATIONS

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
  
# #Create open api error testing

# Scenario Outline: CREATE OPEN API MUTATION ERROR WHEN entityId= <entityId> and apiId= <apiId> and title= <title> and apiType= <apiType> and apiRootUrl= <apiRootUrl> and openApiDef=<openApiDef>

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

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)', title: '#(title)', apiType: '#(apiType)', apiRootUrl:'#(apiRootUrl)', openApiDef:'#(openApiDef)', longDescription:'#(longDescription)', shortDescription:'#(shortDescription)', releaseNotes: '#(releaseNotes)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         |  apiId! | title!              |apiType!                           |apiRootUrl!           | openApiDef! | longDescription!         | shortDescription!        | releaseNotes!  | expected!                                                                                     
#         | ""                | "1"     |  "apitest"          |"EDUCATION"                        |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |`inputs "apiId", "entityId", "title", "openApiDef" and "apiRootUrl" cannot be empty strings` |
#         | "uzair"           | ""      |  "apitest"          |"EDUCATION"                        |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |`inputs "apiId", "entityId", "title", "openApiDef" and "apiRootUrl" cannot be empty strings` |
#         | "uzair"           | "1"     |  ""                 |"EDUCATION"                        |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |`inputs "apiId", "entityId", "title", "openApiDef" and "apiRootUrl" cannot be empty strings` |
#         | "uzair"           | "1"     |  "apitest"          |"EDUCATION"                        |""                    |"def"        | "test long description"  | "test short description" | "test release" |`inputs "apiId", "entityId", "title", "openApiDef" and "apiRootUrl" cannot be empty strings` |
#         | "uzair"           | "1"     |  "apitest"          |"EDUCATION"                        |"apiRootUrl.com"      |""           | "test long description"  | "test short description" | "test release" |`inputs "apiId", "entityId", "title", "openApiDef" and "apiRootUrl" cannot be empty strings` |
#         | "uzair"           | "200"   |  "api test"         |"CRM"                              |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |'this apiId is not available'                                                                |
#         | "uzair"           | "@"     |  "api test"         |"CRM"                              |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |"the apiId can only have numbers, alphabets, underscores and dashes"                         |
#         | "uzair"           | "207"   |  "api test"         |["EDUCATION", "DATA", "AI", "CRM"] |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |'You cannot select more than 3 api types'                                                    |
#         | "uzair"           | "208"   |  "api test"         |[]                                 |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |'you need to select atleast 1 api type'                                                      |
#         | "tanzeel"         | "200"   |  "api test"         |"CRM"                              |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |"the user is not permitted to perform this action"                                           |
#         | "anwar"           | "200"   |  "api test"         |"CRM"                              |"apiRootUrl.com"      |"def"        | "test long description"  | "test short description" | "test release" |"entity not found"                                                                           |

#Create open api version error testing

Scenario Outline: CREATE OPEN API VERSION MUTATION ERROR WHEN entityId= <entityId> and apiId= <apiId> and apiRootUrl= <apiRootUrl> and openApiDef=<openApiDef>

  * text mutation = 
 """mutation createOpenApiVersion($input: createOpenApiVersionInput!) {
    createOpenApiVersion(input: $input) {
      testingSubscriptions {
      status
      subscriptionCreationDate
      subscriptionId
    }
    versionDetails {
      apiRootUrl
      dateCreated
      datePublished
      openApiDef
      releaseNotes
      versionId
      versionNumber
      versionStatus
    }
     }
 }"""

  And request { query: '#(mutation)' , variables:{input : {entityId:'#(entityId)', apiId: '#(apiId)', apiRootUrl:'#(apiRootUrl)', openApiDef: '#(openApiDef)', releaseNotes: '#(releaseNotes)'}}}
  When method POST
  * match karate.range(200, 210) contains responseStatus
  * print response    
  * match response.errors[0].message == expected

    Examples:
        | entityId!         | apid!             |apiRootUrl!           | openApiDef!  | releaseNotes!  | expected!                                                                                     
        | ""                | "1"               |"apiRootUrl.com"      |"def"         | "test release" | `inputs "apiId", "entityId", "apiRootUrl" and "openApiDef" cannot be empty strings` |
        | "uzair"           | ""                |"apiRootUrl.com"      |"def"         | "test release" | `inputs "apiId", "entityId", "apiRootUrl" and "openApiDef" cannot be empty strings` |
        | "uzair"           | "1"               |""                    |"def"         | "test release" | `inputs "apiId", "entityId", "apiRootUrl" and "openApiDef" cannot be empty strings` |
        | "uzair"           | "1"               |"apiRootUrl.com"      |""            | "test release" | `inputs "apiId", "entityId", "apiRootUrl" and "openApiDef" cannot be empty strings` |
        | "uzair"           | "901"             |"apiRootUrl.com"      |"def"         | "test release" | 'either the api doesnt exist or the entity doesnt own it'                           |
        | "uzair"           | "282"             |"apiRootUrl.com"      |"def"         | "test release" | 'you cannot create openApi versions on a graphQl api'                               |
        | "uzair"           | "283"             |"apiRootUrl.com"      |"def"         | "test release" | 'Please publish the unpublished version to create a new version'                    |
        | "tanzeel"         | "283"             |"apiRootUrl.com"      |"def"         | "test release" | "the user is not permitted to perform this action"                                  |
        | "anwar"           | "283"             |"apiRootUrl.com"      |"def"         | "test release" | 'entity not found'                                                                  |
        



#change api status error testing

# Scenario Outline: CHANGE API STATUS ERROR WHEN entityId= <entityId> and apiId= <apiId> and status= <status>

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

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)', status: '#(status)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId!   | status!                | expected!                                                                                     
#         | ""                | ""       | "PRIVATE"              | `inputs "apiId" and "entityId" cannot be empty strings`    |
#         | "uzair"           | ""       | "PRIVATE"              | `inputs "apiId" and "entityId" cannot be empty strings`    |
#         | "uzair"           | "708"    | "PUBLIC"               | 'Api is already PUBLIC'                                    |
#         | "uzair"           | "901"    | "PUBLIC"               | 'either the api doesnt exist or the entity doesnt own it'  |
#         | "uzair"           | "264"    | "PUBLIC"               | 'The api is still underdevelopment. Please publish the api to change its status'  |
#         | "uzair"           | "186"    | "UNDERDEVELOPMENT"     | "this functionality has not been implemented yet"          |
#         | "tanzeel"         | "901"    | "PUBLIC"               | "the user is not permitted to perform this action"         |
#         | "ahmed"           | "901"    | "PUBLIC"               | "entity not found"                                         |

#Error: add this in above: 'You cannot make your api private while it is linekd to api ideas. Please remove all the links to make your api private'       


# #create graphql api error testing        
# Scenario Outline: CREATE GRAPHQL API MUTATION ERROR WHEN entityId= <entityId> and apiId= <apiId> and title= <title> and apiType= <apiType> and apiUrl= <apiUrl> and graphQlSchema=<graphQlSchema>

#   * text mutation = 
#   """mutation createGraphQlApi($input: createGraphQLApiInput!) {
#     createGraphQlApi(input: $input) {
#       apiId
#       apiType
#       apiKind'
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

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)', title: '#(title)', apiType: '#(apiType)', apiUrl:'#(apiUrl)', graphQlSchema:'#(graphQlSchema)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         |  apiId! | title!              |apiType!                           |apiUrl!               | graphQlSchema!        | longDescription!         | shortDescription!        | releaseNotes!    | expected!                                                                                     
#         | ""                | "1"     |  "graphql test"     |"EDUCATION"                        |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | `inputs "apiId", "entityId", "title", "graphQlSchema" and "apiUrl" cannot be empty strings`|
#         | "uzair"           | ""      |  "graphql test"     |"EDUCATION"                        |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | `inputs "apiId", "entityId", "title", "graphQlSchema" and "apiUrl" cannot be empty strings`|
#         | "uzair"           | "1"     |  ""                 |"EDUCATION"                        |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | `inputs "apiId", "entityId", "title", "graphQlSchema" and "apiUrl" cannot be empty strings`|
#         | "uzair"           | "1"     |  "graphql test"     |"EDUCATION"                        |""                    |"test Schema"          | "test long description"  | "test short description" | "test release"   | `inputs "apiId", "entityId", "title", "graphQlSchema" and "apiUrl" cannot be empty strings`|
#         | "uzair"           | "1"     |  "graphql test"     |"EDUCATION"                        |"apiUrl.com"          |""                     | "test long description"  | "test short description" | "test release"   | `inputs "apiId", "entityId", "title", "graphQlSchema" and "apiUrl" cannot be empty strings`|
#         | "uzair"           | "201"   |  "graphql test"     |"CRM"                              |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | 'this apiId is not available'                                                              |
#         | "uzair"           | "@"     |  "graphql test"     |"CRM"                              |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | "the apiId can only have numbers, alphabets, underscores and dashes"                       |
#         | "uzair"           | "310"   |  "graphql test"     |["EDUCATION", "DATA", "AI", "CRM"] |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | 'You cannot select more than 3 api types'                                                  |
#         | "uzair"           | "310"   |  "graphql test"     |[]                                 |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | 'you need to select atleast 1 api type'                                                    |
#         | "tanzeel"         | "306"   |  "graphql test"     |"CRM"                              |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | "the user is not permitted to perform this action"                                         |
#         | "anwar"           | "306"   |  "graphql test"     |"CRM"                              |"apiUrl.com"          |"test Schema"          | "test long description"  | "test short description" | "test release"   | "entity not found"                                                                         |
        
#update open api error testing

# Scenario Outline: UPDATE API INFO MUTATION ERROR WHEN entityId= <entityId> and apiId= <apiId> and title= <title> and apiType= <apiType> and apiRootUrl= <apiRootUrl> and openApiDef=<openApiDef> and shortDescription= <shortDescription> and longDescription=<longDescription>

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

#   And request { query: '#(mutation)' , variables:{input :  {entityId:'#(entityId)', apiId: '#(apiId)', title: '#(title)', apiType: '#(apiType)', longDescription: '#(longDescription)', shortDescription: '#(shortDescription)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

    # Examples:
    #     | entityId!         |  apiId! | title!              |apiType!                           | openApiDef! | shortDescription    | longDescription     | expected!                                                                                     
    #     | "muneeb"          | ""      |  "Api test update"  |"CRM"                              |"Def update" | "short test update" | "long test update"  | `inputs "apiId" and "entityId" cannot be empty strings`   |
    #     | ""                | "1"     |  "Api test update"  |"CRM"                              |"Def update" | "short test update" | "long test update"  | `inputs "apiId" and "entityId" cannot be empty strings`   |
    #     | "uzair"           | "901"   |  "Api test update"  |"CRM"                              |"def"        | "short test update" | "long test update"  | 'either the api doesnt exist or the entity doesnt own it' |
    #     | "uzair"           | "185"   |  "Api test update"  |["EDUCATION", "DATA", "AI", "CRM"] |"def"        | "short test update" | "long test update"  | 'You cannot select more than 3 api types'                 |
    #     | "uzair"           | "185"   |  "Api test update"  |[]                                 |"def"        | "short test update" | "long test update"  | 'select atleast 1 api type'                               |
    #     | "tanzeel"         | "901"   |  "Api test update"  |"CRM"                              |"def"        | "short test update" | "long test update"  | "the user is not permitted to perform this action"        |
    #     | "anwar"           | "901"   |  "Api test update"  |"CRM"                              |"def"        | "short test update" | "long test update"  | "entity not found"                                        |

# #Create api idea error testing

# Scenario Outline: CREATE API IDEA MUTATION ERROR WHEN entityId= <entityId> and apiIdeaId= <id> and title= <title> and apiType= <apiType> and apiKind= <apiKind> and description=<description>

#  * text mutation = 
# """mutation createApiIdea($input: createApiIdeaInput!) {
#   createApiIdea(input:$input) {
#     apiKind
#       apiType
#       description
#       id
#       title
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : {entityId: '#(entityId)', apiIdeaId:'#(id)',title : '#(title)' , apiType:'#(apiType)',apiKind:'#(apiKind)', description:'#(description)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | id!         | title!             | apiType!                           | apiKind!          | description!       | expected!                                                                                     
#         | ""                | "1"         | "api test"         | "EDUCATION"                        | ["OPENAPI"]       | "test api idea"    | `inputs "apiIdeaId", "entityId","description", "requirements" and "title" cannot be empty strings` |
#         | "uzair"           | ""          | "api test"         | "EDUCATION"                        | ["OPENAPI"]       | "test api idea"    | `inputs "apiIdeaId", "entityId","description", "requirements" and "title" cannot be empty strings` |
#         | "uzair"           | "1"         | ""                 | "EDUCATION"                        | ["OPENAPI"]       | "test api idea"    | `inputs "apiIdeaId", "entityId","description", "requirements" and "title" cannot be empty strings` |
#         | "uzair"           | "1"         | "api test"         | "EDUCATION"                        | ["OPENAPI"]       | ""                 | `inputs "apiIdeaId", "entityId","description", "requirements" and "title" cannot be empty strings` |
#         | "uzair"           | "270"       | "api test"         | ["CRM"]                            | ["OPENAPI"]       | "test api idea"    | "this api-idea id is not available"                                                                |
#         | "uzair"           | "@"         | "api test"         | ["CRM"]                            | ["OPENAPI"]       | "test api idea"    | "the apiIdeaId can only have numbers, alphabets, underscores and dashes"                           |
#         | "uzair"           | "271"       | "api test"         | ["EDUCATION", "DATA", "AI", "CRM"] | ["OPENAPI"]       | "test api idea"    | 'You cannot select more than 3 api types'                                                          |
#         | "uzair"           | "002"       | "api test"         | []                                 | ["OPENAPI"]       | "test api idea"    | 'you need to select atleast 1 api type'                                                            |
#         | "uzair"           | "001"       | "api test"         | ["CRM"]                            | []                | "test api idea"    | 'you need to select atleast 1 api kind'                                                            |
#         | "tanzeel"         | "003"       | "api test"         | ["EDUCATION"]                      | ["OPENAPI"]       | "test api idea"    | "the user is not permitted to perform this action"                                                 |
#         | "anwar"           | "001"       | "api test"         | ["CRM"]                            | []                | "test api idea"    | "entity not found"                                                                                 |


# #update api idea error testing

# Scenario Outline: UPDATE API IDEA MUTATION ERROR WHEN entityId= <entityId> and apiIdeaId= <apiIdeaId> and <expected>

#  * text mutation = 
# """mutation updateApiIdea($input: updateApiIdeaInput!) {
#   updateApiIdea(input:$input) {
#     apiKind
#     apiType
#     description
#     id
#     title
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiIdeaId:'#(apiIdeaId)',title : '#(title)' , description:'#(description)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiIdeaId!  | title!                      | description!       | expected!                                                                                     
#         | ""                | "1"         | "test api idea"             | "update api idea"  | `inputs "apiIdeaId" and "entityId" cannot be empty strings` |
#         | "uzair"           | ""          | "test api idea"             | "update api idea"  | `inputs "apiIdeaId" and "entityId" cannot be empty strings` |
#         | "uzair"           | "001"       | "test api idea"             | "update api idea"  | "api idea not found"                                        |  
#         | "uzair"           | "504"       | "test api idea"             | "update api idea"  | 'this user is not permitted to update this api idea'        |
#         | "tanzeel"         | "001"       | "test api idea"             | "update api idea"  | "the user is not permitted to perform this action"          |
#         | "anwar"           | "503"       | "test api idea"             | "update api idea"  | "entity not found"                                          |  



# #react on api idea

# Scenario Outline: REACT ON API IDEA MUTATION ERROR WHEN by= <by> and apiIdeaId= <apiIdeaId> and reaction= <reaction> 

#  * text mutation = 
# """mutation reactOnApiIdea($input: reactOnApiIdeaInput!) {
#   reactOnApiIdea(input:$input) {
#     apiIdeaId
#     by
#     reaction
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { by: '#(by)', apiIdeaId: '#(apiIdeaId)', reaction:'#(reaction)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | by!               | apiIdeaId!  | reaction!                | expected!                                                                                     
#         | ""                | "1"         | "LIKED"                  | `inputs "apiIdeaId" and "by" cannot be empty strings`       |
#         | "uzair"           | ""          | "LIKED"                  | `inputs "apiIdeaId" and "by" cannot be empty strings`       |
#         | "uzair"           | "100"       | "LIKED"                  | "api idea not found"                                        |                                        
#         | "tanzeel"         | "100"       | "LIKED"                  | "the user is not permitted to perform this action"          | 
#         | "anwar"           | "100"       | "LIKED"                  | "entity not found"                                          | 
        

# #Create api review error testing

# Scenario Outline: CREATE API REVIEW MUTATION ERROR WHEN by= <by> and apiId= <apiId> and title= <title> and text= <text> and stars= <stars>

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

#   And request { query: '#(mutation)' , variables:{input : {apiId:'#(apiId)', stars:'#(stars)', text:'#(text)', title:'#(title)', by:'#(by)'}}}
#   And header Authorization = convertJSON
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | by!          | apiId!  | title!              |text!            |stars!     | expected!                                                                                     
#         | ""           | "1"     |  "test review"      |"Good"           |4          | `inputs "apiId", "by", "title", "text" and "stars" cannot be empty strings`            |
#         | "uzair"      | ""      |  "test review"      |"Good"           |4          | `inputs "apiId", "by", "title", "text" and "stars" cannot be empty strings`            |
#         | "uzair"      | "1"     |  ""                 |"Good"           |4          | `inputs "apiId", "by", "title", "text" and "stars" cannot be empty strings`            |
#         | "uzair"      | "1"     |  "test review"      |""               |4          | `inputs "apiId", "by", "title", "text" and "stars" cannot be empty strings`            |
#         | "uzair"      | "1"     |  "test review"      |"Good"           |0          | `inputs "apiId", "by", "title", "text" and "stars" cannot be empty strings`            |
#         | "uzair"      | "181"   |  "test review"      |"Good"           |6          | "stars cannot be less than 0 and greater than 5"                                       |
#         | "uzair"      | "001"   |  "test review"      |"Good"           |4          | "api not found"                                                                        |
#         | "uzair"      | "194"   |  "test review"      |"Good"           |4          | "entity owns this api. They cannot review their own apis"                              |
#         | "uzair"      | "279"   |  "test review"      |"Good"           |4          | "entity does not subscribe to this api. They need to subscribe to an api to review it" |
#         | "uzair"      | "280"   |  "test review"      |"Good"           |4          | "entity has already reviewed this api"                                                 |
#         | "tanzeel"    | "194"   |  "test review"      |"Good"           |4          | "the user is not permitted to perform this action"                                     |
#         | "anwar"      | "194"   |  "test review"      |"Good"           |4          | "entity not found"                                                                     |

 

# #delete api review error testing

# Scenario Outline: DELETE API REVIEW MUTATION ERROR WHEN apiReviewId= <apiReviewId> and entityId= <entityId> and title= <title> and text= <text> and stars= <stars>

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
 
#    And request { query: '#(mutation)' , variables:{input : {apiReviewId:'#(apiReviewId)', entityId:'#(entityId)'}}}
#    And header Authorization = convertJSON
#    When method POST
#    * match karate.range(200, 210) contains responseStatus
#    * print response    
#    * match response.errors[0].message == expected
 
#      Examples:
#          | entityId!          | apiReviewId!                                  | expected!                                                                                     
#          | ""                 | "1"                                           | `inputs "apiReviewId" and "entityId" cannot be empty strings`            |
#          | "uzair"            | ""                                            | `inputs "apiReviewId" and "entityId" cannot be empty strings`            |
#          | "uzair"            | "901"                                         | `api Review not found`                                                   |
#          | "uzair"            | "c2bd0895-b15b-defb-0898-71306b7df0e7"        | `entity doesnot own this review`                                         |
#          | "tanzeel"          | "261"                                         | "the user is not permitted to perform this action"                       |
#          | "anwar"            | "261"                                         | "entity not found"                                                       |

         
 
         

         
 

# #create open api idea proposal error testing

# Scenario Outline: CREATE OPEN API IDEA PROPOSAL MUTATION ERROR WHEN entityId= <entityId> and apiIdeaId= <apiIdeaId> and definition= <definition> and description= <description>

#  * text mutation = 
# """mutation createOpenApiIdeaProposal($input: createOpenApiIdeaProposalInput!) {
#   createOpenApiIdeaProposal(input:$input) {
#     definition
#     description
#     id
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiIdeaId: '#(apiIdeaId)', definition:'#(definition)', description:'#(description)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiIdeaId!  | definition!                 | description!        | expected!                                                                                     
#         | ""                | ""          | ""                          | ""                  | `inputs "definition","description","apiIdeaId, and "entityId" cannot be empty strings` |
#         | "uzair"           | "001"       | "test definition"           | "test description"  | "apiIdea not found"                                                                    |  
#         | "uzair"           | "004"       | "test definition"           | "test description"  | "the entity has already submitted a openApi proposal for this apiIdea"                 |
#         | "uzair"           | "71"        | "test definition"           | "test description"  | "you can only propose graphQl proposals on this api idea"                              |
#         | "tanzeel"         | "001"       | "test definition"           | "test description"  | "the user is not permitted to perform this action"                                     |
#         | "ahmed"           | "005"       | "test definition"           | "test description"  | "entity not found"                                                                     |  

# #create graphql idea proposal error testing

# Scenario Outline: CREATE GRAPHQL IDEA PROPOSAL MUTATION ERROR WHEN entityId= <entityId> and apiIdeaId= <apiIdeaId> and schema= <schema> and description= <description>

#  * text mutation = 
# """mutation createGraphQlIdeaProposal($input: createGraphQlIdeaProposalInput!) {
#   createGraphQlIdeaProposal(input:$input) {
#     description
#     schema
#     id
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiIdeaId: '#(apiIdeaId)', schema:'#(schema)', description:'#(description)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiIdeaId!  | definition!                 | schema!             | expected!                                                                                     
#         | ""                | ""          | ""                          | ""                  | `inputs "schema","description","apiIdeaId, and "entityId" cannot be empty strings`     |
#         | "uzair"           | "001"       | "test definition"           | "test schema"       | "apiIdea not found"                                                                    |  
#         | "uzair"           | "006"       | "test definition"           | "test schema"       | "the entity has already submitted a graphql proposal for this apiIdea"                 |
#         | "uzair"           | "72"        | "test definition"           | "test schema"       | "you can only propose openApi proposals on this api idea"                              |
#         | "tanzeel"         | "001"       | "test definition"           | "test schema"       | "the user is not permitted to perform this action"                                     | 
#         | "ahmed"           | "004"       | "test definition"           | "test schema"       | "entity not found"                                                                     | 

# #link api to api proposal

# Scenario Outline: LINK API TO API PROPOSAL MUTATION ERROR WHEN entityId= <entityId> and apiIdeaProposalId= <apiIdeaProposalId> and apiId= <apiId> 

#  * text mutation = 
# """mutation linkApiToApiProposal($input: linkApiToApiProposalInput!) {
#   linkApiToApiProposal(input:$input) {
#     link_date
#     apiId
#     apiIdeaProposalId
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiIdeaProposalId: '#(apiIdeaProposalId)', apiId:'#(apiId)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId!      | apiIdeaProposalId!                       | expected!                                                                                     
#         | ""                | ""          | ""                                       | `inputs "apiId", "apiIdeaProposalId" and "entityId" cannot be empty strings`       |
#         | "uzair"           | "00001"     | "test definition"                        | "ether this api doesnt exist or the user doesnt own it"                            |                                        |  
#         | "uzair"           | "280"       | "fabc9e3a-d945-1576-383c-ca4e30a37cc1"   | "api idea proposal not found"                                                      |
#         | "uzair"           | "280"       | "56bcc15d-cafc-fe36-55ef-f39141f10732"   | "this api is already linked to this api idea proposal"                             |
#         | "uzair"           | "280"       | "0abcc15c-8199-93c0-a114-179435fb0962"   | "you cannot link an open api with a graphQl idea proposal"                         | 
#         | "uzair"           | "321"       | "eebcc15c-243c-820c-36e9-1751b7344ff5"   | "you cannot link a graphql api with an openApi idea proposal"                      | 
#         | "tanzeel"         | "001"       | "6cbc9e3e-02b8-4cc5-c24a-214be8ad5e70"   | "the user is not permitted to perform this action"                                 |
#         | "ahmed"           | "321"       | "b6bc9e45-449c-abf8-f33c-21a0b3715b1f"   | "entity not found"                                                                 |  


# #approves link api to api proposal

# Scenario Outline: APPROVES LINK API TO API PROPOSAL MUTATION ERROR WHEN entityId= <entityId> and apiIdeaProposalId= <apiIdeaProposalId> and apiId= <apiId> and approval= <approval>

#  * text mutation = 
# """mutation approveLinkApiToApiProposal($input: approveLinkApiToApiProposalInput!) {
#   approveLinkApiToApiProposal(input:$input) {
#     apiId
#     apiIdeaProposalId
#     approval
#     approvalDate
#   }
# }"""

#   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiIdeaProposalId: '#(apiIdeaProposalId)', apiId:'#(apiId)', approval:'#(approval)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | entityId!         | apiId!      | apiIdeaProposalId!                       | approval!   | expected!                                                                                     
#         | ""                | ""          | ""                                       | "approves"  | `inputs "apiId", "apiIdeaProposalId" and "entityId" cannot be empty strings`     |
#         | "uzair"           | "00001"     | "02bca0c6-7f5f-b873-efcf-6740ea70c8ce"   | "approves"  | "api not found"                                                                  |  
#         | "uzair"           | "000001"    | "02bca0c6-7f5f-b873-efcf-6740ea70c8ca"   | "approves"  | "either this api idea proposal doesnt exist or the user doesnt have access to it"|
#         | "uzair"           | "280"       | "56bcc15d-cafc-fe36-55ef-f39141f10732"   | "approves"  | "api idea proposal already approves this api"                                    |
#         | "uzair"           | "235"       | "eebcc15c-243c-820c-36e9-1751b7344ff5"   | "approves"  | "this api is not linked to this api idea proposal"                               | 
#         | "tanzeel"         | "001"       | "6cbc9e3e-02b8-4cc5-c24a-214be8ad5e70"   | "approves"  | "the user is not permitted to perform this action"                               |
#         | "ahmed"           | "235"       | "d0bca17e-65a9-8ff0-86ff-7152d3217ed7"   | "approves"  | "entity not found"                                                               |  

# #create api idea comment

# Scenario Outline: CREATE API IDEA COMMENT MUTATION ERROR WHEN by= <by> and apiIdeaId= <apiIdeaId> and text= <text> 

#  * text mutation = 
# """mutation createApiIdeaComment($input: createApiIdeaCommentInput!) {
#   createApiIdeaComment(input:$input) {
#     apiIdeaId
#     by {
#       id
#       picture_url
#       ... on userIdentifier {
#         firstName
#         lastName
#         id
#         picture_url
#       }
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

#   And request { query: '#(mutation)' , variables:{input : { by: '#(by)', apiIdeaId: '#(apiIdeaId)', text:'#(text)'}}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response    
#   * match response.errors[0].message == expected

#     Examples:
#         | by!               | apiIdeaId!  | text!               | expected!                                                                                     
#         | ""                | ""          | ""                  | `inputs "by", "text" and "apiIdeaId" cannot be empty strings`   |
#         | "uzair"           | "100"       | "test Good"         | "apiIdeaNotFound"                                               |                                        
#         | "tanzeel"         | "100"       | "test Good"         | "the user is not permitted to perform this action"              |
#         | "ahmed"           | "100"       | "test Good"         | "entity not found"                                              |  

# update graphql api
#Scenario Outline: UPDATE GRAPHQL API MUTATION ERROR WHEN entityId= <entityId> and apiId= <apiId> and title= <title> and apiType= <apiType> and apiUrl= <apiUrl> and graphQlSchema=<graphQlSchema> and shortDescription= <shortDescription> and longDescription=<longDescription>

  #  * text mutation = 
  # """mutation updateGraphQlApi($input: updateGraphQlInput!) {
  #   updateGraphQlApi(input: $input) {
  #     apiId
  #     title
  #     apiType
  #     apiUrl
  #     shortDescription
  #     longDescription
  #     graphQlSchema
  #   }
  # }"""
  
  #   And request { query: '#(mutation)' , variables:{input : { entityId: '#(entityId)', apiId: '#(apiId)', title: '#(title)', apiType: '#(apiType)', apiUrl:'#(apiUrl)', graphQlSchema:'#(graphQlSchema)', shortDescription: '#(shortDescription)', longDescription:'#(longDescription)'}}}
  #   When method POST
  #   * match karate.range(200, 210) contains responseStatus
  #   * print response    
  #   * match response.errors[0].message == expected
  
  #     Examples:
  #         | entityId!         | apiId!  | title!                 |apiType!                           |apiUrl!               | graphQlSchema!  | shortDescription    | longDescription     | expected!                                                                                     
  #         | ""                | ""      | "Update Graphql test"  |"CRM"                              |"apiRootUrl.com"      |"test schema"    | "short test update" | "long test update"  | `inputs "apiId" and "entityId" cannot be empty strings`   |
  #         | "uzair"           | "901"   | "Update Graphql test"  |"CRM"                              |"apiRootUrl.com"      |"test schema"    | "short test update" | "long test update"  | 'either the api doesnt exist or the entity doesnt own it' |
  #         | "uzair"           | "311"   | "Update Graphql test"  |["EDUCATION", "DATA", "AI", "CRM"] |"apiRootUrl.com"      |"test schema"    | "short test update" | "long test update"  | 'You cannot select more than 3 api types'                 |
  #         | "uzair"           | "311"   | "Update Graphql test"  |[]                                 |"apiRootUrl.com"      |"test schema"    | "short test update" | "long test update"  | 'select atleast 1 api type'                               |
  #         | "tanzeel"         | "901"   | "Update Graphql test"  |"CRM"                              |"apiRootUrl.com"      |"test schema"    | "short test update" | "long test update"  | "the user is not permitted to perform this action"        |
  #         | "ahmed"           | "901"   | "Update Graphql test"  |"CRM"                              |"apiRootUrl.com"      |"test schema"    | "short test update" | "long test update"  | "entity not found"                                        |
  