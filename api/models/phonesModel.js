'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhoneSchema = new Schema({
    client : { type: Schema.Types.ObjectId, ref: 'Client' },
    number: {
        type: String,
        required: 'Please inform a valid Phone Number'
    }
});

module.exports = mongoose.model('Phone', PhoneSchema);