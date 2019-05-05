'use strict';

const faker =   require("faker");

let userList = [];

for(let i=1; i <= 30; i++) {
  userList.push({
    username: faker.internet.userName,
    email: faker.internet.email,
    password: faker.internet.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", userList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
