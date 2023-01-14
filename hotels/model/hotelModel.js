const mongoose = require("mongoose")


const HotelSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lon: {
        type: String,
        require: true
    },
    url: String
})


const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;