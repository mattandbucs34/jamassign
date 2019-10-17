const School = require("../models").Schools;

module.exports = {
  createSchool(newSchool, callback) {
    return Schools.create({
      name: newSchool.schoolName,
      address: newSchool.address,
      city: newSchool.city,
      state: newSchool.state,
      zipCode: newSchool.zip
    })
    .then((school) => {
      callback(null, school);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
  }
}