const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/profile";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : profile", () => {
  beforeEach((done) => {
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        username: "ForeverOrange",
        email: "velma@mysterymachine.com",
        password: "jenkies24"
      })
      .then((user) => {
        this.user = user;
        done();
      });
    });
  });

  describe("GET /profile/new", () => {
    it("should render the new profile page", (done) => {
      request.get(`${base}/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Enter Profile Information");
        done();
      });
    });
  });

  describe("POST /profile/new", () => {
    const options = {
      url: `${base}/create`,
      form: {
        firstName: "Velma",
        lastName: "Dinkley",
        address1: "1 Haunted Lane",
        address2: "Second Floor",
        city: "San Diego",
        state: "CA",
        zipcode: "99223",
        homephone: "555-321-4568",
        mobilephone: "555-458-2368",
        userId: 1
      }
    }
    it("should create a new profile after user input", (done) => {
      request.post(options, (err, res, body) => {
        Profile.findOne({
          where: {userId: 1}
        })
        .then((profile) => {
          expect(profile).not.toBeNull();
        })
      })
    })
  })
});