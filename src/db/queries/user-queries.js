const User = require("../models").User;
const bcrypt = require("bcryptjs");
const Authorizer = require("../../policies/userPolicy")

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      username: newUser.username,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },

  changeRole(req, updatedUser, callback) {
    return User.findOne({
      where: {id: req.params.id}
    })
    .then((user) => {
      const authorized = new Authorizer(req.user, user).update();

      if(authorized) {
        user.update(updatedUser, {
          fields: Object.keys(updatedUser)
        })
        .then(() => {
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        })
      }else {
        req.flash('notice', 'You are not authorized to do that.');
        callback('Forbidden');
      }
    });
  }
}