const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("#create()", () => {
    it("should create a User object with valid email, username and password", (done) => {
      User.create({
        email: "shaggy@mysterymachine.com",
        username: "shaggydoo",
        password: "scoobysnacks"
      })
      .then((user) => {
        expect(user.email).toBe("shaggy@mysterymachine.com");
        expect(user.username).toBe("shaggydoo");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
});