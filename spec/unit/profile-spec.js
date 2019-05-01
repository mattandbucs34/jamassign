const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Profile = require("../../src/db/models").Profile;

describe("Profile", () => {
  beforeEach((done) => {
    this.user;

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
    it("should create a Profile object", (done) => {
      User.create({
        username: "ForeverOrange",
        email: "velma@mysterymachine.com",
        password: "jenkies"
      })
      .then((user) => {
        this.user = user;

        Profile.create({
          firstname: "Velma",
          lastname: "Dinkley",
          address1: "1 Haunted Lane",
          address2: "Second Floor",
          city: "San Diego",
          state: "CA",
          zipcode: 99223,
          homephone: "555-321-4568",
          mobilephone: "555-458-2368",
          userId: this.user.id
        })
        .then((profile) => {
          expect(profile.firstname).toBe("Velma");
          expect(profile.userId).toBe(this.user.id);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });
});