var expect = require("chai").expect;
var request = require("request");

describe("Clients API - Phones", function() {
  var server = require("../server.js");
  var clientData = {
    maritalStatus: ["married"],
    cpf: "75811038208",
    name: "Testing Repeated",
    email: "testing@gmail.com",
    "address.zipcode": "31255080",
    "address.state": "MG",
    "address.city": "Belo Horizonte",
    "address.street1": "Av. Raja Gabaglia 9898"
  };
  var phoneData = {
    number: "3191591773"
  };
  var phoneID = "";

  describe("Server response", function() {
    before(function() {
      server.listen(3000);

      request.post(
        {
          url: "http://localhost:3000/clients",
          json: true,
          body: clientData
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(201);

          request.post(
            {
              url: "http://localhost:3000/clients/75811038208/phones",
              json: true,
              body: phoneData
            },
            function(err, res, body) {
              expect(res.statusCode).to.equal(201);
              request.get(
                "http://localhost:3000/clients/75811038208/phones",
                function(err, res, body) {
                  if (body.length > 0) {
                    phoneID = JSON.parse(body)[0]._id;
                  }
                }
              );
            }
          );
        }
      );
    });

    after(function() {
      request.delete("http://localhost:3000/clients/75811038208", function(
        err,
        res,
        body
      ) {
        expect(res.statusCode).to.equal(200);
        done();
      });

      server.close();
    });
  });

  describe("InsertPhone", function() {
    var phoneData = {
      number: "31995191773"
    };

    it("HTTP Created - 201", function(done) {
      request.post(
        {
          url: "http://localhost:3000/clients/75811038208/phones",
          json: true,
          body: phoneData
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(201);
          done();
        }
      );
    });
  });

  describe("GetAllPhonesFromClient", function() {
    it("HTTP OK - 200", function(done) {
      request.get("http://localhost:3000/clients/75811038208/phones", function(
        err,
        res,
        body
      ) {
        expect(res.statusCode).to.equal(200);
        expect(res.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        done();
      });
    });
  });

  describe("GetPhoneById", function() {
    it("HTTP OK - 200", function(done) {
      request.get(
        "http://localhost:3000/clients/75811038208/phones/" + phoneID,
        function(err, res, body) {
          expect(res.statusCode).to.equal(200);
          expect(res.headers["content-type"]).to.equal(
            "application/json; charset=utf-8"
          );
          done();
        }
      );
    });

    it("HTTP No Content - 204", function(done) {
      request.get(
        "http://localhost:3000/clients/75811038208/phones/IDIDIDIDIDIDDIIDIDID",
        function(err, res, body) {
          expect(res.statusCode).to.equal(204);
          done();
        }
      );
    });
  });

  describe("UpdatePhone", function() {
    var phoneData = {
      number: "3134965776"
    };

    it("HTTP OK - 200", function(done) {
      request.get("http://localhost:3000/clients/75811038208/phones", function(
        err,
        res,
        body
      ) {
        if (body.length > 0) {
          phoneID = JSON.parse(body)[0]._id;
          request.put(
            {
              url:
                "http://localhost:3000/clients/75811038208/phones/" + phoneID,
              json: true,
              body: phoneData
            },
            function(err, res, body) {
              expect(res.statusCode).to.equal(200);
              done();
            }
          );
        }
      });
    });

    it("HTTP Not Found - 404", function(done) {
      request.put(
        {
          url:
            "http://localhost:3000/clients/75811038208/phones/IDIDIDIDIDIDIDIDIDIDIDID",
          json: true,
          body: phoneData
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(404);
          done();
        }
      );
    });
  });

  describe("RemovePhone", function() {
    it("HTTP OK - 200", function(done) {
      request.get("http://localhost:3000/clients/75811038208/phones", function(
        err,
        res,
        body
      ) {
        if (body.length > 0) {
          phoneID = JSON.parse(body)[0]._id;
          request.delete(
            "http://localhost:3000/clients/75811038208/phones/" + phoneID,
            function(err, res, body) {
              expect(res.statusCode).to.equal(200);
              done();
            }
          );
        }
      });
    });

    it("HTTP Not Found - 404", function(done) {
      request.delete(
        "http://localhost:3000/clients/75811038208/phones/IDIDIDIDIDIDIDIDID",
        function(err, res, body) {
          expect(res.statusCode).to.equal(404);
          done();
        }
      );
    });
  });
});
