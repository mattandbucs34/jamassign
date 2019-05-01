const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/profile";
const User = require("../../src/db/models").User;
const Profile = require("../../src/db/models").Profile;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : profile", () => {
  

  describe("registered user performing CRUD operations for Profile", () => {
    beforeEach((done) => {
      this.user;
      sequelize.sync({force: true}).then((res) => {
        User.create({
          username: "shaggydoo",
          email: "shaggy@mysterymachine.com",
          password: "scoobysnacks"
        })
        .then((user) => {
          this.user = user;
          request.get({
            url: "http://localhost:3000/auth/fake",
            form: {
              username: user.username,
              userId: user.id,
              email: user.email
            }
          }, (err, res, body) => {
            done();
          });
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

      describe("POST /profile/create", () => {
        this.user;
        beforeEach((done) => {
          User.create({
            username: "ForeverOrange",
            email: "velma@mysterymachine.com",
            password: "jenkies"
          })
          .then((user) => {
            this.user = user;
            done();
          });
        });
        it("should create a new profile after user input", (done) => {
          const options = {
            url: `${base}/create`,
            form: {
              firstName: "Velma",
              midinitial: "",
              lastName: "Dinkley",
              address1: "1 Haunted Lane",
              address2: "Second Floor",
              city: "San Diego",
              userState: "CA",
              zipCode: 99223,
              homeNumber: "555-321-4568",
              mobileNumber: "555-458-2368",
              userId: this.user.id,
            }
          };
        
        request.post(options, (err, res, body) => {
          Profile.findOne({
            where: {userId: 1}
          })
          .then((profile) => {
            //expect(res.statusCode).toBe(302);
            //expect(profile).not.toBeNull();
            expect(err).toBeNull();
            expect(profile.firstname).toBe("Velma");
            expect(profile.lastname).toBe("Dinkley");
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
});