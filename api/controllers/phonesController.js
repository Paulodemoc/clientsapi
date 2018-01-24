"use strict";

var mongoose = require("mongoose"),
  Client = mongoose.model("Client"),
  Phone = mongoose.model("Phone");

exports.list_phones = function(req, res) {
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client == null) res.status(404).send();
      else {
        Phone.find(
          {
            client: client._id
          },
          function(err, phone) {
            if (err) return res.status(500).send(err);
            if (phone && phone.length > 0) res.json(phone);
            else res.status(204).send();
          }
        );
      }
    }
  );
};

exports.read_phone = function(req, res) {
  if (!req.params.phoneId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(204).send();
  }
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client == null) res.status(404).send();
      else {
        Phone.findOne(
          {
            _id: req.params.phoneId,
            client: client._id
          },
          function(err, phone) {
            if (err) return res.status(500).send(err);
            if (phone == null) res.status(204).send();
            else res.json(phone);
          }
        );
      }
    }
  );
};

exports.create_phone = function(req, res) {
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client == null) res.status(404).send();
      else {
        req.body.client = client._id;
        var new_phone = new Phone(req.body);
        new_phone.save(function(err, phone) {
          if (err) return res.status(500).send(err);
          res.status(201).send();
        });
      }
    }
  );
};

exports.update_phone = function(req, res) {
  if (!req.params.phoneId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).send();
  }
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client == null) res.status(404).send();
      else {
        Phone.findOne(
          {
            _id: req.params.phoneId,
            client: client._id
          },
          function(err, phone) {
            if (err) return res.status(500).send(err);
            if (phone == null) res.status(404).send();
            else {
              Phone.findOneAndUpdate(
                {
                  _id: req.params.phoneId,
                  client: client._id
                },
                req.body,
                {
                  new: true
                },
                function(err, phone) {
                  if (err) return res.status(500).send(err);
                  res.json(phone);
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.delete_phone = function(req, res) {
  if (!req.params.phoneId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).send();
  }
  Client.findOne(
    {
      cpf: req.params.clientId
    },
    function(err, client) {
      if (err) return res.status(500).send(err);
      if (client == null) res.status(404).send();
      else {
        Phone.findOne(
          {
            _id: req.params.phoneId,
            client: client._id
          },
          function(err, phone) {
            if (err) return res.status(500).send(err);
            if (phone == null) res.status(404).send();
            else {
              Phone.remove(
                {
                  _id: req.params.phoneId,
                  client: client._id
                },
                function(err, phone) {
                  if (err) return res.status(500).send(err);
                  res.json({
                    message: "Phone successfully removed"
                  });
                }
              );
            }
          }
        );
      }
    }
  );
};
