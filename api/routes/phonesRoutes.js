'use strict';
module.exports = function (app) {
    var phones = require('../controllers/phonesController');

    app.route('/clients/:clientId/phones')
        .get(phones.list_phones)
        .post(phones.create_phone);

    app.route('/clients/:clientId/phones/:phoneId')
        .get(phones.read_phone)
        .put(phones.update_phone)
        .delete(phones.delete_phone);
};