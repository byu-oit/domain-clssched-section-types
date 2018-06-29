const path = require('path');
const swagger = require('sans-server-swagger');

return swagger.testSwaggerResponseExamples(path.resolve(__dirname, '../swagger.json'))
  .then(results => console.log(results))
  .catch(function (error) {
    console.log(error);
  });