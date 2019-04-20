const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/profile";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : profile", () => {
  // beforeEach((done) => {
  //   this.user;

  //   sequelize.sync({force: true}).then((res) => {
  //     User.create({
  //       username: "ForeverOrange",
  //       email: "velma@mysterymachine.com",
  //       password: "jenkies24"
  //     })
  //     .then((user) => {
  //       this.user = user;

  //     });
  //   });
  // });

  describe("GET /profile/new", () => {
    it("should render the new profile page", (done) => {
      request.get(`${base}/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Enter Profile Information");
        done();
      });
    });
  });
});