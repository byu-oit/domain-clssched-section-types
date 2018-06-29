exports.getSectionNumbers = function (req, res) {
  console.log("Invoked getSectionNumber")
  exports.getSectionNumbers.mock(req, res);
};

exports.getSectionNumbers.mock = function (req, res) {
  console.log("Invoked getSectionNumber.mock")
  res.send(req.swagger.root['x-mock_json'].section_numbers);
};