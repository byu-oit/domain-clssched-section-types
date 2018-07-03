/*
 * Copyright 2018 Brigham Young University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const byuJwt = require('byu-jwt')
const util = require('../util/util')
//const params = require('../util/params')

exports.authenticateJWTMiddleware = async function authenticateJWTMiddleware (req, res, next) {
  //try {
    //const awsParams = await params.getParams()
    try {
      req.verifiedJWTs = await byuJwt.authenticate(req.headers, process.env.WELLKNOWN) //TODO change to get wellknown from AWS
      next()
    } catch (err) { // Assume JWT Errors are 401
      return res.status(401).send(util.generateMetadataResponseObj(401, err.message))
    }
  // } catch (err) { // If we can't get params, just send 401s for everyone
  //   console.log(err)
  //   return res.status(401).send(util.generateMetadataResponseObj(401))
  // }
}