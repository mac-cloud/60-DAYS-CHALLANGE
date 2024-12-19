const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  touristName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  specialRequests: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Tour-Booking', BookingSchema);
