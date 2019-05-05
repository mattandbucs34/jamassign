const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
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

  describe("GET /users/register", () => {
    it("should render a view with a registration form", (done) => {
      request.get(`${base}/register`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Register");
        done();
      });
    });
  });

  describe("POST /users", () => {
    it("should create a new user with valid values and redirect", (done) => {
      const options = {
        url: base,
        form: {
          email: "shaggy@mysterymachine.com",
          username: "shaggydoo",
          password: "scoobysnacks",
        }
      }

      request.post(options, (err, res, body) => {
        User.findOne({where: {email:"shaggy@mysterymachine.com"}})
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.email).toBe("shaggy@mysterymachine.com");
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

  describe("admin users performing CRUD operations", () => {
    beforeEach((done) => {
      User.create({
        username: "scoobyrules",
        email: "scooby@mysterymachine.com",
        password: "nunya4242",
        role: "admin"
      })
      .then((user) => {
        request.get({
          url: "http://localhost:3000/auth/fake",
          form: {
            username: user.username,
            email: user.email,
            userId: user.id
          }
        }, (err, res, body) => {
          done();
        });
      });
    });

    describe("GET /users", () => {
      it("should show a list of all users", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Registered Users");
          done();
        });
      });
    });
  });
});