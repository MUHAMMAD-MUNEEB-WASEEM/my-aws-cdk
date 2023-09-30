function fn() {
  var env = karate.env; // get system property 'karate.env'
  
  karate.log('karate.env system property was:', env);
  
  if (!env) {
    env = 'dev';
  }

  var config = {
    env: env,
    myVarName: 'someValue',
  }

  if (env == 'dev') {
    var API_URL = karate.properties['karate.API_URL']    
    var API_KEY = karate.properties['karate.API_KEY']    
    
    config.API_URL = API_URL
    config.API_KEY = API_KEY

    karate.log('************************** dev  ******************************', config.env);
    karate.log('************************** API URL ******************************', config.API_URL);
    karate.log('************************** API KEY ******************************', config.API_KEY);

  } else if (env == 'production') {
    // customize
    karate.log('************************** production ******************************', config.env);

  }
  return config;
}