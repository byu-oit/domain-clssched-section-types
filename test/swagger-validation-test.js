const SansServerSwagger = require('sans-server-swagger')
SansServerSwagger.testSwaggerResponseExamples(path.resolve(__dirname, '../swagger.json'))
  .then(results => console.log(results))
  .catch(function (error) {
    console.log(error);
  });