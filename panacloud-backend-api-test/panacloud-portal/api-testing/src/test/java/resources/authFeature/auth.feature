@ignore
Feature: re-usable feature to get an access token for user

Scenario: "calling auth api for access token"
    Given url 'https://84d0avxer7.execute-api.us-east-1.amazonaws.com/prod/login'
    And request { username: '#(username)' , password: '#(password)'}
    When method POST