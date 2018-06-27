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

// ----- Exported Endpoint Handlers -----
exports.getSectionType = function (req, res) {
  console.log("Invoked getSectionType")
  exports.getSectionType.mock(req, res);
};

exports.getSectionType.mock = function (req, res) {
  console.log("Invoked getSectionType.mock")
  res.send(req.swagger['x-mock_json'].section_types.values[0]);
};

exports.modifySectionType = function (req, res) {
  console.log("Invoked modifySectionType")
  exports.modifySectionType.mock(req, res);
};

exports.modifySectionType.mock = function (req, res) {
  console.log("Invoked modifySectionType.mock")
  res.send(req.swagger['x-mock_json'].section_types.values[0]);
};

exports.removeSectionType = function (req, res) {
  console.log("Invoked removeSectionType")
  exports.removeSectionType.mock(req, res);
};

exports.removeSectionType.mock = function (req, res) {
  console.log("Invoked removeSectionType.mock")
  res.status(204).send();
};
