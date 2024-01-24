const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        unique:true
    },
    time: {
        type: String,
        required: true,
        // unique:true
    },
    bookingType: {
        type: String,
        required: true,
    },
    bookingSubType: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

  
