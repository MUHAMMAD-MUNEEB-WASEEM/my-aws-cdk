Feature: SOCIAL MEDIA MUTATIONS

  Background:

    * url API_URL
    And header x-api-key = API_KEY
    * def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}
    * def entityId_1 = 'bbb@gmail.com'
    * def entityId_2 = 'ccc@gmail.com'
    * def postId = "ca552253-e1d3-4479-803c-30a3dc948d4a"
    
  Scenario: follow a user 
    
  *  text mutation =
    """query fetchAllPublicApis($input: fetchallPublicApisInput!) {
  fetchAllPublicApis(input: $input) {
    apis {
      apiId
      shortDescription
      apiType
      owner {
        id
        name
        picture_url
      }
      apiKind
      imageUrl
      numOfSubscribers
      status
      title
    }
    count
  }
}"""

  * def variables = { input : { pageSize: 1, pageNumber: 1}}
  And request { query: '#(mutation)' , variables:'#(variables)' }
  When method POST
  * match karate.range(200, 210) contains responseStatus
  * print response
  
