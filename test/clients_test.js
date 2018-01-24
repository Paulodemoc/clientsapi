var expect = require("chai").expect;
var request = require("request");

describe("Clients API", function() {
  var server = require("../server.js");
  var clientDataRepeated = {
    maritalStatus: ["married"],
    cpf: "75811038208",
    name: "Testing Repeated",
    email: "testing@gmail.com",
    "address.zipcode": "31255080",
    "address.state": "MG",
    "address.city": "Belo Horizonte",
    "address.street1": "Av. Raja Gabaglia 9898"
  };
  describe("Server response", function() {
    before(function() {
      server.listen(3000);

      request.post(
        {
          url: "http://localhost:3000/clients",
          json: true,
          body: clientDataRepeated
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(201);
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

  describe("InsertClient", function() {
    var clientData = {
      maritalStatus: ["married"],
      cpf: "01597518611",
      name: "Testing",
      email: "testing@gmail.com",
      "address.zipcode": "31255080",
      "address.state": "MG",
      "address.city": "Belo Horizonte",
      "address.street1": "Av. Raja Gabaglia 9898"
    };

    before(function(){
      request.post(
        {
          url: "http://localhost:3000/clients",
          json: true,
          body: clientDataRepeated
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(201);
        }
      );
    })

    it("HTTP Created - 201", function(done) {
      this.timeout(5000);
      request.post(
        {
          url: "http://localhost:3000/clients",
          json: true,
          body: clientData
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(201);
          done();
        }
      );
    });

    it("HTTP Conflict - 409", function(done) {
      request.post(
        {
          url: "http://localhost:3000/clients",
          json: true,
          body: clientDataRepeated
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(409);
          done();
        }
      );
    });
  });

  describe("GetAllClients", function() {
    it("HTTP OK - 200", function(done) {
      request.get("http://localhost:3000/clients", function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(res.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        done();
      });
    });
  });

  describe("GetClientByCPF", function() {
    it("HTTP OK - 200", function(done) {
      request.get("http://localhost:3000/clients/75811038208", function(
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

    it("HTTP No Content - 204", function(done) {
      request.get("http://localhost:3000/clients/90909090909", function(
        err,
        res,
        body
      ) {
        expect(res.statusCode).to.equal(204);
        done();
      });
    });
  });

  describe("UpdateClient", function() {
    var clientData = {
      maritalStatus: ["single"],
      cpf: "75811038208",
      name: "Testing It",
      email: "testing@gmail.com",
      "address.zipcode": "31255080",
      "address.state": "MG",
      "address.city": "Belo Horizonte",
      "address.street1": "Av. Raja Gabaglia 9898"
    };

    it("HTTP OK - 200", function(done) {
      request.put(
        {
          url: "http://localhost:3000/clients/75811038208",
          json: true,
          body: clientData
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(200);
          done();
        }
      );
    });

    it("HTTP Not Found - 404", function(done) {
      request.put(
        {
          url: "http://localhost:3000/clients/90909090909",
          json: true,
          body: clientData
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(404);
          done();
        }
      );
    });

    it("HTTP Conflict - 409", function(done) {
      request.post(
        {
          url: "http://localhost:3000/clients",
          json: true,
          body: clientData
        },
        function(err, res, body) {
          expect(res.statusCode).to.equal(409);
          done();
        }
      );
    });
  });

  describe("RemoveClient", function() {
    it("HTTP OK - 200", function(done) {
      request.delete("http://localhost:3000/clients/01597518611", function(
        err,
        res,
        body
      ) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("HTTP Not Found - 404", function(done) {
      request.delete("http://localhost:3000/clients/90909090909", function(
        err,
        res,
        body
      ) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });
});
