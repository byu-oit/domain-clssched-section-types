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

function getResponseForReturnCode (code) {
  if (code === 200) return 'Success'
  if (code === 201) return 'Created'
  if (code === 204) return 'No Content'
  if (code === 400) return 'Bad Request'
  if (code === 401) return 'Unauthorized'
  if (code === 403) return 'Forbidden'
  if (code === 404) return 'Not Found'
  if (code === 409) return 'Conflict'
  if (code === 500) return 'Internal Server Error'
  return ''
}

function isObjEmpty (obj) {
  if (typeof obj !== 'object') return true
  if (obj === null) return true
  return (Object.keys(obj).length === 0)
}
exports.isObjEmpty = isObjEmpty

exports.isJWTPresent = function (headers) {
  if (headers === undefined || isObjEmpty(headers)) return false
  let check = 0
  for (let key in headers) if (key.toLowerCase() === byuJwt.BYU_JWT_HEADER_ORIGINAL) check += 1
  for (let key in headers) if (key.toLowerCase() === byuJwt.BYU_JWT_HEADER_CURRENT) check += 1
  return (check > 0)
}

function generateValidationResponseObj (code, message) {
  if (code === undefined) code = 200
  if ([200, 201, 204, 400, 401, 403, 404, 409, 500].indexOf(code) === -1) code = 409
  if (message === undefined) message = getResponseForReturnCode(code)
  if (typeof message === 'number') message = message.toString()
  if (typeof message === 'object' && message === null) message = 'Response is null'
  if (typeof message === 'object' && isObjEmpty(message)) message = 'Response body is empty'
  return { 'validation_response': { 'code': code, 'message': message } }
}
exports.generateValidationResponseObj = generateValidationResponseObj

function generateMetadataResponseObj (code, message) {
  return { 'metadata': generateValidationResponseObj(code, message) }
}
exports.generateMetadataResponseObj = generateMetadataResponseObj

function generateCollectionMetadataResponseObj (page, code, message) {
  return Object.assign({
    'collection_size': page.collectionSize,
    'page_start': page.start,
    'page_end': page.end,
    'page_size': page.size,
    'default_page_size': page.defaults.size,
    'max_page_size': page.defaults.maxSize
  }, generateValidationResponseObj(code, message))
}
exports.generateCollectionMetadataResponseObj = generateCollectionMetadataResponseObj