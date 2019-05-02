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
          username: "EverOrange",
          email: "velma@mysterymachine.com",
          password: "jenkies24"
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
      it("should create a new profile after user input", (done) => {
        const options = {
          url: `${base}/create`,
          form: {
            firstName: "Velma",
            midInitial: "",
            lastName: "Dinkley",
            address1: "1 Haunted Lane",
            address2: "Second Floor",
            city: "San Diego",
            userState: "CA",
            zipCode: 99223,
            homeNumber: "555-321-4568",
            mobileNumber: "555-458-2368",
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

    describe("GET /profile/edit", () => {
      it("should render the edit profile page", (done) => {
        request.get(`${base}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Update");
          done();
        });
      });
    });

    describe("POST /profile/update", () => {
      it("should update the user profile with the given values", (done) => {
        const options = {
          url: `${base}/update`,
          form: {
            address1: "1416 Creepy Graveyard Cir",
            city: "Oakdale",
            zipCode: 93342
          }
        };
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Profile.findOne({
            where: {userId: 1}
          })
          .then((profile) => {
            expect(profile.address1).toBe("1416 Creepy Graveyard Cir");
            expect(profile.city).toBe("Oakdale");
            done();
          });
        });
      });
    });
  });
});