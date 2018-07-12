/*
 * Copyright 2017 Brigham Young University
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
'use strict';
const winston = require('winston')
const sectionTypesDb = require('../db/section-types')
const format = require('../format')
const { generateMetadataResponseObj } = require('../util/util')

exports.getSectionTypes = async function (req, res) {
  const callerByuId = req.verifiedJWTs.prioritizedClaims.byuId
  winston.info(`Invoked getSectionTypes\n\tCaller BYU ID: ${callerByuId}`)
  try {
    const sectionTypes = await sectionTypesDb.getSectionTypes()
    if (sectionTypes) {
      const formattedSectionTypes = format.formatSectionTypes(sectionTypes.rows, req.swagger)
      console.log(JSON.stringify(formattedSectionTypes))
      return res.status(200).send(formattedSectionTypes)
    } else {
      return res.status(404).send(generateMetadataResponseObj(404))
    }
  } catch (err) {
    winston.error(`Error during getSectionTypes:\n${err}`)
    return res.status(500).send(generateMetadataResponseObj(500, err.message))
  }
}

// exports.getSectionTypes = function (req, res) {
//   console.log("Invoked getSectionTypes")
//   exports.getSectionTypes.mock(req, res);
// };

exports.getSectionTypes.mock = function (req, res) {
  console.log("Invoked getSectionTypes.mock")
  res.send(req.swagger.root['x-mock_json'].section_types);
};

exports.createSectionType = function (req, res) {
  console.log("Invoked createSectionType");
  exports.createSectionType.mock(req, res);
};

exports.createSectionType.mock = function (req, res) {
  console.log("Invoked createSectionType.mock");
  console.log(JSON.stringify(req.swagger.root['x-mock_json'].section_types.values[0]));
  res.status(201).send(req.swagger.root['x-mock_json'].section_types.values[0]);
};