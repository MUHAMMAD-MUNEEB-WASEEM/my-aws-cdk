Feature: ENTITY MUTATIONS

  Background:

    * url API_URL
    # And header x-api-key = API_KEY
    * def jsonData = read('../../../data.json')
    And header Authorization = ACCESS_TOKEN
    * def isValidEmail = function(email){ return(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))}

Scenario: "create company"
 
   * text mutation = 
   """mutation createCompany($input:createCompanyInput!) {
  createCompany(input:$input){
    id
    name
    city
    country
    email
    phone_number
    headline
  }
}"""

  * def companyInfo = jsonData.companyInfo
  * print jsonData
  And request { query: '#(mutation)' , variables:{input : '#(companyInfo)'}}
  When method POST
  * match karate.range(200, 210) contains responseStatus
  * print response
  * match responseType == 'json'  
  * def data = response.data.createCompany
  * print data
  * match data == {id:'#(companyInfo.companyId)',name : '#(companyInfo.name)' , email:'#(companyInfo.email)',city:'#(companyInfo.city)',country:'#(companyInfo.country)',phone_number:'#(companyInfo.phone_number)', headline:"#string" } 

Scenario: "Update user info"

 * text mutation = 
"""mutation updateUserInfo($input: updateUserInput!) {
  updateUserInfo(input: $input) {
    id
    firstName
    lastName
    city
    country
    email
    headline
    phone_number
  }
}"""

  * def userInfo = jsonData.userInfo
  And request { query: '#(mutation)' , variables:{input : '#(userInfo)'}}
  When method POST
  * match karate.range(200,210) contains responseStatus
  * print response
  * match responseType == 'json'  
  * def data = response.data.updateUserInfo
  * print data
  * match data == {id:'#(userInfo.userId)',firstName : '#(userInfo.firstName)' , lastName:'#(userInfo.lastName)',city:'#(userInfo.city)',country:'#(userInfo.country)',phone_number:'#(userInfo.phone_number)', headline:'#(userInfo.headline)' , email:"uzairbangee@gmail.com" } 




# * text mutation =
# """mutation updateCompanyInfo($input:updateCompanyInfoInput!) {
#   updateCompanyInfo(input:$input ) {
#     id
#     name
#     city
#     country
#     phone_number
#     headline
#     email
#   }
# }"""
#   * def updateCompanyInfo = companyInfo
#   * set updateCompanyInfo.name = "panacloud"
#   * remove 
#   * def variables = { input : '#(updateCompanyInfo)'}
#   And request { query: '#(mutation)' , variables:'#(variables)' }
#   When method POST
#   * match karate.range(200, 210) contains responseStatus
#   * print response
#   * match responseType == 'json'  


