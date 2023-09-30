function fn() {
  var env = karate.env; // get system property 'karate.env'
  
  karate.log('karate.env system property was:', env);
  
  if (!env) {
    env = 'dev';
  }

  var config = {
    env: env,
    myVarName: 'someValue',
    key:"b7gcnz3gnfgcvifcqxslwxkfse",
    url:"https://wyv7bevabve7vfjqoo6j3ipf3y.appsync-api.us-east-1.amazonaws.com/graphql",
    token:"eyJraWQiOiIyVXRlUHpCOVBUN1cwd0l0R1wvOWdlZWpleElBZDJnTG51Wlk2Y3A2QWxldz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMzgxY2RlOC01OTI0LTQwODQtYmZkOS04ZjI4NDkxZDQ3NzMiLCJldmVudF9pZCI6IjNhNzhkYzYxLWE2NWItNDdmYi1iY2YyLTJiYTBhNjdhMTBmOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTkyMTA1NDUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzlEMFhUWTNlSCIsImV4cCI6MTYxOTIxNDE0NSwiaWF0IjoxNjE5MjEwNTQ1LCJqdGkiOiJjZjI3OWVmNS1lMWFiLTQyYmMtYjlhMy1kMWZiNTIyZTFmODAiLCJjbGllbnRfaWQiOiIyOHFwNHBiNmc1c3FtZ2l1cGFlOGp0MGdkZiIsInVzZXJuYW1lIjoidXphaXIifQ.d0G3Oz_ENrRdwBksXPEQmT_aaXYvrNC1mUKDSAJ7FRk2qbc5Rjn24RraZ6x4WGf8VsPkADa_X4Ah6GNu1rNdoXSXHtwTnsADWA1_bYzSUAnGGlykA2QlNhB73vN59TaUQMP-dfJDV2KBfzAjsMiJb50gJNuZ4wMGdMBF5EiuvrcGI0DrWEbIQfuXCWk4SXTUCgNdKalbMtV37A8y-DiOchHwnNRXEC2HgWajxLeXmCdDGZTSqDFE9ii7Ey2-5XwW33H3oEq7_gpDkllFs9tSrzliL_193URkPqwlMwSopNYuW-N8Iax32QsVF7AoG1_vCZwPhaahFAHEoYbwZIrfEQ"
  }

  if (env == 'dev') {
    var API_URL = karate.properties['karate.API_URL'] || config.url
    var API_KEY = karate.properties['karate.API_KEY'] || config.key   
    var ACCESS_TOKEN = karate.properties['karate.ACCESS_TOKEN'] || config.token
    config.API_URL = API_URL
    config.API_KEY = API_KEY
    config.ACCESS_TOKEN = ACCESS_TOKEN

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