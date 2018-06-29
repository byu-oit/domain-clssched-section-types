/**
 *  @license
 *    Copyright 2016 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/
'use strict'
const path = require('path')
const SansServer = require('sans-server')
const SansServerSwagger = require('sans-server-swagger')
const expressTranslator = require('sans-server-express')
const express = require('express')
const bodyParser = require('body-parser')
// const {authenticateJWTMiddleware} = require('./src/auth/authentication')
// const {authorizeUserMiddleware} = require('./src/auth/authorization')
// const {generateMetadataResponseObj} = require('./src/util/util')
// const { getPool } = require('./src/db/connection')

//swagger tests
SansServerSwagger.testSwaggerResponseExamples(path.resolve(__dirname, './swagger.json'))
  .then(results => console.log(results))
  .catch(function (error) {
    console.log(error);
  });

// Express instance
const app = express()
app.use(bodyParser.json())

// Health check URL
app.get('/xhealth', function (req, res) {
  res.send('I feel FANTASTIC and I\'m still alive.')
})

// Sans-Server instance
const api = SansServer()

// Authenticate calls to API
//api.use(authenticateJWTMiddleware)
//api.use(authorizeUserMiddleware)

// Add swagger middleware to the sans-server instance
api.use(SansServerSwagger({
  controllers: path.resolve(__dirname, './controllers'),
  swagger: path.resolve(__dirname, './swagger.json'),
  development: false,
  ignoreBasePath: false,
  //exception: (res, state) => res.body(generateMetadataResponseObj(state.statusCode, state.body))
}))

app.use(expressTranslator(api))

/* Server Initial Setup */
console.log('Beginning Section Types server')
//getPool().then(() => { // Will also call getParams()
  let port = process.env.PORT || 3000
  app.listen(port, function () {
    console.log('    [INFO] Server running on port: ' + port)
    console.log('    [INFO] Controller path = ' + path.resolve(__dirname, './controllers'))
    console.log('    [INFO] Swagger path = ' + path.resolve(__dirname, './swagger.json'))
  })
//})
