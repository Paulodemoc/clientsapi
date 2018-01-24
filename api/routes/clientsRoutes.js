'use strict';
module.exports = function (app) {
    var clients = require('../controllers/clientsController');

    app.route('/clients')
        .get(clients.list_clients)
        .post(clients.create_client);


    app.route('/clients/:clientId')
        .get(clients.read_client)
        .put(clients.update_client)
        .delete(clients.delete_client);
};