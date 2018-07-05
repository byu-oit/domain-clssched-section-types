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
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })
const handelUtils = require('handel-utils')

let params

exports.getParams = function () {
  if (!params) {
    let paramsToFetch = [
      // 'db_username',
      // 'db_password',
      // 'db_connection_string',
      // 'wso2_client_key',
      // 'wso2_client_secret',
      'wso2_well_known'
    ]
    return handelUtils.fetchParameters(AWS, paramsToFetch)
      .then(data => {
        params = data
          if (process.env.WELL_KNOWN) params.wso2_well_known = process.env.WELL_KNOWN
        //if (process.env.DB_CONNECTION_STRING) params.db_connection_string = process.env.DB_CONNECTION_STRING
        //if (process.env.DB_USERNAME) params.db_username = process.env.DB_USERNAME
        //if (process.env.DB_PASSWORD) params.db_password = process.env.DB_PASSWORD

        return params
      })
  } else {
    return Promise.resolve(params)
  }
}