Feature: ENTITY MUTATIONS

  Background:

    * url API_URL
    * def result = callonce read('../../../resources/authFeature/auth.feature') {username: 'uzair', password: 'Uzair12345!' }
    And json convertJSON = result.response
    And header Authorization = convertJSON
    # And header x-api-key = API_KEY
    * def jsonData = read('../../../resources/testData/data.json')
    # * def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}

# Scenario: "write recommendation"
 
#    * text mutation = 
#    """mutation writeRecommendation($input: writeRecommendationInput!) {
#   writeRecommendation(input:$input){
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
#     timeStamp
#     text
#   }
# }"""

#   * def writeRecommendationInp = jsonData.writeRecommendationInput
#   And request { query: '#(mutation)' , variables:{input : '#(writeRecommendationInp)'}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.writeRecommendation
#   * print data
#   * match data == {id:'#string',recommendationFor : '#(jsonData.recommendation)' ,recommendedBy:'#(jsonData.recommendation)',text:'#(writeRecommendationInp.text)', "timeStamp": '#string'} 


# Scenario: "request recommendation "
 
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

#   * def requestRecommendationInp = jsonData.requestRecommendationInput
#   And request { query: '#(mutation)' , variables:{input : '#(requestRecommendationInp)'}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.requestRecommendation
#   * print data
#   * match data == {id:'#string',message : '#(requestRecommendationInp.message)',requestedBy:'#(jsonData.recommendation)',requestedFrom:'#(jsonData.recommendation)', "timeStamp": '#string'} 

# Scenario: "delete recommendation"

#    * def result = callonce read('../../../resources/authFeature/auth.feature') { username: 'muneeb2', password: 'Muneeb12345!' }
#    And json convertJSON = result.response


#    * text mutation = 
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
    
#   * def writeRecommendationInp = jsonData.writeRecommendationInput
#   * def deleteRecommendationInp = jsonData.deleteRecommendationInput
#   And request { query: '#(mutation)' , variables:{input : '#(deleteRecommendationInp)'}}
#   And header Authorization = convertJSON

#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.deleteRecommendation
#   * print data
#   * match data == {id:'#string',recommendationFor : '#(jsonData.recommendation)' ,recommendedBy:'#(jsonData.recommendation)',text:'#string', "timeStamp": '#string'} 



# Scenario: "cancel recommendation "
 
#    * text mutation = 
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

#   * def cancelRecommendationRequestInp = jsonData.cancelRecommendationRequestInput
#   * def requestRecommendationInp = jsonData.requestRecommendationInput
#   And request { query: '#(mutation)' , variables:{input : '#(cancelRecommendationRequestInp)'}}
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response
#   * match responseType == 'json'  
#   * def data = response.data.cancelRecommendationRequest
#   * print data
#   * match data == {id:'#string',message : '#string',requestedBy:'#(jsonData.recommendation)',requestedFrom:'#(jsonData.recommendation)', "timeStamp": '#string'} 

