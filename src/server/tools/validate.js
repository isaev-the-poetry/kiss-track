// optional more complex check
//
// const _typeof = x => typeof x
// const Validations = {
//     string: _typeof,
//     object: _typeof,
//     timestamp: x => typeof Date.parse(x) != 'NAN' // or regex
// }
//
// and replace inline "some" function: ([field, type]) =>  (typeof(Target[field]) != type)
// with something like ([field, type]) => Validations[type](Target[Field])

const ValidationSchema = {
  event: "string",
  tags: "object",
  uri: "string",
  title: "string",
  ts: "string",
};

const ValidateFields = (req, res, next) => {
  try {
    const Target = req.body;
    if (Target?.length == 0) throw new Error();
    Target.map((Event) => {
      const ValidationFailed = Object.entries(ValidationSchema).some(
        ([field, type]) => typeof Event[field] != type
      );
      if (ValidationFailed) throw new Error();
    });
    next();
  } catch (e) {
    res.status(400).json({ error: "validation failed" });
    return false;
  }
};
module.exports = ValidateFields;
