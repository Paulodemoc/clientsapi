'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: {
        type: String,
        required: 'Please inform your name'
    },
    email: {
        type: String,
        required: 'Please inform a valid e-mail'
    },
    cpf: {
        type: String,
        validate: {
            validator: function (strCPF) {
                var sum;
                var remainder;
                sum = 0;

                if (strCPF == "00000000000") return false;

                for (var i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
                remainder = (sum * 10) % 11;

                if ((remainder == 10) || (remainder == 11)) remainder = 0;
                if (remainder != parseInt(strCPF.substring(9, 10))) return false;

                sum = 0;
                for (var i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
                remainder = (sum * 10) % 11;

                if ((remainder == 10) || (remainder == 11)) remainder = 0;
                if (remainder != parseInt(strCPF.substring(10, 11))) return false;
                return true;
            },
            message: '{VALUE} is not a valid CPF!'
        },
        required: 'Please inform a valid CPF'
    },
    maritalStatus: {
        type: [{
            type: String,
            enum: ['single', 'married', 'divorced']
        }],
        default: ['single']
    },
    address: {
        street1: {
            type: String,
            required: "Please inform a valid Address!"
        },
        street2: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            required: "Please inform a valid City!"
        },
        state: {
            type: String,
            required: "Please inform a valid State!"
        },
        zipcode: {
            type: String,
            required: "Please inform a valid Zip Code!",
            validate: {
                validator: function (v) {
                    return (v.length > 0 && v.length == 8) || v.length == 0;
                },
                message: 'Please inform a valid Zip Code!'
            }
        }
    },
    phones : { type: Schema.Types.ObjectId, ref: 'Phone' }
});

module.exports = mongoose.model('Client', ClientSchema);