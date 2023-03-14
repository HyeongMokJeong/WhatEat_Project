const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    type2: String,

    number: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    lng: {
        type: String,
        required: true
    },

    lat: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('store', storeSchema);