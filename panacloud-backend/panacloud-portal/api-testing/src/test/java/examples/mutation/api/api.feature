Feature: ENTITY MUTATIONS

  Background:

    * url API_URL
    # And header x-api-key = API_KEY
    * def jsonData = read('../../../data.json')
    And header Authorization = ACCESS_TOKEN
    * def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}


Scenario: "create open api"

 * text mutation = 
"""mutation createOpenApi($input: createOpenApiInput!) {
  createOpenApi(input: $input) {
    apiId
    title
    apiType
    apiRootUrl
    shortDescription
    longDescription

  }
}"""

  * def openApi = jsonData.createOpenApiInput
  And request { query: '#(mutation)' , variables:{input : '#(openApi)'}}
  When method POST
  * match karate.range(200,210) contains responseStatus
  * print response
  * match responseType == 'json'  
  * def data = response.data.createOpenApi
  * print data
  * match data == {apiId:'#(openApi.apiId)',title : '#(openApi.title)' , apiType:'#([openApi.apiType])',apiRootUrl:'#(openApi.apiRootUrl)', shortDescription:'#string', longDescription:'#string'} 

Scenario: "changeApiStatus"

 * text mutation = 
"""mutation changeApiStatus($input: changeApiStatusInput!) {
  changeApiStatus(input: $input) {
      apiId
      title
      shortDescription
      apiType
      status
      imageUrl
      apiKind
      numOfSubscribers
      owner{
          id
          picture_url
      }
  }
}"""
  * def apiKind = {apiKind: '#? _ == "GRAPHQL" || _ == "OPENAPI"'}
  * def openApi = jsonData.createOpenApiInput
  * def profilePicture = jsonData.profilePicture
  * def changeApiStatus = jsonData.changeApiStatusInput
  And request { query: '#(mutation)' , variables:{input : '#(changeApiStatus)'}}
  When method POST
  * match karate.range(200,210) contains responseStatus
  * print response
  * match responseType == 'json'  
  * def data = response.data.changeApiStatus
  * print data
  * match data == {apiId:'#(openApi.apiId)',title : '#(openApi.title)',apiType:'#([openApi.apiType])', shortDescription:'#string', status:'#(changeApiStatus.status)', apiKind:'#(apiKind.apiKind)', numOfSubscribers:'#number', owner:'#object', imageUrl:'#(profilePicture.picture_url)'} 
