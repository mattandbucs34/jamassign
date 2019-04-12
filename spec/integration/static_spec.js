const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  //#1
  describe("GET /", () => {

    //#2
    it("should return status code 200 and have 'Welcome to JAM Sports Officials' in the body of the response", (done) => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to JAM Sports Officials");
        //#4
        done();
      });
    });
  });

  describe("GET /about", () => {
    it("should return status code 200 and contain 'About Us' in the body", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us");
        done();
      });
    });
  });
});