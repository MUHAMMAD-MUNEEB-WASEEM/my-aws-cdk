function fn() {
  var env = karate.env; // get system property 'karate.env'
  
  karate.log('karate.env system property was:', env);
  
  if (!env) {
    env = 'dev';
  }

  var config = {
    env: env,
    myVarName: 'someValue',
    key:"	da2-uin2g7huibgmbdfdc46z36smou",
    url:"https://qzs3ffdm25ay5gryldhvxx6z3q.appsync-api.us-east-1.amazonaws.com/graphql",
    token:"eyJraWQiOiI4U1VvR3IrTVZPOUhTWmpZREEyWlpuRG5SMXRjUUF6S3pyb1RqQTNyUUFjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMmVmNTU0NC05N2M3LTQyNGUtYWEyMy1jMDg1NmEzZDE5Y2UiLCJldmVudF9pZCI6IjkwNjcwMzhhLTZmZTctNDIyOC1iMTQ2LTg2NGYzOTFlZGVjZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTk4OTM0MDQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2NPN1ZoRnBlTyIsImV4cCI6MTYxOTg5NzAwNCwiaWF0IjoxNjE5ODkzNDA0LCJqdGkiOiI5ZTZiOWM2YS0wMjc2LTQ0ZDItOGNkZi0yYzZiMGM3NjkwMTEiLCJjbGllbnRfaWQiOiJobGVyYzFxdWI0azViODVuZ2xtbDNjZjdpIiwidXNlcm5hbWUiOiJ1emFpciJ9.SyrBPI2hHNrIk8noeXGrizCFak01YOn-X93WlvDq20E6GT9uhxhYm6DhdgcUat7yKnsQkTidWCb-__ut4LR1sFP9c9EYPJoJHA2b0bgouzFmaqQLJ96kugxRu1ikUz43e6bSk9_lcszT7s_bkT1I6q9sBRZBdsZMH69wDAz25gMu9g1SZjd4vDG-LIfrObQYpPbT96qONSEM-eWQxxy8eS3-jdnucsc6AddWICi3mhoEcoDVsvbQMRA8CcMMt-PWCtOCwgGzZyYoGJKmQIPYADUVkGGv2-6BSwyw76dTDWBMKnFJ4F0Dp78mGYy5SDPwX527GZT5M37wHavTkga6eg",
    token2:"eyJraWQiOiI4U1VvR3IrTVZPOUhTWmpZREEyWlpuRG5SMXRjUUF6S3pyb1RqQTNyUUFjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjN2JhMTEzNC04ZTFhLTRmZDQtYmQ4OS02OWQ5MDhmMDA5YmIiLCJldmVudF9pZCI6IjEyMTk3ZTgxLTk2NzQtNGUwZi1iMmViLTBjZWZhNWEwOTAwZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTk4NjM5ODUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2NPN1ZoRnBlTyIsImV4cCI6MTYxOTg2NzU4NSwiaWF0IjoxNjE5ODYzOTg1LCJqdGkiOiJkYTU1MWUxYS00ZDVjLTRmZGItYTE2Ny00MDY3OWQ3M2Y5OTUiLCJjbGllbnRfaWQiOiJobGVyYzFxdWI0azViODVuZ2xtbDNjZjdpIiwidXNlcm5hbWUiOiJ0YW56ZWVsIn0.khZ-HrUEjKQizZswq0O_7sLIeiWJUhF5ba4o1m3f1nTpGNqkJshpjdHPt9h_JeCLwtApZ8nzYKZ7gkqbLPi5JaPWrTpGKE2MxsxB_5OxAc7DNPfRf6Gd32rQ_iVgGH_15xM5ruUVvyuxEFOpfj5YT1nkveqiEADAI8DXNzxReI625NDvHMnByQJ0KbmthTqL4RrL02MOCvvYfXBYMdHjjief6sDFf-fecooEWe_sci1zgxikbbXatO3MVjYDRYEaheKitp6DTOhzUHlydKen2iI9VguHxCDQ3YjexibgNcnIXh4Fl57ocuEF7VYW8Jz3jSmScVTXAHhxLF0y6pKiGg"
  }

  if (env == 'dev') {
    var API_URL = karate.properties['karate.API_URL'] || config.url
    var API_KEY = karate.properties['karate.API_KEY'] || config.key   
    var ACCESS_TOKEN = karate.properties['karate.ACCESS_TOKEN'] || config.token
    var ACCESS_TOKEN_2 = karate.properties['karate.ACCESS_TOKEN'] || config.token2
    config.API_URL = API_URL
    config.API_KEY = API_KEY
    config.ACCESS_TOKEN = ACCESS_TOKEN
    config.ACCESS_TOKEN_2 = ACCESS_TOKEN_2

    karate.log('************************** dev  ******************************', config.env);
    karate.log('************************** API URL ******************************', config.API_URL);
    karate.log('************************** API KEY ******************************', config.API_KEY);
    karate.log('************************** TOKEN ******************************', config.ACCESS_TOKEN);

  } else if (env == 'production') {
    // customize
    karate.log('************************** production ******************************', config.env);

  }
  return config;
}



// "followEntity": {
//   "city": "karachi",
//   "country": "pakistan",
//   "id": "tanzeel",
//   "picture_url": "",
//   "profileStatus": "UNPUBLISHED",
//   "total_followers": "#number"
// }
