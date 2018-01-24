"use strict";

var mongoose = require("mongoose"),
  Client = mongoose.model("Client"),
  Phone = mongoose.model("Phone");

exports.list_clients = function(req, res) {
  Client.find({}, function(err, client) {
    if (err) return res.status(500).send(err);
    if (client && client.length > 0) res.json(client);
    else res.status(204).send();
  });
};

exports.read_client = function(req, res) {
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client == null) res.status(204).send();
      else res.json(client);
    }
  );
};

exports.create_client = function(req, res) {
  Client.findOne(
    {
      cpf: req.body.cpf
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client != null) res.status(409).send();
      else {
        var new_client = new Client(req.body);
        new_client.save(function(err, client) {
          if (err) return res.status(500).send(err);
          res.status(201).send();
        });
      }
    }
  );
};

exports.update_client = function(req, res) {
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client == null) res.status(404).send();
      else {
        Client.findOneAndUpdate(
          {
            cpf: req.params.clientId
          },
          req.body,
          {
            new: true
          },
          function(err, client) {
            if (err) return res.status(500).send(err);
            res.json(client);
          }
        );
      }
    }
  );
};

exports.delete_client = function(req, res) {
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client) {
        Phone.remove(
          {
            client: client._id
          },
          function(err, phone) {
            if (err) return res.status(500).send(err);
            Client.remove(
              {
                cpf: req.params.clientId
              },
              function(err, client) {
                if (err) return res.status(500).send(err);
                res.json({
                  message: "Client successfully deleted"
                });
              }
            );
          }
        );
      } else res.status(404).send();
    }
  );
};
